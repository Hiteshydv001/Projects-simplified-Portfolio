import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { KeyRound, ShieldCheck } from 'lucide-react'
import { authConfig, unseal, SESSION_COOKIE } from '@/lib/auth/nexusid'
import type { AuthSession } from '@/lib/auth/nexusid'
import { SignOutButton } from './_components/sign-out'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Members', description: 'A members-only page, protected by single sign-on with NexusID.', robots: { index: false, follow: false } }

const errors: Record<string, string> = {
  not_configured: 'Sign-in is not set up on this deployment yet.',
  unavailable: 'The sign-in service did not respond. It may be waking up; please try again in a minute.',
  expired: 'That sign-in attempt expired. Please start again.',
  denied: 'Sign-in was cancelled.',
  failed: 'Sign-in could not be completed. Please try again.',
}

const steps = [
  ['Redirect', 'This site sends you to NexusID with a one-time PKCE challenge. Your password never touches the portfolio.'],
  ['Verify', 'NexusID returns a single-use code. The server exchanges it and checks the ID token’s signature, issuer, audience and nonce.'],
  ['Session', 'The portfolio starts its own HttpOnly session. Any other app connected to NexusID now signs you in without a password.'],
]

export default async function MembersPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const config = authConfig()
  const session = config ? unseal<AuthSession>((await cookies()).get(SESSION_COOKIE)?.value, config.sessionSecret) : null
  const error = errors[(await searchParams).error || '']
  const details = session ? [
    ['Name', session.name || 'Not shared'],
    ['Email', session.email ? `${session.email}${session.emailVerified ? ' (verified)' : ''}` : 'Not shared'],
    ['User ID', session.sub],
    ['Central session', session.sid || 'Not provided'],
    ['Local session ends', new Date(session.exp * 1000).toUTCString()],
  ] : []
  return <div className="studio-page">
    <header className="page-hero">
      <span className="page-eyebrow">{session ? 'Signed in with NexusID' : 'Members only'}</span>
      <h1 className="mt-5">{session ? `Welcome, ${session.name?.split(' ')[0] || 'member'}` : 'Members'}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        {session
          ? 'You reached this page through single sign-on. Your identity was verified by NexusID, the identity provider I built.'
          : 'This page is protected by NexusID, an OAuth 2.0 and OpenID Connect identity provider I built. Sign in to see it work.'}
      </p>
    </header>
    {error && !session && <p role="alert" className="surface-card mb-6 p-4 text-sm">{error}</p>}
    {session ? <section className="surface-card p-6 sm:p-8" aria-labelledby="identity-heading">
      <h2 id="identity-heading" className="flex items-center gap-2 text-xl font-medium"><ShieldCheck size={20} aria-hidden="true" />Verified identity</h2>
      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">{details.map(([label, value]) => <div key={label} className="min-w-0">
        <dt className="font-mono text-xs uppercase text-muted-foreground">{label}</dt>
        <dd className="mt-1 break-words">{value}</dd>
      </div>)}</dl>
      <div className="mt-8"><SignOutButton /></div>
    </section> : <section className="surface-card p-6 sm:p-8">
      {/* A plain anchor: this is a server redirect, not a page to prefetch. */}
      {config
        ? <a className="action-primary" href="/api/auth/login?return_to=/members"><KeyRound size={15} aria-hidden="true" />Sign in with NexusID</a>
        : <p className="text-sm text-muted-foreground">Sign-in is not set up on this deployment yet.</p>}
      {config && <p className="mt-4 text-sm text-muted-foreground">New here? You can create an account on the sign-in screen.</p>}
    </section>}
    <section className="mt-12" aria-labelledby="how-heading">
      <h2 id="how-heading" className="section-header">How it works</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">{steps.map(([title, text], index) => <li key={title} className="surface-card p-6">
        <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="mt-2 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </li>)}</ol>
    </section>
  </div>
}
