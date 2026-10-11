'use client'

import Link from 'next/link'
import { Asterisk, Blocks, Star, GraduationCap, ArrowUpRight } from 'lucide-react'
import { experiences } from '@/app/experience/_data/experiences'
import { StudioHeading, SelectionFrame, Polaroid, Sticker, StudioButton } from './primitives'
import { Reveal, Tilt } from './motion'

const principles = [
  { title: 'Understand the problem first.', text: 'Before choosing a model or a framework, I want to understand the actual problem. The most useful system is often simpler than the first idea.', note: 'ask why, then write code.', color: 'cyan' },
  { title: 'Build for real constraints.', text: 'Latency, messy data, cost, and changing requirements are part of the work. I like finding practical solutions that hold up outside a demo.', note: 'the real world is the test.', color: 'yellow' },
  { title: 'Learn by making.', text: 'I read papers, rebuild their ideas, and experiment. Implementing something from scratch helps me see the assumptions that a diagram can hide.', note: 'papers → experiments → understanding.', color: 'green' },
  { title: 'Make the details count.', text: 'Good APIs, understandable errors, dependable data flows, and small interface decisions matter. They make complex technology easier to use.', note: 'small things, big difference.', color: 'pink' },
]

export function StudioAbout() {
  return <div className="about-layout"><nav className="about-sidebar" aria-label="About sections"><a href="#bio"><Asterisk size={26} />Bio</a><a href="#story"><Blocks size={24} />Story</a><a href="#education"><GraduationCap size={24} />Education</a><a href="#work"><Star size={24} />Work</a></nav><div>
    <Reveal><StudioHeading>About</StudioHeading></Reveal>
    <Reveal id="bio"><Sticker>Main bio</Sticker><SelectionFrame color="yellow" className="about-bio"><h2>I’m Hitesh, an AI & ML engineer in Chandigarh. Curious about ideas. Happier when they work.</h2><p>My journey started with computer science and a lot of experiments. I’m pursuing my B.E. in Computer Science (AI & ML) at Chandigarh University, exploring machine learning, NLP, and computer vision.</p><p>I build AI systems, full-stack applications, and tools that turn complicated workflows into something useful. At Pharmacoevidence, I work on AI-assisted research intelligence. Before that, I worked on OCR and answer-evaluation pipelines at Evalvia.Ai.</p><div className="about-portrait-row"><div><p>Beyond work, you’ll find me rebuilding research ideas, contributing to open source, or sketching out the next project. This site is my little corner to share what I’ve learned along the way.</p><p>Always up for a good conversation about AI, tech, or an interesting problem.</p><Link href="/contact" className="small-link">Say hello <ArrowUpRight size={16} /></Link></div><Tilt><Polaroid src="/images/profile-pic.png" alt="Hitesh Kumar" caption="it's me :)" /></Tilt></div></SelectionFrame></Reveal>
    <section id="story" className="about-principles" aria-label="How I work">{principles.map((principle, index) => <Reveal className="about-principle" key={principle.title}><Sticker color={principle.color}>0{index + 1} / How I work</Sticker><h3>{principle.title}</h3><p>{principle.text}</p><p className="hand-note">{principle.note}</p></Reveal>)}</section>
    <section id="education" className="about-timeline" aria-labelledby="education-heading">
      <Reveal><p className="hand-note underlined-note">where I’m learning</p><h2 id="education-heading" className="timeline-heading">Education</h2></Reveal>
      <Reveal className="timeline-entry"><div><h3>Chandigarh University</h3><p>B.E. in Computer Science · Artificial Intelligence & Machine Learning</p></div><span className="font-mono text-xs uppercase">Degree</span></Reveal>
    </section>
    <section id="work" className="about-timeline" aria-labelledby="experience-heading">
      <Reveal><p className="hand-note underlined-note">where I’ve worked</p><h2 id="experience-heading" className="timeline-heading">Work experience</h2></Reveal>
      {experiences.slice(0, 5).map(experience => <Reveal className="timeline-entry" key={experience.slug}><div><h3><Link href={`/experience/${experience.slug}`}>{experience.company} <ArrowUpRight className="inline-block" size={20} /></Link></h3><p className="mb-3">{experience.title}</p><p className="text-muted-foreground">{experience.description[0]}</p></div><time>{experience.period}</time></Reveal>)}
      <div className="mt-8 flex flex-wrap gap-5"><StudioButton href="/api/resume?download=1">Download resume</StudioButton><Link className="small-link" href="/experience">All experience <ArrowUpRight size={16} /></Link></div>
    </section>
  </div></div>
}
