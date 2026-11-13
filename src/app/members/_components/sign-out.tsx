'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function signOut() {
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      const data: { url?: string } = await response.json()
      if (!response.ok || !data.url) throw new Error('Sign out failed')
      window.location.assign(data.url)
    } catch {
      setError('Could not sign out. Please try again.')
      setBusy(false)
    }
  }
  return <>
    <button type="button" className="action-secondary" onClick={signOut} disabled={busy}><LogOut size={15} aria-hidden="true" />{busy ? 'Signing out…' : 'Sign out'}</button>
    {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
  </>
}
