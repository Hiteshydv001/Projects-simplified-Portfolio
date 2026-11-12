'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconContext, ArrowUpRight, DownloadSimple as Download, FileText, GithubLogo as Github, LinkedinLogo as Linkedin, EnvelopeSimple as Mail, CalendarDots as CalendarDays, Sparkle as Sparkles, Flask as FlaskConical, Scroll as ScrollText, SealCheck as BadgeCheck, Briefcase, Code as Code2, Globe } from '@phosphor-icons/react'
import { majorProjects } from '@/app/projects/_data/projects-data'
import { profile, roles, moreRolesNote, selectedWork, credentials } from '@/lib/content/recruiter'
import { projectSlug } from './project-card'
import { BookingDialog, BOOKING_URL } from './booking'
import { ResumeDialog } from './resume-dialog'
import { Reveal } from './motion'
import { StudioHeading, SelectionFrame, Sticker } from './primitives'

// Section heads keep the studio signature: a handwritten note over a Flux display heading.
function SectionHead({ note, title, children }: { note: string; title: ReactNode; children?: ReactNode }) {
  return <Reveal className="rk-head"><StudioHeading as="h2" note={note}>{title}</StudioHeading>{children && <div className="rk-lede">{children}</div>}</Reveal>
}

const STICKERS = ['yellow', 'green', 'pink', 'cyan'] as const

/* ------------------------------------------------------------------ */
/*  The 30-second version                                              */
/* ------------------------------------------------------------------ */

export function RecruiterSnapshot() {
  return <IconContext.Provider value={{ weight: 'duotone' }}><section id="snapshot" className="rk-section rk-snapshot" aria-labelledby="snapshot-title">
    <SectionHead note="for busy recruiters ↓" title="The short version">
      <SelectionFrame color="ink" className="rk-statement"><span id="snapshot-title">{profile.role} who takes LLM ideas to production.</span></SelectionFrame>
      <span className="rk-summary">{profile.summary}</span>
    </SectionHead>

    <div className="rk-snapshot-grid">
      <Reveal className="rk-card rk-facts">
        <dl>{profile.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd><strong>{fact.value}</strong><span>{fact.detail}</span></dd></div>)}</dl>
      </Reveal>
      <Reveal delay={.06} className="rk-card rk-proof">
        {profile.proof.map((item, index) => <div key={item.label} className={`rk-proof-tile rk-tone-${STICKERS[index % 4]}`}><strong>{item.value}</strong><span>{item.label}</span></div>)}
      </Reveal>
    </div>

    <Reveal delay={.1} className="rk-card rk-stack">
      <h3><Code2 size={16} aria-hidden="true" />Core stack</h3>
      <div className="rk-stack-grid">{profile.stack.map(group => <div key={group.group}><span>{group.group}</span><div className="rk-chips">{group.items.map(item => <kbd key={item}>{item}</kbd>)}</div></div>)}</div>
    </Reveal>

    <Reveal delay={.14} className="rk-actions">
      <a className="studio-button rk-resume" href={profile.links.resume} download><span className="button-icon"><Download size={20} aria-hidden="true" /></span><span>Download résumé</span></a>
      <ResumeDialog><a className="rk-btn" href={profile.links.resumeView} target="_blank" rel="noopener noreferrer"><FileText size={16} aria-hidden="true" />View résumé</a></ResumeDialog>
      <BookingDialog><a className="rk-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} aria-hidden="true" />Book a call</a></BookingDialog>
      <span className="rk-actions-sep" aria-hidden="true" />
      <a className="rk-icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
      <a className="rk-icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
      <a className="rk-icon-btn" href={profile.links.email} aria-label="Email"><Mail size={17} /></a>
    </Reveal>
  </section></IconContext.Provider>
}

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export function RecruiterExperience() {
  return <IconContext.Provider value={{ weight: 'duotone' }}><section id="experience" className="rk-section rk-experience" aria-label="Experience">
    <SectionHead note="where I’ve shipped AI" title="Experience">Most recent first. Each role links to the full write-up.</SectionHead>
    <ol className="rk-timeline">
      {roles.map(role => <li key={role.href} className="rk-role" data-current={role.current ? 'true' : undefined}>
          <div className="rk-role-when"><span>{role.dates}</span><small>{role.place}</small></div>
          <div className="rk-role-dot" aria-hidden="true" />
          <div className="rk-card rk-role-card">
            <div className="rk-role-top">
              <div><h3>{role.company}{role.current && <Sticker color="yellow" className="rk-now">now ✦</Sticker>}</h3><p>{role.title}</p></div>
              <Link href={role.href} className="rk-more" aria-label={`${role.company} details`}>Details <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </div>
            <ul>{role.points.map(point => <li key={point}>{point}</li>)}</ul>
            <div className="rk-chips">{role.stack.map(item => <kbd key={item}>{item}</kbd>)}</div>
          </div>
      </li>)}
    </ol>
    <Reveal className="rk-footnote"><Briefcase size={15} aria-hidden="true" />{moreRolesNote}<Link href="/experience">All experience <ArrowUpRight size={14} aria-hidden="true" /></Link></Reveal>
  </section></IconContext.Provider>
}

