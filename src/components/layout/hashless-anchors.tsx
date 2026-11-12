'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * In-page links (href="#section") scroll smoothly to their section without leaving
 * "#section" in the address bar. Arriving with a hash still lands on the section,
 * then the URL is tidied.
 */
export function HashlessAnchors() {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = () => document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clean = () => { if (window.location.hash) history.replaceState(history.state, '', window.location.pathname + window.location.search) }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const id = decodeURIComponent(link.getAttribute('href')!.slice(1))
      const target = id === '' || id === 'top' ? document.documentElement : document.getElementById(id)
      if (!target) return
      event.preventDefault()
      if (target === document.documentElement) window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })
      else target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' })
      // Move keyboard focus with the scroll so screen readers and Tab follow along.
      if (target !== document.documentElement) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
      clean()
    }

    document.addEventListener('click', onClick)
    // Landed with a hash (shared link): let the browser scroll there, then tidy the URL.
    const timer = window.setTimeout(clean, 600)
    return () => { document.removeEventListener('click', onClick); window.clearTimeout(timer) }
  }, [pathname])

  return null
}
