'use client'

import { MotionConfig } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'

const MotionSettings = createContext({ reduced: false, toggle: () => {} })
export const useMotionSettings = () => useContext(MotionSettings)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    try { setReduced(localStorage.getItem('studio-reduced-motion') === 'true') } catch { /* Storage may be unavailable. */ }
  }, [])
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full' }, [reduced])
  const toggle = () => setReduced(current => {
    try { localStorage.setItem('studio-reduced-motion', String(!current)) } catch { /* Keep the setting for this visit. */ }
    return !current
  })
  return <MotionSettings.Provider value={{ reduced, toggle }}><MotionConfig reducedMotion={reduced ? 'always' : 'user'}>{children}</MotionConfig></MotionSettings.Provider>
}
