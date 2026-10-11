'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useMotionSettings } from '@/components/layout/motion-provider'
import type { ReactNode, CSSProperties } from 'react'

export function Reveal({ children, className = '', id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  // Render content immediately, including before client hydration.
  return <div id={id} className={className}>{children}</div>
}

export function Tilt({ children, className = '', style, strength = 3 }: { children: ReactNode; className?: string; style?: CSSProperties; strength?: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 })
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  return <motion.div className={className} style={{ ...style, rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={event => {
    if (event.pointerType !== 'mouse' || reduced || systemReduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(-(event.clientY - rect.top - rect.height / 2) / rect.height * strength)
    y.set((event.clientX - rect.left - rect.width / 2) / rect.width * strength)
  }} onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

export function Draggable({ children, className = '', rotation }: { children: ReactNode; className?: string; rotation?: number }) {
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  return <motion.div className={className} style={{ rotate: rotation }} drag={!reduced && !systemReduced} dragConstraints={{ left: -45, right: 45, top: -35, bottom: 35 }} dragElastic={0.15} whileDrag={{ scale: 1.04, zIndex: 5 }} dragSnapToOrigin>{children}</motion.div>
}
