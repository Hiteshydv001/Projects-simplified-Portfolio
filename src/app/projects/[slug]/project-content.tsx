'use client'

import Image from 'next/image'
import { Github, ArrowUpRight } from 'lucide-react'
import type { Project } from '../_types/project-types'
import { categoryLabels } from '../_types/project-types'
import { majorProjects } from '../_data/projects-data'
import { Reveal } from '@/components/studio/motion'
import { SelectionFrame, Sticker, StudioButton } from '@/components/studio/primitives'
import { FolderProject } from '@/components/studio/project-card'

const sectionMeta = [
  { key: 'challenges', title: 'The real challenges.', label: 'Problem' },
  { key: 'keyFeatures', title: 'What it does.', label: 'Solution' },
  { key: 'implementation', title: 'From idea to implementation.', label: 'Build' },
  { key: 'learnings', title: 'What I took away.', label: 'Learnings' },
  { key: 'futureWork', title: 'What comes next.', label: 'Next steps' },
] as const

export default function ProjectContent({ project }: { project: Project }) {
  const sections = sectionMeta.filter(section => project[section.key]?.length)
  const heroImage = project.images?.[0]
  const nextProjects = majorProjects.filter(item => item.featured && item.title !== project.title).slice(0, 2)
  return <article className="studio-page">
    <nav aria-label="Case study sections" className="case-navigation"><a href="#intro">intro</a>{sections.map(section => <a href={`#${section.key}`} key={section.key}>{section.label.toLowerCase()}</a>)}</nav>
    <Reveal id="intro" className="case-header"><div><span className="project-date">{categoryLabels[project.category]}</span><h1 className="case-title">{project.title}</h1><p className="case-summary">{project.description}</p><div className="project-tags">{project.techStack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div><div className="mt-7 flex flex-wrap gap-4"><a href={project.link} target="_blank" rel="noopener noreferrer" className="small-link"><Github size={17} />Source code</a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="small-link">Live project <ArrowUpRight size={17} /></a>}</div></div><aside className="case-notes" aria-label="Project overview"><Sticker color="cyan"><strong>Role</strong>Engineering & implementation</Sticker><Sticker color="yellow"><strong>Focus</strong>{categoryLabels[project.category]}</Sticker><Sticker color="green"><strong>Built with</strong>{project.techStack.slice(0, 3).join(', ')}</Sticker><Sticker color="pink"><strong>Explore</strong>{project.live ? 'Code + live application' : 'Source & implementation'}</Sticker></aside></Reveal>
    {heroImage && <Reveal><SelectionFrame color="ink"><div className="case-cover"><Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 560px) 90vw, 1100px" /></div></SelectionFrame></Reveal>}
    <div className="case-body"><Reveal><section><Sticker>Overview</Sticker><h2>What I set out to build.</h2><p>{project.longDescription || project.description}</p>{project.highlights && <div className="flex flex-wrap gap-3 mt-7">{project.highlights.map(highlight => <Sticker key={highlight} color="cyan">{highlight}</Sticker>)}</div>}</section></Reveal>{sections.map(section => <Reveal key={section.key}><section id={section.key}><Sticker>{section.label}</Sticker><h2>{section.title}</h2><ul>{project[section.key]?.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul></section></Reveal>)}<Reveal><section id="stack"><Sticker color="green">The toolkit</Sticker><h2>Under the hood.</h2><div className="project-tags">{project.techStack.map(tech => <span key={tech}>{tech}</span>)}</div></section></Reveal></div>
    {project.images && project.images.length > 1 && <div className="work-grid">{project.images.slice(1).map(image => <SelectionFrame color="ink" key={image.src}><div className="case-cover"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 560px) 90vw, 45vw" /></div></SelectionFrame>)}</div>}
    <section className="case-next"><Reveal><h2>That’s not all.</h2></Reveal><div className="work-grid">{nextProjects.map(item => <Reveal key={item.title}><FolderProject project={item} /></Reveal>)}</div><div className="mt-12"><StudioButton href="/case-study">All projects</StudioButton></div></section>
  </article>
}
