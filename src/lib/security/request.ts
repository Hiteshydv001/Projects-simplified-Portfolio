import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'

export class RequestError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}

// Per-instance abuse protection. Use an edge/distributed limiter for multi-instance deployments.
const buckets = new Map<string, { count: number; expires: number }>()
export function rateLimit(identity: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  buckets.forEach((bucket, key) => { if (bucket.expires <= now) buckets.delete(key) })
  const bucket = buckets.get(identity)
  if (bucket && bucket.count >= limit) throw new RequestError('Too many requests. Please try again shortly.', 429)
  if (bucket) bucket.count++
  else {
    if (buckets.size >= 10_000) throw new RequestError('Please try again shortly.', 429)
    buckets.set(identity, { count: 1, expires: now + windowMs })
  }
}

export function clientIdentity(request: Request) {
  // Vercel overwrites this header. Never trust arbitrary forwarded headers on other hosts.
  const ip = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() : undefined
  return createHash('sha256').update(ip || 'shared').digest('hex')
}

export function guardWrite(request: Request, scope: string, limit = 5, globalLimit = 100) {
  const origin = request.headers.get('origin')
  const allowed = [new URL(request.url).origin, process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_APP_URL].filter(Boolean)
  if (origin && !allowed.includes(origin)) throw new RequestError('Request origin is not allowed.', 403)
  rateLimit(`${scope}:${clientIdentity(request)}`, limit)
  rateLimit(`${scope}:global`, globalLimit)
}

export async function readJson(request: Request, maxBytes = 16_384): Promise<Record<string, unknown>> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new RequestError('Expected a JSON request.', 415)
  if (Number(request.headers.get('content-length')) > maxBytes) throw new RequestError('Request is too large.', 413)
  const reader = request.body?.getReader()
  if (!reader) throw new RequestError('Request body is required.')
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) { await reader.cancel(); throw new RequestError('Request is too large.', 413) }
      chunks.push(value)
    }
    let value: unknown
    try { value = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new RequestError('Invalid JSON.') }
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new RequestError('Invalid request body.')
    return value as Record<string, unknown>
  } finally { reader.releaseLock() }
}

export function stringField(value: unknown, label: string, max: number, required = true) {
  if ((value === undefined || value === null) && !required) return ''
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new RequestError(`Please enter a valid ${label}.`)
  return value.trim()
}

export function validEmail(value: string) {
  return value.length <= 254 && !/[\r\n]/.test(value) && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
}

export function requestFailure(error: unknown, fallback: string) {
  const status = error instanceof RequestError ? error.status : 503
  return NextResponse.json({ error: error instanceof RequestError ? error.message : fallback }, {
    status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '60' } : {}) },
  })
}
