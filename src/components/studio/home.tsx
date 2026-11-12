'use client'

import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Code2, FileText } from 'lucide-react'
import { SelectionFrame, StudioHeading, Polaroid, StudioButton, Sticker, Flower, LabelPointer } from './primitives'
import { Reveal, Draggable } from './motion'
import { RecruiterSnapshot, RecruiterExperience, RecruiterWork, RecruiterCredentials } from './recruiter'
import { VisitorCounter } from '@/components/blocks/homepage/VisitorCounter'
import { FloatingHero, Floating } from './floating'
import { AboutPreview } from './about-preview'
import { PixelSky } from './pixel-sky'

const experiments = [
  { href: '/ai-playground', image: '/paper-implementations/autograd-logic/dag.png', title: 'Inside the machine.', type: 'Interactive AI lab', app: 'ai-lab', tags: ['Attention', 'Embeddings', 'Pictionary'], tint: 'sky', text: 'Attention patterns, embeddings, and a little drawing experiment. Learn by playing.' },
  { href: '/research/train-ticket', image: '/research/train-prediction.jpg', title: 'Will my ticket confirm?', type: 'Research · 2024', app: 'research', tags: ['Classification', 'Indian Railways'], tint: 'peach', text: 'Using machine learning to make sense of waitlisted railway tickets.' },
  { href: '/paper-implementations', image: '/projects/multi-rag.png', title: 'Papers, meet Python.', type: 'Implementation notes', app: 'notebook', tags: ['PyTorch', 'Transformers', 'Autograd'], tint: 'mint', text: 'Rebuilding ideas from research papers to understand what makes them work.' },
  { href: '/patents', image: '/patents/smart-earbud.jpg', title: 'Ideas beyond the screen.', type: 'Inventions', app: 'patents', tags: ['Hardware', 'Health', 'Robotics'], tint: 'lilac', text: 'Smart earbuds, contactless health monitoring, and autonomous underwater systems.' },
]

function LiveClock() {
  const [time, setTime] = useState('—:—:—')
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <span className="hero-clock">{time} <span className="opacity-50">IST</span></span>
}

function ExperimentCard({ item }: { item: typeof experiments[number] }) {
  // Cursor-following spotlight on the stage.
  const track = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }
  return <Link href={item.href} className="experiment-card" data-tint={item.tint} onPointerMove={track}>
    <div className="experiment-stage">
      <span className="experiment-wave" aria-hidden="true" />
      <div className="experiment-window experiment-window-ghost" aria-hidden="true"><div className="experiment-window-bar"><i /><i /><i /></div></div>
      <div className="experiment-window">
        <div className="experiment-window-bar"><i /><i /><i /><span>{item.app}</span></div>
        <div className="experiment-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 560px) 80vw, (max-width: 1440px) 36vw, 500px" className="object-contain" /></div>
      </div>
      <span className="experiment-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
    </div>
    <div className="experiment-body">
      <span className="experiment-kicker">{item.type}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="experiment-keys">{item.tags.map(tag => <kbd key={tag}>{tag}</kbd>)}</div>
    </div>
  </Link>
}

export function StudioHome() {
  return <div className="studio-home">
    <FloatingHero>
      <PixelSky />
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}><filter id="hero-liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves={1} seed={1} result="turbulence" /><feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" /><feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" /><feGaussianBlur in="displaced" stdDeviation="4" /></filter></svg>
      <LiveClock />
      <Draggable className="hero-float hero-portrait" rotation={-8}><Floating depth={-10} amplitude={9} duration={8}><Polaroid src="/images/profile-pic.png" alt="Hitesh Kumar" caption="hey, that's me!" /></Floating></Draggable>
      <Reveal className="hero-identity"><p className="hand-note underlined-note hero-note">my name is</p><SelectionFrame className="hero-name" invertCursor><h1>Hitesh</h1></SelectionFrame><div className="hero-availability"><i className="availability-dot" aria-hidden="true" />Open to thoughtful collaborations</div></Reveal>
      <Draggable className="hero-float hero-intern" rotation={13}><Floating depth={7} amplitude={6} duration={6.5} phase={.6}><Sticker color="green">Building RAG systems.</Sticker></Floating></Draggable>
      <Draggable className="hero-float hero-award" rotation={-8}><Floating depth={-8} amplitude={8} duration={7.5} phase={1.2}><Sticker color="cyan"><Code2 size={20} />LLMs & Agentic AI</Sticker></Floating></Draggable>
      <div className="hero-float hero-avatar-anchor"><Floating depth={12} amplitude={10} duration={6} phase={.3}><span className="hero-avatar"><Image src="/images/profile-pic.png" alt="" fill sizes="50px" className="object-cover" /></span></Floating></div>
      <Reveal delay={0.15}><h2 className="hero-statement">I build <span className="target-mark" aria-hidden="true">◎</span> intelligent systems<br />that people can use <Flower />.</h2><p className="hero-subline">AI/ML Engineer · SDE at Pharmacoevidence · RAG, LLM agents &amp; voice AI</p><div className="hero-ctas"><StudioButton href="#featured-work">Featured work</StudioButton><a className="studio-button hero-resume" href="/api/resume?download=1" download><span className="button-icon"><FileText size={18} /></span><span>Résumé</span></a></div><a href="#snapshot" className="hero-skim">Hiring? Read the 30-second version ↓</a></Reveal>
      <div className="hero-float hero-role-anchor"><Floating depth={11} amplitude={8} duration={8.5} phase={.8}><span className="hero-role">AI / ML ENGINEER<LabelPointer /></span></Floating></div><div className="hero-float hero-lab-anchor"><Floating depth={-12} amplitude={9} duration={7} phase={1.7}><span className="hero-lab">RETRIEVE → REASON<LabelPointer /></span></Floating></div>
    </FloatingHero>

    <AboutPreview />
    <RecruiterSnapshot />
    <RecruiterExperience />
    <RecruiterWork />
    <RecruiterCredentials />

    <section id="experiments" className="studio-experiments">
      <Reveal><StudioHeading as="h2" note="prototypes, papers & inventions">R&amp;D Lab</StudioHeading></Reveal>
      <div className="experiment-grid">{experiments.map((item, index) => <Reveal key={item.href} delay={index % 2 * .08}><ExperimentCard item={item} /></Reveal>)}</div>
    </section>
    <VisitorCounter />
  </div>
}
