'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BrainCircuit, Blocks, Code2, Asterisk } from 'lucide-react'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { Floating, FloatingSection } from './floating'
import { Draggable, Reveal } from './motion'
import { Flower, Polaroid, SelectionFrame } from './primitives'

const skills = [
  { label: 'AI Engineering', Icon: BrainCircuit },
  { label: 'Agentic systems', Icon: Blocks },
  { label: 'Full stack', Icon: Code2 },
  { label: 'Research', Icon: Asterisk },
]

export function AboutPreview() {
  const section = useRef<HTMLElement>(null)
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const animated = !reduced && !systemReduced
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })
  const leftDrift = useTransform(scrollYProgress, [0, 1], [28, -28])
  const rightDrift = useTransform(scrollYProgress, [0, 1], [-22, 22])

  return <FloatingSection sectionRef={section} className="studio-about-preview" label="A little about me">
    <p className="hand-note about-preview-note">about me!</p>
    <Reveal>
      <SelectionFrame color="ink" className="about-preview-title">what’s up</SelectionFrame>
      <h2 className="about-statement">A curious mind <motion.span className="inline-photo" whileHover={animated ? { scale: 1.13, rotate: -6 } : undefined} transition={{ type: 'spring', stiffness: 260, damping: 18 }}><Image src="/images/profile-pic.png" alt="" fill sizes="60px" className="object-cover" /></motion.span> who turned<br className="hidden md:block" /> ideas into <Flower /> systems<br className="hidden md:block" /> along the way.</h2>
    </Reveal>
    <motion.div className="about-photo-left" style={{ y: animated ? leftDrift : 0 }} initial={{ opacity: animated ? 0 : 1, x: animated ? -45 : 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .25 }} transition={{ duration: animated ? .7 : 0, ease: [.22, 1, .36, 1] }}>
      <Draggable rotation={12}><Floating depth={-11} amplitude={8} duration={7.5}><Polaroid src="/images/about-workspace.svg" alt="Illustrated coding workspace with a laptop and coffee" caption="curiosity, meet code" /></Floating></Draggable>
    </motion.div>
    <motion.div className="about-photo-right" style={{ y: animated ? rightDrift : 0 }} initial={{ opacity: animated ? 0 : 1, x: animated ? 45 : 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .25 }} transition={{ duration: animated ? .7 : 0, delay: animated ? .1 : 0, ease: [.22, 1, .36, 1] }}>
      <Draggable rotation={-12}><Floating depth={9} amplitude={7} duration={8.5} phase={.7}><Polaroid src="/images/about-systems.svg" alt="Illustrated AI workflow connecting research, data, code, and a finished system" caption="ideas into systems" /></Floating></Draggable>
    </motion.div>
    <div className="skill-strips">{skills.map(({ label, Icon }, index) => <motion.span className="skill-strip" key={label}
      initial={{ opacity: animated ? 0 : 1, y: animated ? 24 : 0, rotate: animated ? (index % 2 ? 4 : -4) : 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: false, amount: .6 }}
      transition={{ duration: animated ? .5 : 0, delay: animated ? index * .09 : 0, ease: [.22, 1, .36, 1] }}
      whileHover={animated ? { y: -5, rotate: index % 2 ? 2 : -2, scale: 1.025, transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0 } } : undefined}>
      {label}<Icon size={34} aria-hidden="true" />
    </motion.span>)}</div>
    <Reveal delay={.2}><Link href="/about" className="small-link">A little more about me <ArrowUpRight size={16} /></Link></Reveal>
  </FloatingSection>
}
