'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Code2, FlaskConical, GraduationCap, ScrollText, FileText } from 'lucide-react'
import { majorProjects } from '@/app/projects/_data/projects-data'
import { SelectionFrame, StudioHeading, Polaroid, StudioButton, Sticker, Flower, LabelPointer } from './primitives'
import { Reveal, Draggable } from './motion'
import { FeaturedProjects } from './project-card'
import { VisitorCounter } from '@/components/blocks/homepage/VisitorCounter'
import { FloatingHero, Floating } from './floating'
import { AboutPreview } from './about-preview'

const featured = [majorProjects[0], majorProjects[8], majorProjects[2], majorProjects[3]]
const experiments = [
  { href: '/ai-playground', image: '/paper-implementations/autograd-logic/dag.png', title: 'Inside the machine.', type: 'Interactive AI lab', text: 'Attention patterns, embeddings, and a little drawing experiment. Learn by playing.' },
  { href: '/research/train-ticket', image: '/research/train-prediction.jpg', title: 'Will my ticket confirm?', type: 'Research · 2024', text: 'Using machine learning to make sense of waitlisted railway tickets.' },
  { href: '/paper-implementations', image: '/projects/multi-rag.png', title: 'Papers, meet Python.', type: 'Implementation notes', text: 'Rebuilding ideas from research papers to understand what makes them work.' },
  { href: '/patents', image: '/patents/smart-earbud.jpg', title: 'Ideas beyond the screen.', type: 'Inventions', text: 'Smart earbuds, contactless health monitoring, and autonomous underwater systems.' },
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

export function StudioHome() {
  return <div className="studio-home">
    <FloatingHero>
      <LiveClock />
      <Draggable className="hero-float hero-portrait" rotation={-8}><Floating depth={-10} amplitude={9} duration={8}><Polaroid src="/images/profile-pic.png" alt="Hitesh Kumar" caption="hey, that's me!" /></Floating></Draggable>
      <Reveal className="hero-identity"><p className="hand-note underlined-note hero-note">my name is</p><SelectionFrame className="hero-name" invertCursor><h1>Hitesh</h1></SelectionFrame><div className="hero-availability"><i className="availability-dot" aria-hidden="true" />Open to thoughtful collaborations</div></Reveal>
      <Draggable className="hero-float hero-intern" rotation={13}><Floating depth={7} amplitude={6} duration={6.5} phase={.6}><Sticker color="green">Building RAG systems.</Sticker></Floating></Draggable>
      <Draggable className="hero-float hero-award" rotation={-8}><Floating depth={-8} amplitude={8} duration={7.5} phase={1.2}><Sticker color="cyan"><Code2 size={20} />LLMs & Agentic AI</Sticker></Floating></Draggable>
      <div className="hero-float hero-avatar-anchor"><Floating depth={12} amplitude={10} duration={6} phase={.3}><span className="hero-avatar"><Image src="/images/profile-pic.png" alt="" fill sizes="50px" className="object-cover" /></span></Floating></div>
      <Reveal delay={0.15}><h2 className="hero-statement">I build <span className="target-mark" aria-hidden="true">◎</span> intelligent systems<br />that people can use <Flower />.</h2><StudioButton href="#featured-work">Featured work</StudioButton></Reveal>
      <div className="hero-float hero-role-anchor"><Floating depth={11} amplitude={8} duration={8.5} phase={.8}><span className="hero-role">AI / ML ENGINEER<LabelPointer /></span></Floating></div><div className="hero-float hero-lab-anchor"><Floating depth={-12} amplitude={9} duration={7} phase={1.7}><span className="hero-lab">RETRIEVE → REASON<LabelPointer /></span></Floating></div>
    </FloatingHero>

    <AboutPreview />

    <section id="featured-work" className="studio-featured">
      <Reveal><StudioHeading as="h2" note="explore my work!">Featured<br />works</StudioHeading><div className="featured-description"><Sticker>A few things I’ve built. Some shipped, some still being explored.</Sticker></div></Reveal>
      <FeaturedProjects projects={featured} />
      <Reveal className="featured-all"><StudioButton href="/case-study">View all projects</StudioButton></Reveal>
    </section>

    <section id="experiments" className="studio-experiments">
      <Reveal><StudioHeading as="h2" note="side quests & happy accidents">Experiments</StudioHeading></Reveal>
      <div className="experiment-grid">{experiments.map((item, index) => <Reveal key={item.href} delay={index % 2 * .08}><Link href={item.href} className="experiment-card"><div className="experiment-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 560px) 90vw, (max-width: 1440px) 42vw, 580px" className="object-contain" /></div><span className="project-date">{item.type}</span><h3>{item.title} <ArrowUpRight className="inline-block" size={23} /></h3><p>{item.text}</p></Link></Reveal>)}</div>
    </section>
    <nav className="studio-credential-strip" aria-label="More of my work"><Link href="/experience"><Code2 size={18} />Experience <ArrowUpRight size={15} /></Link><Link href="/certificates"><GraduationCap size={20} />Certificates <ArrowUpRight size={15} /></Link><Link href="/research"><FlaskConical size={18} />Research <ArrowUpRight size={15} /></Link><Link href="/patents"><ScrollText size={18} />Patents <ArrowUpRight size={15} /></Link><Link href="/resume"><FileText size={18} />Resume <ArrowUpRight size={15} /></Link></nav>
    <VisitorCounter />
  </div>
}
