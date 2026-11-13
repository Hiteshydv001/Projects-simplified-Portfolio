import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authConfig, cookieOptions, exchangeCode, safeEqual, safeReturnTo, sessionCookie, unseal, verifyIdToken, SESSION_COOKIE, SESSION_MAX_AGE, TX_COOKIE } from '@/lib/auth/nexusid'
import type { AuthTransaction } from '@/lib/auth/nexusid'
import { clientIdentity, rateLimit, requestFailure, RequestError } from '@/lib/security/request'

export const dynamic = 'force-dynamic'

// NexusID redirects back here with a single-use code. Exchange it, validate the ID token, start the local session.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const finish = (path: string) => {
    const response = NextResponse.redirect(new URL(path, url.origin), { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.set(TX_COOKIE, '', cookieOptions(0, '/api/auth'))
    return response
  }
  try {
    rateLimit(`auth-callback:${clientIdentity(request)}`, 20)
    const config = authConfig()
    if (!config) return finish('/members?error=not_configured')
    const tx = unseal<AuthTransaction>((await cookies()).get(TX_COOKIE)?.value, config.sessionSecret)
    const state = url.searchParams.get('state'), code = url.searchParams.get('code')
    // The state check comes first: without a matching transaction nothing in the query string is trusted.
    if (!tx || !state || !safeEqual(state, tx.state)) return finish('/members?error=expired')
    if (url.searchParams.get('error')) return finish('/members?error=denied')
    if (!code) return finish('/members?error=failed')
    const idToken = await exchangeCode(config, code, tx.verifier, `${url.origin}/api/auth/callback`)
    const claims = await verifyIdToken(config, idToken, tx.nonce)
    const text = (value: unknown) => typeof value === 'string' && value ? value.slice(0, 300) : undefined
    const response = finish(safeReturnTo(tx.returnTo))
    response.cookies.set(SESSION_COOKIE, sessionCookie({
      sub: claims.sub as string, name: text(claims.name), email: text(claims.email), emailVerified: claims.email_verified === true,
      picture: text(claims.picture), sid: text(claims.sid), idToken,
    }, config.sessionSecret), cookieOptions(SESSION_MAX_AGE))
    return response
  } catch (error) {
    if (error instanceof RequestError) return requestFailure(error, 'Please try again shortly.')
    console.error('NexusID sign-in failed:', error instanceof Error ? error.message : error)
    return finish('/members?error=failed')
  }
}
