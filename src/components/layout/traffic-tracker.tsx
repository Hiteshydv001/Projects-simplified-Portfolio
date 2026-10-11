'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsVisitorIdPattern } from '@/lib/analytics/data'

function newVisitorId() {
  // getRandomValues also works in local previews where randomUUID may be unavailable.
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 15) | 64
  bytes[8] = (bytes[8] & 63) | 128
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function TrafficTracker() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)
  const visitorId = useRef<string | null>(null)

  useEffect(() => {
    if (lastPath.current === pathname || navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return
    lastPath.current = pathname
    if (!visitorId.current) {
      try { visitorId.current = newVisitorId() } catch { return }
      try {
        const saved = localStorage.getItem('studio-visitor-id')
        if (saved && analyticsVisitorIdPattern.test(saved)) visitorId.current = saved
        localStorage.setItem('studio-visitor-id', visitorId.current)
      } catch { /* Keep the in-memory ID when browser storage is blocked. */ }
    }
    // Never include paths, query strings, email addresses, or raw IPs in the payload.
    void fetch('/api/analytics', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId: visitorId.current }), keepalive: true,
    }).then(async response => {
      if (response.ok && (await response.json()).tracked) window.dispatchEvent(new Event('studio-traffic-updated'))
    }).catch(() => { /* Tracking must never interrupt navigation. */ })
  }, [pathname])

  return null
}
