import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authConfig, cookieOptions, endpoints, unseal, SESSION_COOKIE } from '@/lib/auth/nexusid'
import type { AuthSession } from '@/lib/auth/nexusid'
import { guardWrite, requestFailure } from '@/lib/security/request'

export const dynamic = 'force-dynamic'

// Ends the local session and returns the NexusID logout URL so the central session ends too.
export async function POST(request: Request) {
  try {
    guardWrite(request, 'auth-logout', 20)
    const origin = new URL(request.url).origin
    const config = authConfig()
    const session = config ? unseal<AuthSession>((await cookies()).get(SESSION_COOKIE)?.value, config.sessionSecret) : null
    let url = '/members'
    if (config && session) {
      try {
        const target = new URL((await endpoints(config)).logout)
        target.search = new URLSearchParams({ id_token_hint: session.idToken, post_logout_redirect_uri: `${origin}/members` }).toString()
        url = target.toString()
      } catch { /* NexusID unreachable: the local session still ends. */ }
    }
    const response = NextResponse.json({ url }, { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.set(SESSION_COOKIE, '', cookieOptions(0))
    return response
  } catch (error) { return requestFailure(error, 'Unable to sign out right now.') }
}
