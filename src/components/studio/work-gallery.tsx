'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { majorProjects } from '@/app/projects/_data/projects-data'
import { categoryLabels, projectFilters } from '@/app/projects/_types/project-types'
import { StudioHeading } from './primitives'
import { FolderProject } from './project-card'
import { Reveal } from './motion'

export function WorkGallery() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('featured')
  const projects = useMemo(() => majorProjects.filter(project => (category === 'all' || (category === 'featured' ? project.featured : project.category === category)) && [project.title, project.description, ...project.techStack].join(' ').toLowerCase().includes(query.trim().toLowerCase())), [category, query])
  return <div className="studio-page"><Reveal><StudioHeading note="a little code. a lot of curiosity.">Projects</StudioHeading></Reveal><label className="work-search"><Search size={18} /><span className="sr-only">Search projects</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects, topics, or tools…" /></label><div className="work-filters" aria-label="Project categories"><button className="filter-chip" onClick={() => setCategory('featured')} aria-pressed={category === 'featured'} data-active={category === 'featured'}>Featured</button><button className="filter-chip" onClick={() => setCategory('all')} aria-pressed={category === 'all'} data-active={category === 'all'}>All projects</button>{projectFilters.filter(filter => filter.value !== 'featured').map(filter => <button key={filter.value} className="filter-chip" onClick={() => setCategory(filter.value)} aria-pressed={category === filter.value} data-active={category === filter.value}>{categoryLabels[filter.value]}</button>)}</div><p className="work-results" role="status">{projects.length} project{projects.length === 1 ? '' : 's'}{query.trim() && ` matching “${query.trim()}”`}</p>{projects.length ? <div className="work-grid">{projects.map(project => <Reveal key={project.title}><FolderProject project={project} /></Reveal>)}</div> : <div className="empty-results"><h2>No matches this time.</h2><p>Try another topic or clear the filters.</p><button className="action-primary" onClick={() => { setQuery(''); setCategory('all') }}>Clear filters</button></div>}</div>
}
