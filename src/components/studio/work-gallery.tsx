'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconContext, MagnifyingGlass, X, GithubLogo, Globe, ArrowUpRight, Star, SquaresFour, Robot, ChartLineUp, Cube, Wrench, Browser, type Icon } from '@phosphor-icons/react'
import { majorProjects } from '@/app/projects/_data/projects-data'
import { categoryLabels, type ProjectCategory } from '@/app/projects/_types/project-types'
import { StudioHeading } from './primitives'
import { projectSlug } from './project-card'

type Filter = 'featured' | 'all' | ProjectCategory

const FILTERS: { value: Filter; label: string; Icon: Icon }[] = [
  { value: 'featured', label: 'Featured', Icon: Star },
  { value: 'all', label: 'All', Icon: SquaresFour },
  { value: 'ai-fullstack', label: categoryLabels['ai-fullstack'], Icon: Robot },
  { value: 'machine-learning', label: categoryLabels['machine-learning'], Icon: ChartLineUp },
  { value: 'blockchain', label: categoryLabels.blockchain, Icon: Cube },
  { value: 'utilities', label: categoryLabels.utilities, Icon: Wrench },
  { value: 'web-dev', label: categoryLabels['web-dev'], Icon: Browser },
]

const TINTS = ['sky', 'lilac', 'peach', 'mint'] as const

const matchesQuery = (needle: string, project: (typeof majorProjects)[number]) =>
  !needle || [project.title, project.description, ...project.techStack].join(' ').toLowerCase().includes(needle)

const matchesFilter = (filter: Filter, project: (typeof majorProjects)[number]) =>
  filter === 'all' || (filter === 'featured' ? Boolean(project.featured) : project.category === filter)

export function WorkGallery() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('featured')
  const searchRef = useRef<HTMLInputElement>(null)
  const needle = query.trim().toLowerCase()

  const projects = useMemo(() => majorProjects.filter(project => matchesFilter(filter, project) && matchesQuery(needle, project)), [filter, needle])
  const counts = useMemo(() => Object.fromEntries(FILTERS.map(({ value }) => [value, majorProjects.filter(project => matchesFilter(value, project) && matchesQuery(needle, project)).length])) as Record<Filter, number>, [needle])

  // "/" focuses the search, like most code sites.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const clear = () => { setQuery(''); setFilter('all') }

  return <IconContext.Provider value={{ weight: 'duotone' }}>
    <div className="xp-page wg-page">
      <StudioHeading note="a little code. a lot of curiosity.">Projects</StudioHeading>

      {/* Toolbar: search + filter menu, sticky under the navbar */}
      <div className="wg-toolbar">
        <label className="wg-search">
          <MagnifyingGlass size={18} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects, topics or tools…" />
          {query ? <button type="button" className="wg-clear" onClick={() => { setQuery(''); searchRef.current?.focus() }} aria-label="Clear search"><X size={14} weight="bold" /></button> : <kbd aria-hidden="true">/</kbd>}
        </label>
        <div className="wg-filters" role="tablist" aria-label="Project categories">
          {FILTERS.map(({ value, label, Icon: FilterIcon }) => <button key={value} type="button" role="tab" aria-selected={filter === value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)} disabled={counts[value] === 0 && filter !== value}>
            <FilterIcon size={15} aria-hidden="true" />{label}<span className="wg-count">{counts[value]}</span>
          </button>)}
        </div>
      </div>

      <p className="wg-results" role="status">
        Showing <strong>{projects.length}</strong> project{projects.length === 1 ? '' : 's'}{filter !== 'all' && filter !== 'featured' ? ` in ${categoryLabels[filter]}` : filter === 'featured' ? ' · featured' : ''}{needle && <> matching “{query.trim()}”</>}
        {(needle || filter !== 'featured') && <button type="button" onClick={() => { setQuery(''); setFilter('featured') }}>Reset</button>}
      </p>

      {projects.length ? <div className="rk-work-grid wg-grid">{projects.map((project, index) => {
        const image = project.images?.[0]
        const href = `/case-study/${projectSlug(project)}`
        return <article key={project.title} className="rk-card rk-project" data-tint={TINTS[index % 4]}>
          <Link href={href} className="rk-project-cover" tabIndex={-1} aria-hidden="true">
            {image ? <Image src={image.src} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 380px" className="object-cover" /> : <span className="rk-project-mono">{project.title.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(Boolean).map(word => word[0]).join('').slice(0, 3).toUpperCase()}</span>}
          </Link>
          <div className="rk-project-body">
            <span className="rk-kicker">{categoryLabels[project.category]}</span>
            <h3><Link href={href}>{project.title.replace(' - Remote Proctoring System', '')}</Link></h3>
            <p>{project.description}</p>
            <div className="rk-chips">{project.techStack.slice(0, 4).map(tech => <kbd key={tech}>{tech}</kbd>)}</div>
            <div className="rk-project-links">
              <Link href={href}>Case study <ArrowUpRight size={13} aria-hidden="true" /></Link>
              <a href={project.link} target="_blank" rel="noopener noreferrer"><GithubLogo size={13} aria-hidden="true" />Code</a>
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><Globe size={13} aria-hidden="true" />Live demo</a>}
            </div>
          </div>
        </article>
      })}</div> : <div className="xp-card wg-empty">
        <span className="xp-tile xp-tone-yellow" aria-hidden="true"><MagnifyingGlass size={18} /></span>
        <h2>No matches this time</h2>
        <p>Try another topic or tool, or clear the filters.</p>
        <button type="button" className="rk-btn" onClick={clear}>Clear filters</button>
      </div>}
    </div>
  </IconContext.Provider>
}
