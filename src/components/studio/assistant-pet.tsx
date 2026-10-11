'use client'

import dynamic from 'next/dynamic'
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react'
import { MessageCircle, Minus, Plus, X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { robotBehavior } from '@/lib/pet/robot-behavior'

const ChatWindow = dynamic(() => import('@/components/blocks/assistant/chat-window').then(module => module.ChatWindow), { ssr: false, loading: () => <p className="p-8 text-sm" role="status">Opening the assistant…</p> })
const AssistantContext = createContext<((opener?: HTMLElement) => void) | null>(null)
export function usePortfolioAssistant() {
  const open = useContext(AssistantContext)
  if (!open) throw new Error('The portfolio assistant provider is missing')
  return open
}

function RobotPet({ paused, reduced, hovered, look }: { paused: boolean; reduced: boolean; hovered: boolean; look: RefObject<{ x: number; y: number }> }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const art = useRef<HTMLSpanElement>(null)
  const elapsed = useRef(0)
  const hoveredRef = useRef(hovered)
  const pausedRef = useRef(paused)
  const resumeRef = useRef<(() => void) | null>(null)
  const [activated, setActivated] = useState(false)
  const [fallback, setFallback] = useState(true)
  const id = useId().replace(/:/g, '')
  useEffect(() => {
    hoveredRef.current = hovered
    pausedRef.current = paused
    if (hovered) setActivated(true)
    resumeRef.current?.()
  }, [hovered, paused])
  useEffect(() => {
    // Keep the lightweight SVG until somebody interacts with the pet.
    if (reduced) { setFallback(true); return }
    if (!canvas.current || !activated) return
    let renderer: ReturnType<typeof import('@/lib/pet/robot-renderer').createRobotRenderer> = null
    let frame = 0
    let disposed = false
    let previousFrame = 0
    let previousClock = 0
    const element = canvas.current
    function draw(time: number) {
      if (disposed) return
      if (reduced || time - previousFrame >= 1000 / 30) {
        if (!reduced && previousClock) elapsed.current += Math.min(.1, Math.max(0, (time - previousClock) / 1000))
        previousClock = time
        const behavior = robotBehavior(elapsed.current, !reduced, hoveredRef.current)
        if (art.current && art.current.dataset.behavior !== behavior) art.current.dataset.behavior = behavior
        renderer?.draw(elapsed.current * 1000, { animated: !reduced, hovered: hoveredRef.current, x: look.current.x, y: look.current.y })
        previousFrame = time
      }
      if (renderer && hoveredRef.current && !pausedRef.current && !document.hidden) frame = requestAnimationFrame(draw)
    }
    function resume() {
      cancelAnimationFrame(frame)
      previousFrame = 0
      previousClock = 0
      if (art.current) art.current.dataset.paused = document.hidden || pausedRef.current || !hoveredRef.current ? 'true' : 'false'
      if (!document.hidden && !pausedRef.current) draw(performance.now())
    }
    function contextLost() { setFallback(true) }
    resumeRef.current = resume
    void import('@/lib/pet/robot-renderer').then(module => {
      if (disposed) return
      renderer = module.createRobotRenderer(element)
      setFallback(!renderer)
      resume()
    }).catch(() => { if (!disposed) setFallback(true) })
    element.addEventListener('webglcontextlost', contextLost)
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('resize', resume, { passive: true })
    return () => { disposed = true; resumeRef.current = null; cancelAnimationFrame(frame); element.removeEventListener('webglcontextlost', contextLost); document.removeEventListener('visibilitychange', resume); window.removeEventListener('resize', resume); renderer?.dispose() }
  }, [activated, reduced, look])

  return <span ref={art} className="assistant-pet-art" data-paused={paused || !hovered || reduced ? 'true' : 'false'} data-behavior={reduced ? 'idle' : 'coding'} aria-hidden="true">
    <span className="assistant-pet-shadow" />
    <canvas ref={canvas} className="assistant-pet-canvas" style={{ visibility: fallback ? 'hidden' : 'visible' }} />
    {fallback && <svg className="assistant-pet-fallback" viewBox="0 0 120 150">
      <defs><linearGradient id={`${id}-shell`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" /><stop offset=".7" stopColor="#e8edf2" /><stop offset="1" stopColor="#a0afc1" /></linearGradient><linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#32c1e5" /><stop offset="1" stopColor="#0876ed" /></linearGradient></defs>
      <g fill={`url(#${id}-shell)`} stroke="#8a9bac" strokeWidth="1"><rect x="41" y="88" width="38" height="34" rx="7" /><g className="pet-fallback-legs"><rect x="43" y="116" width="12" height="16" rx="3" /><rect x="65" y="116" width="12" height="16" rx="3" /></g><g className="pet-fallback-left-arm"><rect x="29" y="95" width="13" height="25" rx="6" transform="rotate(22 35 98)" /></g><g className="pet-fallback-right-arm"><rect x="78" y="95" width="13" height="25" rx="6" transform="rotate(-22 84 98)" /></g></g>
      <g className="pet-fallback-head">
      <path d="M65 28 70 13" stroke="#152538" strokeWidth="3" /><rect x="66" y="7" width="10" height="10" rx="2" fill="#32c1e5" />
      <rect x="21" y="29" width="78" height="64" rx="14" fill={`url(#${id}-shell)`} stroke="#8a9bac" strokeWidth="1" />
      <rect x="28" y="36" width="64" height="49" rx="9" fill="#11263e" /><rect x="31" y="39" width="58" height="43" rx="7" fill={`url(#${id}-screen)`} />
      <g className="assistant-pet-eyes" fill="#102641"><rect x="43" y="52" width="6" height="11" rx="1" /><rect x="71" y="52" width="6" height="11" rx="1" /></g>
      <g className="pet-fallback-smile-eyes" stroke="#102641" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M42 59q4-7 8 0M70 59q4-7 8 0" /></g>
      <path d="M55 67q5 6 10 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /><ellipse cx="39" cy="69" rx="5" ry="2.5" fill="#ffa2bf" /><ellipse cx="81" cy="69" rx="5" ry="2.5" fill="#ffa2bf" />
      </g>
      <rect x="51" y="100" width="18" height="14" rx="3" fill="#0a9deb" /><path d="M56 105v3m8-3v3" stroke="white" strokeWidth="2" />
      <g className="pet-fallback-laptop"><path d="m44 120 58 0-4 6H47Z" fill="#8294aa" /><path d="m66 94 44 1-8 27H58Z" fill="#d7dee7" stroke="#7b8a9e" strokeWidth="1.5" /><g fill="#008fea"><ellipse cx="82" cy="111" rx="4" ry="3" /><circle cx="75" cy="106" r="2" /><circle cx="80" cy="103" r="2" /><circle cx="85" cy="103" r="2" /><circle cx="90" cy="106" r="2" /></g></g>
    </svg>}
  </span>
}

export function PortfolioAssistant({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [hovered, setHovered] = useState(false)
  const opener = useRef<HTMLElement | null>(null)
  const panel = useRef<HTMLElement>(null)
  const panelId = useId()
  const look = useRef({ x: 0, y: 0 })
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const quiet = reduced || !!systemReduced
  const openAssistant = useCallback((element?: HTMLElement) => {
    opener.current = element || (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setHasOpened(true)
    setMinimized(false)
    setOpen(true)
  }, [])
  const closeAssistant = () => {
    setOpen(false)
    if (opener.current?.isConnected) opener.current.focus({ preventScroll: true })
  }
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      const input = window.matchMedia('(pointer: fine)').matches ? panel.current?.querySelector<HTMLTextAreaElement>('textarea') : null
      const target = input || panel.current
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  return <AssistantContext.Provider value={openAssistant}>
    {children}
      <div className={`assistant-pet-dock ${open ? 'is-chat-open' : ''} ${minimized ? 'is-minimized' : ''}`} data-motion={quiet ? 'reduced' : 'full'} onKeyDown={event => {
        if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); closeAssistant() }
      }}>
        {hasOpened && <section ref={panel} id={panelId} className="assistant-chat-panel" hidden={!open} role="dialog" aria-modal="false" aria-labelledby={`${panelId}-title`} aria-describedby={`${panelId}-description`} tabIndex={-1}>
          <header className="assistant-chat-header">
            <span className="assistant-chat-icon" aria-hidden="true"><MessageCircle size={18} /></span>
            <div><h2 id={`${panelId}-title`}>Hitesh’s assistant</h2><p id={`${panelId}-description`}>Ask about projects, skills &amp; experience.</p></div>
            <button type="button" className="assistant-chat-close" aria-label="Minimize chat" onClick={closeAssistant}><X size={17} aria-hidden="true" /></button>
          </header>
          <div className="assistant-chat-content"><ChatWindow active={open} /></div>
        </section>}
        <button type="button" className="assistant-pet-minimize" aria-label={minimized ? 'Show robot pet' : 'Minimize assistant pet'} onClick={() => {
          if (open) closeAssistant()
          setMinimized(current => !current)
          setHovered(false)
        }}>{minimized ? <Plus size={13} /> : <Minus size={13} />}</button>
          <button type="button" className="assistant-pet-launcher" aria-label={open ? 'Minimize portfolio assistant chat' : 'Open Hitesh’s portfolio assistant'} aria-expanded={open} aria-controls={hasOpened ? panelId : undefined} aria-haspopup="dialog" onClick={event => { if (open) closeAssistant(); else openAssistant(event.currentTarget) }} onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true) }} onPointerLeave={() => { setHovered(false); look.current = { x: 0, y: 0 } }} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)} onPointerMove={event => {
            if (quiet || event.pointerType !== 'mouse') return
            const rect = event.currentTarget.getBoundingClientRect()
            look.current = { x: Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)), y: Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)) }
          }}>
            {minimized ? <MessageCircle size={21} aria-hidden="true" /> : <>
              <span className="assistant-pet-greeting">Hey! Got a question?</span>
              <RobotPet paused={open} reduced={quiet} hovered={hovered} look={look} />
              <span className="assistant-pet-label"><MessageCircle size={12} aria-hidden="true" />{open ? 'Hide chat' : 'Ask my AI'}</span>
            </>}
          </button>
      </div>
  </AssistantContext.Provider>
}