/* ------------------------------------------------------------------ */
/*  Selected work                                                      */
/* ------------------------------------------------------------------ */

export function RecruiterWork() {
  const items = selectedWork.flatMap(pick => {
    const project = majorProjects.find(p => p.title === pick.title)
    return project ? [{ pick, project }] : []
  })
  return <IconContext.Provider value={{ weight: 'duotone' }}><section id="featured-work" className="rk-section rk-work" aria-label="Featured works">
    <SectionHead note="explore my work!" title={<>Featured<br />works</>}>Six builds that show the range: voice agents, RAG, classical ML and computer vision.</SectionHead>
    <div className="rk-work-grid">
      {items.map(({ pick, project }, index) => {
        const image = project.images?.[0]
        return <Reveal key={project.title} delay={(index % 3) * .05}>
          <article className="rk-card rk-project" data-tint={pick.tint}>
            <Link href={`/case-study/${projectSlug(project)}`} className="rk-project-cover" tabIndex={-1} aria-hidden="true">
              {image ? <Image src={image.src} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 380px" className="object-cover" /> : <span className="rk-project-mono">{project.title.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3)}</span>}
              <Sticker color={STICKERS[index % 4]} className="rk-proof-badge"><Sparkles size={13} aria-hidden="true" />{pick.proof}</Sticker>
            </Link>
            <div className="rk-project-body">
              <span className="rk-kicker">{pick.kind}</span>
              <h3><Link href={`/case-study/${projectSlug(project)}`}>{project.title.replace(' - Remote Proctoring System', '')}</Link></h3>
              <p>{project.description}</p>
              <div className="rk-chips">{project.techStack.slice(0, 5).map(item => <kbd key={item}>{item}</kbd>)}</div>
              <div className="rk-project-links">
                <Link href={`/case-study/${projectSlug(project)}`}>Case study <ArrowUpRight size={13} aria-hidden="true" /></Link>
                <a href={project.link} target="_blank" rel="noopener noreferrer"><Github size={13} aria-hidden="true" />Code</a>
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><Globe size={13} aria-hidden="true" />Live demo</a>}
              </div>
            </div>
          </article>
        </Reveal>
      })}
    </div>
    <Reveal className="rk-center"><Link href="/case-study" className="rk-btn">All {majorProjects.length}+ projects <ArrowUpRight size={15} aria-hidden="true" /></Link></Reveal>
  </section></IconContext.Provider>
}

/* ------------------------------------------------------------------ */
/*  Research, patents, certifications                                  */
/* ------------------------------------------------------------------ */

const credentialColumns = [
  { key: 'research', title: 'Research', Icon: FlaskConical, items: credentials.research, all: '/research' },
  { key: 'patents', title: 'Patents', Icon: ScrollText, items: credentials.patents, all: '/patents' },
  { key: 'certificates', title: 'Certifications', Icon: BadgeCheck, items: credentials.certificates, all: '/certificates' },
] as const

export function RecruiterCredentials() {
  return <IconContext.Provider value={{ weight: 'duotone' }}><section id="credentials" className="rk-section rk-credentials" aria-label="Credentials">
    <SectionHead note="papers, patents & paper trails" title="Credentials" />
    <div className="rk-cred-grid">
      {credentialColumns.map(({ key, title, Icon, items, all }, index) => <Reveal key={key} delay={index * .05} className="rk-card rk-cred">
        <h3><span className={`rk-cred-icon rk-tone-${['cyan', 'yellow', 'pink'][index]}`} aria-hidden="true"><Icon size={17} /></span>{title}</h3>
        <ul>{items.map(item => <li key={item.href}><Link href={item.href}><strong>{item.title}</strong><span>{item.meta}</span></Link></li>)}</ul>
        <Link href={all} className="rk-more">See all <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </Reveal>)}
    </div>
  </section></IconContext.Provider>
}
