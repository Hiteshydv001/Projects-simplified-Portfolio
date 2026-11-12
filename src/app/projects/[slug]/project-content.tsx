'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IconContext, GithubLogo, Globe, ArrowUpRight, ArrowLeft, Lightbulb, Target, Sparkle, Wrench, GraduationCap, RocketLaunch, Stack, Images, type Icon } from '@phosphor-icons/react'
import type { Project } from '../_types/project-types'
import { categoryLabels } from '../_types/project-types'
import { majorProjects } from '../_data/projects-data'
import { Sticker } from '@/components/studio/primitives'
import { projectSlug } from '@/components/studio/project-card'

type Tone = 'cyan' | 'yellow' | 'green' | 'pink'

const sectionMeta: { key: 'challenges' | 'keyFeatures' | 'implementation' | 'learnings' | 'futureWork'; title: string; label: string; Icon: Icon; tone: Tone }[] = [
  { key: 'challenges', title: 'The real challenges', label: 'Problem', Icon: Target, tone: 'pink' },
  { key: 'keyFeatures', title: 'What it does', label: 'Solution', Icon: Sparkle, tone: 'cyan' },
  { key: 'implementation', title: 'From idea to implementation', label: 'Build', Icon: Wrench, tone: 'yellow' },
  { key: 'learnings', title: 'What I took away', label: 'Learnings', Icon: GraduationCap, tone: 'green' },
  { key: 'futureWork', title: 'What comes next', label: 'Next steps', Icon: RocketLaunch, tone: 'cyan' },
]

const TONES: Tone[] = ['cyan', 'yellow', 'green', 'pink']

