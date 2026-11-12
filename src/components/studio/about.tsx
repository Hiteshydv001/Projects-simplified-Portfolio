'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconContext, User, Compass, GraduationCap, Briefcase, MagnifyingGlass, Gauge, Flask, Sparkle, MapPin, Buildings, Student, HandWaving, DownloadSimple, FileText, ArrowUpRight, type Icon } from '@phosphor-icons/react'
import { experiences } from '@/app/experience/_data/experiences'
import { StudioHeading, Polaroid, Sticker } from './primitives'
import { Reveal, Tilt } from './motion'
import { ResumeDialog } from './resume-dialog'

type Tone = 'cyan' | 'yellow' | 'green' | 'pink'

const principles: { title: string; text: string; note: string; tone: Tone; Icon: Icon }[] = [
  { title: 'Understand the problem first.', text: 'Before choosing a model or a framework, I want to understand the actual problem. The most useful system is often simpler than the first idea.', note: 'ask why, then write code.', tone: 'cyan', Icon: MagnifyingGlass },
  { title: 'Build for real constraints.', text: 'Latency, messy data, cost, and changing requirements are part of the work. I like finding practical solutions that hold up outside a demo.', note: 'the real world is the test.', tone: 'yellow', Icon: Gauge },
  { title: 'Learn by making.', text: 'I read papers, rebuild their ideas, and experiment. Implementing something from scratch helps me see the assumptions that a diagram can hide.', note: 'papers → experiments → understanding.', tone: 'green', Icon: Flask },
  { title: 'Make the details count.', text: 'Good APIs, understandable errors, dependable data flows, and small interface decisions matter. They make complex technology easier to use.', note: 'small things, big difference.', tone: 'pink', Icon: Sparkle },
]

const sections = [
  { id: 'bio', label: 'Bio', Icon: User },
  { id: 'story', label: 'How I work', Icon: Compass },
  { id: 'education', label: 'Education', Icon: GraduationCap },
  { id: 'work', label: 'Work', Icon: Briefcase },
] as const

const facts: { label: string; value: string; Icon: Icon; tone: Tone }[] = [
  { label: 'Based in', value: 'Chandigarh, India', Icon: MapPin, tone: 'cyan' },
  { label: 'Now', value: 'SDE — AI/ML, Pharmacoevidence', Icon: Buildings, tone: 'yellow' },
  { label: 'Studying', value: 'B.E. CSE (AI & ML)', Icon: Student, tone: 'green' },
]

const coursework = ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Data Structures & Algorithms', 'DBMS', 'Cloud Computing']

