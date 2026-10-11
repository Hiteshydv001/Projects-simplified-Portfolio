'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { conversationStarters } from '@/lib/content/conversation-starters'
import { Flower, SelectionFrame } from './primitives'

const bubbles = [
  { label: 'hello!', color: 'cyan' },
  { label: 'what if?', color: 'yellow' },
  { label: 'let’s build', color: 'pink' },
] as const

export function Icebreaker() {
  const [popped, setPopped] = useState<number[]>([])
  const firstStarter = useRef<HTMLAnchorElement>(null)
  const firstBubble = useRef<HTMLButtonElement>(null)
  const replaying = useRef(false)
  const complete = popped.length === bubbles.length
  const systemReduced = useReducedMotion()
  const { reduced } = useMotionSettings()
  const quiet = reduced || systemReduced

  useEffect(() => {
    if (complete) firstStarter.current?.focus({ preventScroll: true })
    if (popped.length === 0 && replaying.current) { firstBubble.current?.focus({ preventScroll: true }); replaying.current = false }
  }, [complete, popped.length])

  return <SelectionFrame className="icebreaker">
    <div className="icebreaker-top"><h3 className="hand-note">break the ice!</h3><span className="icebreaker-score" aria-hidden="true">{popped.length} / 3</span></div>
    <p className="icebreaker-instruction">{complete ? 'Every good conversation starts somewhere.' : 'Pop three bubbles. Find your opening line.'}</p>
    <span className="sr-only" role="status">{complete ? 'Ice broken! Choose a conversation starter below.' : `${popped.length} of 3 bubbles popped.`}</span>
    <div className="icebreaker-board">
      {complete ? <motion.div className="icebreaker-finish" initial={{ opacity: 0, y: quiet ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: quiet ? 0 : .25 }}><Flower /><p className="hand-note">ice, broken.</p><div className="icebreaker-starters">{conversationStarters.map((starter, index) => <Link ref={index === 0 ? firstStarter : undefined} key={starter.id} href={`/contact?starter=${starter.id}`}>{starter.label}<ArrowUpRight size={16} /></Link>)}</div></motion.div> : bubbles.map((bubble, index) => <div className={`ice-bubble-wrap ice-bubble-${index}`} key={bubble.label}><motion.button ref={index === 0 ? firstBubble : undefined} className={`ice-bubble ice-bubble-${bubble.color}`} type="button" aria-label={`Pop the ${bubble.label} bubble`} disabled={popped.includes(index)} onClick={() => setPopped(current => current.includes(index) ? current : [...current, index])} animate={{ opacity: popped.includes(index) ? 0 : 1, scale: popped.includes(index) ? .65 : 1 }} whileHover={quiet ? undefined : { scale: 1.06 }} whileTap={quiet ? undefined : { scale: .92 }} transition={{ duration: quiet ? 0 : .2 }}><svg viewBox="0 0 160 100" aria-hidden="true" focusable="false"><path d="M22 3H138A19 19 0 0 1 157 22V57A19 19 0 0 1 138 76H44L21 96L25 76H22A19 19 0 0 1 3 57V22A19 19 0 0 1 22 3Z" /></svg><span>{bubble.label}</span></motion.button>{popped.includes(index) && <motion.span className="ice-bubble-pop" aria-hidden="true" initial={{ opacity: 1, scale: quiet ? 1 : .5 }} animate={{ opacity: .3, scale: 1.2 }} transition={{ duration: quiet ? 0 : .4 }}>✦</motion.span>}</div>)}
    </div>
    <div className="icebreaker-bottom"><Link className="small-link" href="/contact">{complete ? 'Write your own hello' : 'Or jump straight in'}<ArrowUpRight size={15} /></Link>{popped.length > 0 && <button className="icebreaker-replay" type="button" onClick={() => { replaying.current = true; setPopped([]) }} aria-label="Play the icebreaker again"><RotateCcw size={14} />Again</button>}</div>
  </SelectionFrame>
}
