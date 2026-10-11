'use client'

import { useEffect, useRef } from 'react'
import { useMotionSettings } from '@/components/layout/motion-provider'

export function PortfolioCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  const { reduced } = useMotionSettings()

  useEffect(() => {
    const element = cursor.current
    if (!element || reduced) return
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 561px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let x = 0
    let y = 0
    let visible = false

    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      visible = false
      element.dataset.visible = 'false'
      element.dataset.pressed = 'false'
      document.body.classList.remove('studio-custom-cursor')
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') { hide(); return }
      const target = event.target instanceof Element ? event.target : null
      // Keep the familiar text caret in editable fields and the system cursor on embeds.
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe')) { hide(); return }
      x = event.clientX - 32
      y = event.clientY - 32
      const mode = target?.closest('[data-invert-cursor]') ? 'select' : target?.closest('a, button, [role="button"]') ? 'link' : 'default'
      if (element.dataset.mode !== mode) element.dataset.mode = mode
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`
        if (!visible) {
          visible = true
          element.dataset.visible = 'true'
          document.body.classList.add('studio-custom-cursor')
        }
      })
    }
    const down = () => { element.dataset.pressed = 'true' }
    const up = () => { element.dataset.pressed = 'false' }
    // Scrolling can move the hovered element away without a pointermove event.
    const collapse = () => {
      element.dataset.mode = 'default'
      element.dataset.pressed = 'false'
    }
    const visibility = () => { if (document.hidden) hide() }
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') hide() }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    window.addEventListener('scroll', collapse, { passive: true, capture: true })
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', keyboard)
    document.addEventListener('pointerleave', hide)
    document.addEventListener('visibilitychange', visibility)
    media.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('scroll', collapse, true)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', keyboard)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('visibilitychange', visibility)
      media.removeEventListener('change', hide)
    }
  }, [reduced])

  return <div ref={cursor} className="portfolio-cursor" data-visible="false" data-mode="default" data-pressed="false" aria-hidden="true">
    <span className="portfolio-cursor-ring">
      <span className="portfolio-cursor-fill" />
      {['tl', 'tr', 'bl', 'br'].map(corner => <i key={corner} className={`portfolio-cursor-handle cursor-${corner}`} />)}
    </span>
    <span className="portfolio-cursor-label">YOU</span>
  </div>
}