export default function ProjectContent({ project }: { project: Project }) {
  const sections = sectionMeta.filter(section => project[section.key]?.length)
  const heroImage = project.images?.[0]
  const gallery = project.images?.slice(1) ?? []
  const nextProjects = majorProjects.filter(item => item.featured && item.title !== project.title).slice(0, 3)
  const notes = [
    { label: 'Role', value: 'Engineering & implementation' },
    { label: 'Focus', value: categoryLabels[project.category] },
    { label: 'Built with', value: project.techStack.slice(0, 3).join(', ') },
    { label: 'Explore', value: project.live ? 'Code + live app' : 'Source & implementation' },
  ]

  return <IconContext.Provider value={{ weight: 'duotone' }}>
    <article className="xp-page pj-page">
      <Link href="/case-study" className="back-pill"><span className="back-pill-icon" aria-hidden="true"><ArrowLeft size={14} weight="bold" /></span>All projects</Link>

      {/* Header: Flux title and brand sticky notes on a polished pastel card */}
      <header id="intro" className="xp-hero pj-hero">
        <span className="xp-hero-wave" aria-hidden="true" />
        <div className="pj-hero-copy">
          <p className="hand-note pj-hero-note">a closer look</p>
          <span className="xp-kicker">{categoryLabels[project.category]}</span>
          <h1 className="xp-title">{project.title}</h1>
          <p className="pj-summary">{project.description}</p>
          <div className="xp-actions">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="studio-button xp-primary"><span className="button-icon"><GithubLogo size={18} aria-hidden="true" /></span><span>Source code</span></a>
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="rk-btn"><Globe size={15} aria-hidden="true" />Live demo</a>}
          </div>
        </div>
        <aside className="pj-notes" aria-label="Project overview">
          {notes.map((note, index) => <Sticker key={note.label} color={TONES[index]} className="pj-note"><strong>{note.label}</strong>{note.value}</Sticker>)}
        </aside>
      </header>

      {heroImage && <figure className="xp-window pj-cover">
        <div className="xp-window-bar"><i /><i /><i /><span>{project.title}</span></div>
        <div className="pj-cover-media"><Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 760px) 92vw, 1180px" className="object-cover" /></div>
      </figure>}

      <nav className="pj-tabs" aria-label="Case study sections">
        <a href="#overview">Overview</a>
        {sections.map(section => <a key={section.key} href={`#${section.key}`}>{section.label}</a>)}
        <a href="#stack">Stack</a>
      </nav>

      <div className="pj-grid">
        <div className="xp-col">
          <section id="overview" className="xp-card pj-section">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-yellow" aria-hidden="true"><Lightbulb size={16} /></span>Overview</h2>
            <h3 className="pj-section-title">What I set out to build</h3>
            <p className="pj-text">{project.longDescription || project.description}</p>
            {project.highlights && <div className="pj-highlights">{project.highlights.map((highlight, index) => <Sticker key={highlight} color={TONES[index % 4]} className="pj-highlight">{highlight}</Sticker>)}</div>}
          </section>

          {sections.map(({ key, title, label, Icon: SectionIcon, tone }) => <section key={key} id={key} className="xp-card pj-section">
            <h2 className="xp-card-title"><span className={`xp-tile xp-tone-${tone}`} aria-hidden="true"><SectionIcon size={16} /></span>{label}</h2>
            <h3 className="pj-section-title">{title}</h3>
            <ol className="xp-points">{project[key]?.map((item, index) => <li key={item}><span className="xp-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></li>)}</ol>
          </section>)}
        </div>

        <aside className="xp-col pj-side">
          <section id="stack" className="xp-card">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-green" aria-hidden="true"><Stack size={16} /></span>Under the hood</h2>
            <div className="rk-chips xp-chips">{project.techStack.map(tech => <kbd key={tech}>{tech}</kbd>)}</div>
          </section>
          <section className="xp-card">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-cyan" aria-hidden="true"><Globe size={16} /></span>Links</h2>
            <div className="pj-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer"><GithubLogo size={18} aria-hidden="true" /><span><strong>Source code</strong><small>GitHub repository</small></span><ArrowUpRight size={14} aria-hidden="true" /></a>
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><Globe size={18} aria-hidden="true" /><span><strong>Live demo</strong><small>Try it in the browser</small></span><ArrowUpRight size={14} aria-hidden="true" /></a>}
            </div>
          </section>
        </aside>
      </div>

      {gallery.length > 0 && <section className="pj-gallery" aria-label="More screenshots">
        <h2 className="xp-card-title"><span className="xp-tile xp-tone-pink" aria-hidden="true"><Images size={16} /></span>More screens</h2>
        <div className="pj-gallery-grid">{gallery.map(image => <figure key={image.src} className="xp-window"><div className="xp-window-bar"><i /><i /><i /><span>{image.alt}</span></div><div className="pj-cover-media"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 45vw" className="object-cover" /></div></figure>)}</div>
      </section>}

      <section className="pj-next" aria-label="More projects">
        <div className="rk-head pj-next-head"><p className="hand-note">that’s not all</p><h2 className="studio-heading">More projects</h2></div>
        <div className="rk-work-grid">{nextProjects.map((item, index) => {
          const image = item.images?.[0]
          return <article key={item.title} className="rk-card rk-project" data-tint={['sky', 'lilac', 'peach'][index % 3]}>
            <Link href={`/case-study/${projectSlug(item)}`} className="rk-project-cover" tabIndex={-1} aria-hidden="true">
              {image ? <Image src={image.src} alt="" fill sizes="(max-width: 640px) 90vw, 380px" className="object-cover" /> : <span className="rk-project-mono">{item.title.slice(0, 2)}</span>}
            </Link>
            <div className="rk-project-body">
              <span className="rk-kicker">{categoryLabels[item.category]}</span>
              <h3><Link href={`/case-study/${projectSlug(item)}`}>{item.title.replace(' - Remote Proctoring System', '')}</Link></h3>
              <p>{item.description}</p>
              <div className="rk-project-links">
                <Link href={`/case-study/${projectSlug(item)}`}>Case study <ArrowUpRight size={13} aria-hidden="true" /></Link>
                <a href={item.link} target="_blank" rel="noopener noreferrer"><GithubLogo size={13} aria-hidden="true" />Code</a>
                {item.live && <a href={item.live} target="_blank" rel="noopener noreferrer"><Globe size={13} aria-hidden="true" />Live demo</a>}
              </div>
            </div>
          </article>
        })}</div>
        <div className="rk-center"><Link href="/case-study" className="rk-btn">All projects <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </section>
    </article>
  </IconContext.Provider>
}
