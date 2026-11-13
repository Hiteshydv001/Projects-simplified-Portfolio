import { createHash, createHmac, createPublicKey, randomBytes, timingSafeEqual, verify } from 'node:crypto'
import type { JsonWebKey } from 'node:crypto'

// Sign-in with NexusID (OpenID Connect, Authorization Code + PKCE). Server only.
// The portfolio keeps its own session in a signed HttpOnly cookie; NexusID keeps the central one.

export const SESSION_COOKIE = 'pf_session'
export const TX_COOKIE = 'pf_auth_tx'
const SESSION_SECONDS = 8 * 60 * 60
const TX_SECONDS = 10 * 60

export type AuthConfig = { issuer: string; clientId: string; clientSecret?: string; sessionSecret: string }
export type AuthTransaction = { state: string; nonce: string; verifier: string; returnTo: string; exp: number }
export type AuthSession = { sub: string; name?: string; email?: string; emailVerified?: boolean; picture?: string; sid?: string; idToken: string; exp: number }
type Endpoints = { authorize: string; token: string; jwks: string; logout: string }

export function authConfig(): AuthConfig | null {
  const issuer = process.env.NEXUSID_ISSUER?.trim().replace(/\/+$/, '')
  const clientId = process.env.NEXUSID_CLIENT_ID?.trim()
  const sessionSecret = process.env.AUTH_SESSION_SECRET || ''
  if (!issuer || !/^https?:\/\//.test(issuer) || !clientId || sessionSecret.length < 32) return null
  return { issuer, clientId, clientSecret: process.env.NEXUSID_CLIENT_SECRET?.trim() || undefined, sessionSecret }
}

export const randomToken = () => randomBytes(32).toString('base64url')
export const pkceChallenge = (verifier: string) => createHash('sha256').update(verifier).digest('base64url')
export const now = () => Math.floor(Date.now() / 1000)

// Only ever return to a path on this site.
export function safeReturnTo(value: string | null | undefined, fallback = '/members') {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\') || /[\r\n]/.test(value)) return fallback
  return value
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a), right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

// Signed (not encrypted) cookie values: base64url(JSON) + '.' + HMAC-SHA256.
export function seal(payload: object, secret: string) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${createHmac('sha256', secret).update(body).digest('base64url')}`
}

export function unseal<T extends { exp: number }>(value: string | undefined, secret: string): T | null {
  if (!value) return null
  const [body, signature, extra] = value.split('.')
  if (!body || !signature || extra !== undefined) return null
  if (!safeEqual(signature, createHmac('sha256', secret).update(body).digest('base64url'))) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as T
    return typeof payload.exp === 'number' && payload.exp > now() ? payload : null
  } catch { return null }
}

export const cookieOptions = (maxAge: number, path = '/') => ({
  httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path, maxAge,
})
export const sessionCookie = (session: Omit<AuthSession, 'exp'>, secret: string) => seal({ ...session, exp: now() + SESSION_SECONDS }, secret)
export const txCookie = (tx: Omit<AuthTransaction, 'exp'>, secret: string) => seal({ ...tx, exp: now() + TX_SECONDS }, secret)
export const SESSION_MAX_AGE = SESSION_SECONDS
export const TX_MAX_AGE = TX_SECONDS

async function getJson(url: string) {
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(70_000), headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`NexusID responded ${response.status}`)
  return response.json() as Promise<Record<string, unknown>>
}

let endpointCache: { issuer: string; value: Endpoints } | null = null
export async function endpoints(config: AuthConfig): Promise<Endpoints> {
  if (endpointCache?.issuer === config.issuer) return endpointCache.value
  const doc = await getJson(`${config.issuer}/.well-known/openid-configuration`)
  if (doc.issuer !== config.issuer) throw new Error('Issuer mismatch in discovery document')
  const value = { authorize: String(doc.authorization_endpoint), token: String(doc.token_endpoint), jwks: String(doc.jwks_uri), logout: String(doc.end_session_endpoint) }
  // Every endpoint must live on the issuer's origin.
  const origin = new URL(config.issuer).origin
  if (Object.values(value).some(url => { try { return new URL(url).origin !== origin } catch { return true } })) throw new Error('Unexpected endpoint in discovery document')
  endpointCache = { issuer: config.issuer, value }
  return value
}

let jwksCache: { url: string; keys: (JsonWebKey & { kid?: string })[]; fetched: number } | null = null
async function signingKey(url: string, kid: string) {
  const fresh = jwksCache && jwksCache.url === url && Date.now() - jwksCache.fetched < 10 * 60_000
  let key = fresh ? jwksCache!.keys.find(item => item.kid === kid) : undefined
  if (!key) {
    // Unknown key id: the provider may have rotated its signing key.
    const doc = await getJson(url)
    jwksCache = { url, keys: Array.isArray(doc.keys) ? doc.keys as (JsonWebKey & { kid?: string })[] : [], fetched: Date.now() }
    key = jwksCache.keys.find(item => item.kid === kid)
  }
  if (!key || key.kty !== 'RSA') throw new Error('Unknown signing key')
  return createPublicKey({ key, format: 'jwk' })
}

export async function exchangeCode(config: AuthConfig, code: string, verifier: string, redirectUri: string) {
  const { token } = await endpoints(config)
  const body = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, client_id: config.clientId, code_verifier: verifier })
  if (config.clientSecret) body.set('client_secret', config.clientSecret)
  const response = await fetch(token, { method: 'POST', body, cache: 'no-store', signal: AbortSignal.timeout(70_000), headers: { Accept: 'application/json' } })
  const data = await response.json().catch(() => null) as Record<string, unknown> | null
  if (!response.ok || typeof data?.id_token !== 'string') throw new Error(`Token exchange failed (${response.status})`)
  return data.id_token
}

// Signature (RS256 only), issuer, audience, expiry and nonce.
export async function verifyIdToken(config: AuthConfig, idToken: string, nonce: string) {
  const parts = idToken.split('.')
  if (parts.length !== 3) throw new Error('Malformed ID token')
  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8')) as { alg?: string; kid?: string }
  if (header.alg !== 'RS256' || !header.kid) throw new Error('Unsupported ID token algorithm')
  const key = await signingKey((await endpoints(config)).jwks, header.kid)
  if (!verify('RSA-SHA256', Buffer.from(`${parts[0]}.${parts[1]}`), key, Buffer.from(parts[2], 'base64url'))) throw new Error('Invalid ID token signature')
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as Record<string, unknown>
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud]
  if (claims.iss !== config.issuer) throw new Error('Wrong issuer')
  if (!audience.includes(config.clientId)) throw new Error('Wrong audience')
  if (typeof claims.exp !== 'number' || claims.exp < now() - 60) throw new Error('Expired ID token')
  if (typeof claims.nonce !== 'string' || !safeEqual(claims.nonce, nonce)) throw new Error('Nonce mismatch')
  if (typeof claims.sub !== 'string' || !claims.sub) throw new Error('Missing subject')
  return claims
}
