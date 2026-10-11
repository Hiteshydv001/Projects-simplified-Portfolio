'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import { StudioHeading } from '@/components/studio/primitives'
import { ArchiveCard } from '@/components/studio/archive-card'
import { Reveal } from '@/components/studio/motion'
import type { TechnicalCertificate, NonTechnicalCertificate } from '@/types/certificate'

type Certificate = TechnicalCertificate | NonTechnicalCertificate
const allCertificates: Certificate[] = [...technicalCertificates, ...nonTechnicalCertificates]
const categories = ['All', ...Array.from(new Set(technicalCertificates.map(certificate => certificate.category))), 'Recognition']

export function CertificateGallery() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const certificates = useMemo(() => allCertificates.filter(certificate => {
    const type = 'category' in certificate ? certificate.category : 'Recognition'
    return (category === 'All' || category === type) && [certificate.title, ...certificate.skills].join(' ').toLowerCase().includes(query.trim().toLowerCase())
  }), [category, query])
  return <section><Reveal><StudioHeading note="a few things learned along the way">Certificates</StudioHeading></Reveal><label className="work-search"><Search size={18} /><span className="sr-only">Search certificates</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search certificates or skills…" /></label><div className="work-filters">{categories.map(item => <button key={item} className="filter-chip" onClick={() => setCategory(item)} aria-pressed={category === item} data-active={category === item}>{item}</button>)}</div><p role="status" className="work-results">{certificates.length} credential{certificates.length === 1 ? '' : 's'} found</p><div className="work-grid">{certificates.map(certificate => <Reveal key={certificate.id}><ArchiveCard href={`/certificates/${certificate.slug}`} title={certificate.title} description={'issuer' in certificate ? certificate.issuer : certificate.organization} image={certificate.image} alt={certificate.title} meta={certificate.issueDate} tags={certificate.skills} contain /></Reveal>)}</div>{certificates.length === 0 && <div className="empty-results"><h2>No certificates match.</h2><p>Try another skill or clear the filters.</p><button className="action-primary" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button></div>}</section>
}
