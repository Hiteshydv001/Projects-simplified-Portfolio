import { NextResponse } from 'next/server'
import { authConfig, cookieOptions, endpoints, pkceChallenge, randomToken, safeReturnTo, txCookie, TX_COOKIE, TX_MAX_AGE } from '@/lib/auth/nexusid'
import { clientIdentity, rateLimit, requestFailure, RequestError } from '@/lib/security/request'

export const dynamic = 'force-dynamic'

// Starts sign-in: remembers state, nonce and the PKCE verifier in a short-lived cookie, then redirects to NexusID.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const failed = (reason: string) => NextResponse.redirect(new URL(`/members?error=${reason}`, url.origin), { headers: { 'Cache-Control': 'no-store' } })
  try {
    rateLimit(`auth-login:${clientIdentity(request)}`, 20)
    const config = authConfig()
    if (!config) return failed('not_configured')
    const state = randomToken(), nonce = randomToken(), verifier = randomToken()
    const target = new URL((await endpoints(config)).authorize)
    target.search = new URLSearchParams({
      response_type: 'code', client_id: config.clientId, redirect_uri: `${url.origin}/api/auth/callback`,
      scope: 'openid profile email', state, nonce, code_challenge: pkceChallenge(verifier), code_challenge_method: 'S256',
    }).toString()
    const response = NextResponse.redirect(target, { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.set(TX_COOKIE, txCookie({ state, nonce, verifier, returnTo: safeReturnTo(url.searchParams.get('return_to')) }, config.sessionSecret), cookieOptions(TX_MAX_AGE, '/api/auth'))
    return response
  } catch (error) {
    if (error instanceof RequestError) return requestFailure(error, 'Please try again shortly.')
    console.error('NexusID sign-in could not start:', error instanceof Error ? error.message : error)
    return failed('unavailable')
  }
}
