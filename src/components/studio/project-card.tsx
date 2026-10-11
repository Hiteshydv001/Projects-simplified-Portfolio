'use client'

import Link from 'next/link'
import Image from 'next/image'
import { createRef, useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Blocks } from 'lucide-react'
import type { Project } from '@/app/projects/_types/project-types'
import { categoryLabels } from '@/app/projects/_types/project-types'
import { SelectionFrame } from './primitives'
import { Tilt } from './motion'
import { useMotionSettings } from '@/components/layout/motion-provider'

export const projectSlug = (project: Project) => project.title.toLowerCase().replace(/\s+/g, '-')

function ProjectImage({ project, folder = false }: { project: Project; folder?: boolean }) {
  const image = project.images?.[0]
  return <div className={folder ? 'folder-image' : 'project-visual'}>{image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 560px) 90vw, 45vw" className="object-cover" /> : <div className="folder-fallback"><Blocks size={35} /><span>{project.title.replace(/[^a-zA-Z ]/g, '').split(' ').map(word => word[0]).join('').slice(0, 3)}</span></div>}{!folder && <span className="project-visual-label">{categoryLabels[project.category]}</span>}</div>
}

// Track stationary flow markers: sticky cards themselves stop moving before the scroll ends.
const stackTop = 94

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const stack = useRef<HTMLDivElement>(null)
  const anchors = useMemo(() => projects.map(() => createRef<HTMLDivElement>()), [projects])
  const cards = useMemo(() => projects.map(() => createRef<HTMLElement>()), [projects])
  const [fitsViewport, setFitsViewport] = useState(false)
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const stacking = fitsViewport && !reduced && !systemReduced

  useEffect(() => {
    const measure = () => {
      const tallest = Math.max(...cards.map(card => card.current?.offsetHeight ?? 0))
      setFitsViewport(window.innerWidth >= 900 && tallest > 0 && tallest + stackTop + 24 <= window.innerHeight)
    }
    const observer = new ResizeObserver(measure)
    if (stack.current) observer.observe(stack.current)
    cards.forEach(card => { if (card.current) observer.observe(card.current) })
    window.addEventListener('resize', measure, { passive: true })
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [cards])

  return <div ref={stack} className="featured-project-stack" data-stacking={stacking ? 'true' : 'false'} style={{ '--project-count': projects.length } as CSSProperties}>
    {projects.map((project, index) => <FeaturedProject key={project.title} project={project} index={index} anchor={anchors[index]} nextAnchor={anchors[index + 1]} cardRef={cards[index]} stacking={stacking} />)}
  </div>
}

function FeaturedProject({ project, index, anchor, nextAnchor, cardRef, stacking }: {
  project: Project; index: number; anchor: RefObject<HTMLDivElement | null>;
  nextAnchor?: RefObject<HTMLDivElement | null>; cardRef: RefObject<HTMLElement | null>; stacking: boolean;
}) {
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const animated = !reduced && !systemReduced
  const { scrollYProgress: arrival } = useScroll({ target: anchor, offset: ['start 95%', `start ${stackTop}px`] })
  const { scrollYProgress: covering } = useScroll({ target: nextAnchor ?? anchor, offset: ['start 75%', `start ${stackTop + 58}px`] })
  const enterY = useTransform(arrival, [0, .85, 1], [90, 0, 0])
  const enterScale = useTransform(arrival, [0, .85, 1], [.97, 1, 1])
  const enterOpacity = useTransform(arrival, [0, .5, 1], [.25, 1, 1])
  const recedeScale = useTransform(covering, [0, 1], [1, .97])
  const shadeOpacity = useTransform(covering, [0, 1], [0, .18])
  const covered = stacking && !!nextAnchor
  const accents = ['cyan', 'yellow', 'green', 'pink']

  return <>
    <div ref={anchor} className="project-scroll-anchor" aria-hidden="true" />
    <motion.article ref={cardRef} className="featured-project" style={{
      ...({ '--project-index': index, '--project-accent': `var(--studio-${accents[index % 4]})` } as CSSProperties),
      zIndex: index + 1, y: animated ? enterY : 0, scale: animated ? enterScale : 1,
      opacity: animated ? enterOpacity : 1,
    }}>
      <div className={`project-tab project-tab-${index % 4}`}><Blocks size={16} aria-hidden="true" />Project {String(index + 1).padStart(2, '0')}</div>
      <motion.div className="featured-project-panel" style={{ scale: covered ? recedeScale : 1 }}>
        <Link href={`/case-study/${projectSlug(project)}`} className="featured-project-link" onFocus={event => {
          if (stacking && anchor.current && event.currentTarget.matches(':focus-visible')) window.scrollTo({ top: window.scrollY + anchor.current.getBoundingClientRect().top - stackTop, behavior: 'instant' })
        }}>
          <div className="featured-project-copy"><span className="project-date">{categoryLabels[project.category]}</span><h3>{project.title}</h3><p>{project.description}</p><span className="project-view">View project <ArrowUpRight size={17} /></span><div className="project-tags">{project.techStack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div></div>
          <SelectionFrame color="ink"><ProjectImage project={project} /></SelectionFrame>
        </Link>
        <motion.div className="project-stack-shade" aria-hidden="true" style={{ opacity: covered ? shadeOpacity : 0 }} />
      </motion.div>
    </motion.article>
  </>
}

export function FolderProject({ project }: { project: Project }) {
  return <Tilt strength={2}><Link href={`/case-study/${projectSlug(project)}`} className="folder-card"><div className="folder-cover"><span className="project-date">{categoryLabels[project.category]}</span><ProjectImage project={project} folder /></div><h2>{project.title} <ArrowUpRight className="inline-block align-middle" size={24} /></h2><p>{project.description}</p><div className="project-tags">{project.techStack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div></Link></Tilt>
}