/** Highlights the section currently in view in the side menu. */
function useActiveSection() {
  const [active, setActive] = useState<string>('bio')
  useEffect(() => {
    const els = sections.map(section => document.getElementById(section.id)).filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-35% 0px -55% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function StudioAbout() {
  const active = useActiveSection()
  return <IconContext.Provider value={{ weight: 'duotone' }}>
    <div className="xp-page ab-page">
      <nav className="ab-nav" aria-label="About sections">
        {sections.map(({ id, label, Icon: SectionIcon }) => <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
          <SectionIcon size={18} aria-hidden="true" /><span>{label}</span>
        </a>)}
      </nav>

      <div className="ab-main">
        <Reveal className="ab-head"><StudioHeading note="the person behind the work">About</StudioHeading></Reveal>

        {/* Bio */}
        <section id="bio" className="xp-hero ab-bio" aria-label="Bio">
          <span className="xp-hero-wave" aria-hidden="true" />
          <div className="ab-bio-copy">
            <span className="xp-kicker">Main bio</span>
            <h2 className="ab-statement">I’m Hitesh, an AI &amp; ML engineer in Chandigarh. Curious about ideas. Happier when they work.</h2>
            <p>My journey started with computer science and a lot of experiments. I’m pursuing my B.E. in Computer Science (AI &amp; ML) at Chandigarh University, exploring machine learning, NLP and computer vision.</p>
            <p>I build AI systems, full-stack applications and tools that turn complicated workflows into something useful. At Pharmacoevidence I work on AI-assisted research intelligence; before that, I worked on OCR and answer-evaluation pipelines at Evalvia.Ai.</p>
            <p>Beyond work, you’ll find me rebuilding research ideas, contributing to open source, or sketching out the next project. Always up for a good conversation about AI, tech or an interesting problem.</p>
            <div className="ab-facts">{facts.map(({ label, value, Icon: FactIcon, tone }) => <div key={label} className="ab-fact"><span className={`xp-tile xp-tone-${tone}`} aria-hidden="true"><FactIcon size={16} /></span><span><small>{label}</small><strong>{value}</strong></span></div>)}</div>
            <div className="xp-actions">
              <Link href="/contact" className="studio-button xp-primary"><span className="button-icon"><HandWaving size={18} aria-hidden="true" /></span><span>Say hello</span></Link>
              <ResumeDialog><a className="rk-btn" href="/api/resume" target="_blank" rel="noopener noreferrer"><FileText size={15} aria-hidden="true" />View résumé</a></ResumeDialog>
            </div>
          </div>
          <div className="ab-photo"><Tilt><Polaroid src="/images/profile-pic.png" alt="Hitesh Kumar" caption="it's me :)" /></Tilt></div>
        </section>

        {/* How I work */}
        <section id="story" className="ab-section" aria-label="How I work">
          <div className="ab-section-head"><p className="hand-note">how I work</p><h2>Four habits behind everything I build</h2></div>
          <div className="ab-principles">{principles.map(({ title, text, note, tone, Icon: PrincipleIcon }, index) => <Reveal key={title} className="xp-card ab-principle" data-tone={tone}>
            <div className="ab-principle-top"><span className={`xp-tile xp-tone-${tone}`} aria-hidden="true"><PrincipleIcon size={16} /></span><span className="xp-num">{String(index + 1).padStart(2, '0')}</span></div>
            <h3>{title}</h3>
            <p>{text}</p>
            <p className="hand-note ab-principle-note">{note}</p>
          </Reveal>)}</div>
        </section>

        {/* Education */}
        <section id="education" className="ab-section" aria-label="Education">
          <div className="ab-section-head"><p className="hand-note">where I’m learning</p><h2>Education</h2></div>
          <div className="xp-card ab-edu">
            <span className="xp-tile xp-tone-green ab-edu-tile" aria-hidden="true"><GraduationCap size={20} /></span>
            <div className="ab-edu-copy">
              <div className="ab-edu-top"><h3>Chandigarh University</h3><Sticker color="yellow" className="xp-period">2022 – 2026</Sticker></div>
              <p>B.E. in Computer Science · Artificial Intelligence &amp; Machine Learning</p>
              <div className="rk-chips">{coursework.map(course => <kbd key={course}>{course}</kbd>)}</div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="ab-section" aria-label="Work experience">
          <div className="ab-section-head"><p className="hand-note">where I’ve worked</p><h2>Work experience</h2></div>
          <ol className="rk-timeline ab-timeline">
            {experiences.slice(0, 5).map(experience => {
              const current = /present/i.test(experience.period)
              return <li key={experience.slug} className="rk-role" data-current={current ? 'true' : undefined}>
                <div className="rk-role-when"><span>{experience.period}</span><small>{experience.location.split('·').pop()?.trim()}</small></div>
                <div className="rk-role-dot" aria-hidden="true" />
                <Link href={`/experience/${experience.slug}`} className="rk-card rk-role-card ab-role">
                  <span className="ab-role-logo"><Image src={experience.image} alt="" fill sizes="40px" className="object-cover" /></span>
                  <span className="ab-role-copy"><strong>{experience.company}{current && <Sticker color="yellow" className="rk-now">now ✦</Sticker>}</strong><small>{experience.title}</small><span>{experience.description[0]}</span></span>
                  <ArrowUpRight className="ab-role-go" size={16} aria-hidden="true" />
                </Link>
              </li>
            })}
          </ol>
          <div className="xp-actions ab-work-actions">
            <a href="/api/resume?download=1" download className="studio-button xp-primary"><span className="button-icon"><DownloadSimple size={18} aria-hidden="true" /></span><span>Download résumé</span></a>
            <Link href="/experience" className="rk-btn">All experience <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </div>
  </IconContext.Provider>
}
