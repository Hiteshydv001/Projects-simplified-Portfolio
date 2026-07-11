'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { cn } from '@/lib/utils/utils'

type CertificateType = 'all' | 'technical' | 'non-technical'
type TechnicalCategory = 'all' | 'AI/ML' | 'Cloud' | 'Data' | 'Web Development' | 'Blockchain' | 'Other'

function CertificateCard({ cert }: { cert: any }) {
  const isTechnical = 'category' in cert

  return (
    <Link href={`/certificates/${cert.slug}`} className="group block h-full">
      <motion.article whileHover={{ y: -4 }} className="surface-card flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/60 bg-white/80 p-4 dark:bg-slate-950/40">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur">
            {isTechnical ? (cert as any).category : 'Recognition'}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Text className="mb-2 line-clamp-2 font-semibold leading-snug group-hover:text-primary transition-colors">
            {cert.title}
          </Text>
          <Text variant="caption" className="mb-4 text-muted-foreground">
            {isTechnical ? (cert as any).issuer : ('organization' in cert ? cert.organization : '')}
            {' · '}{cert.issueDate}
          </Text>
          {'description' in cert && (
            <Text variant="caption" className="mb-4 line-clamp-2 flex-1 text-muted-foreground">
              {cert.description}
            </Text>
          )}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 3).map((skill: string) => (
              <span key={skill} className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && <span className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 text-[10px] font-semibold text-muted-foreground">+{cert.skills.length - 3}</span>}
          </div>
          <div className="mt-auto flex items-center text-primary">
            <span className="text-sm font-semibold">View credential</span>
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export function CertificateGallery() {
  const [activeType, setActiveType] = useState<CertificateType>('all')
  const [activeCategory, setActiveCategory] = useState<TechnicalCategory>('all')
  const filteredTechnical = technicalCertificates.filter(cert => activeCategory === 'all' || cert.category === activeCategory)
  const displayCertificates = activeType === 'all' ? [...filteredTechnical, ...nonTechnicalCertificates] : activeType === 'technical' ? filteredTechnical : nonTechnicalCertificates
  const categories: { value: TechnicalCategory; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: technicalCertificates.length },
    { value: 'AI/ML', label: 'AI/ML', count: technicalCertificates.filter(c => c.category === 'AI/ML').length },
    { value: 'Cloud', label: 'Cloud', count: technicalCertificates.filter(c => c.category === 'Cloud').length },
    { value: 'Data', label: 'Data', count: technicalCertificates.filter(c => c.category === 'Data').length },
    { value: 'Web Development', label: 'Web', count: technicalCertificates.filter(c => c.category === 'Web Development').length },
    { value: 'Other', label: 'Other', count: technicalCertificates.filter(c => c.category === 'Other').length },
  ]

  return (
    <section className="space-y-10">
      <div className="page-hero">
        <Text className="page-eyebrow mb-3">Learning archive</Text>
        <TextHeading as="h1" className="mb-3 text-3xl sm:text-4xl md:text-5xl">Certifications & Achievements</TextHeading>
        <Text variant="muted" className="max-w-2xl text-sm sm:text-base">Professional certifications and volunteer recognitions across AI, Cloud, Data Science, and community development.</Text>
      </div>

      <div className="surface-card space-y-4 rounded-2xl p-4 sm:p-5">
        <Text size="xs" weight="semibold" className="uppercase tracking-[0.16em] text-muted-foreground">Filter credentials</Text>
        <div className="flex flex-wrap gap-2">
          {(['all', 'technical', 'non-technical'] as const).map((type) => (
            <button key={type} onClick={() => { setActiveType(type); setActiveCategory('all') }} className={cn('filter-chip')} data-active={activeType === type}>
              {type === 'all' ? 'All credentials' : type === 'technical' ? 'Technical' : 'Recognition'}
            </button>
          ))}
        </div>
        {(activeType === 'all' || activeType === 'technical') && (
          <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={cn('filter-chip')} data-active={activeCategory === cat.value}>
                {cat.label} <span className="opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-12">
        {(activeType === 'all' || activeType === 'technical') && filteredTechnical.length > 0 && (
          <div>
            <TextHeading as="h2" className="mb-5 text-2xl">Technical Certifications</TextHeading>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredTechnical.map(cert => <CertificateCard key={cert.id} cert={cert} />)}</div>
          </div>
        )}
        {(activeType === 'all' || activeType === 'non-technical') && nonTechnicalCertificates.length > 0 && (
          <div>
            <TextHeading as="h2" className="mb-5 text-2xl">Volunteer & Recognition</TextHeading>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{nonTechnicalCertificates.map(cert => <CertificateCard key={cert.id} cert={cert} />)}</div>
          </div>
        )}
        {displayCertificates.length === 0 && <div className="surface-card rounded-2xl py-12 text-center"><Text variant="muted">No certificates found in this category.</Text></div>}
      </div>
    </section>
  )
}
