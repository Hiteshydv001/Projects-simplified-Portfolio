'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'
import { cn } from '@/lib/utils/utils'

type CertificateType = 'all' | 'technical' | 'non-technical'
type TechnicalCategory = 'all' | 'AI/ML' | 'Cloud' | 'Data' | 'Web Development' | 'Blockchain' | 'Other'

// Certificate Card — matches patent card style
function CertificateCard({ cert }: { cert: any }) {
  const isTechnical = 'category' in cert

  return (
    <Link href={`/certificates/${cert.slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="flex flex-col sm:flex-row gap-6 overflow-hidden rounded-xl border border-border/20 bg-transparent backdrop-blur-[2px] transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group-hover:border-accent/30 group-hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-transparent shrink-0">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:bg-none" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col bg-transparent">
          <Text variant="caption" className="text-muted-foreground mb-1 text-xs uppercase tracking-wider">
            {isTechnical ? (cert as any).category : 'Volunteering'}
          </Text>

          <Text className="font-semibold mb-1 group-hover:text-accent transition-colors">
            {cert.title}
          </Text>

          <Text variant="caption" className="text-muted-foreground mb-3">
            {isTechnical ? (cert as any).issuer : ('organization' in cert ? cert.organization : '')}
            {' · '}{cert.issueDate}
          </Text>

          {/* Description if available */}
          {'description' in cert && (
            <Text variant="caption" className="flex-1 line-clamp-2 mb-3">
              {cert.description}
            </Text>
          )}

          {/* Skills inline */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 4).map((skill: string) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded text-[10px] font-medium border border-border/30 text-muted-foreground bg-transparent"
              >
                {skill}
              </span>
            ))}
            {cert.skills.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-border/30 text-muted-foreground bg-transparent">
                +{cert.skills.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center text-accent">
            <span className="text-sm font-medium">Read details</span>
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function CertificateGallery() {
  const [activeType, setActiveType] = useState<CertificateType>('all')
  const [activeCategory, setActiveCategory] = useState<TechnicalCategory>('all')

  const filteredTechnical = technicalCertificates.filter(
    cert => activeCategory === 'all' || cert.category === activeCategory
  )

  const displayCertificates = activeType === 'all'
    ? [...filteredTechnical, ...nonTechnicalCertificates]
    : activeType === 'technical'
    ? filteredTechnical
    : nonTechnicalCertificates

  const categories: { value: TechnicalCategory; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: technicalCertificates.length },
    { value: 'AI/ML', label: 'AI/ML', count: technicalCertificates.filter(c => c.category === 'AI/ML').length },
    { value: 'Cloud', label: 'Cloud', count: technicalCertificates.filter(c => c.category === 'Cloud').length },
    { value: 'Data', label: 'Data', count: technicalCertificates.filter(c => c.category === 'Data').length },
    { value: 'Web Development', label: 'Web', count: technicalCertificates.filter(c => c.category === 'Web Development').length },
    { value: 'Other', label: 'Other', count: technicalCertificates.filter(c => c.category === 'Other').length },
  ]

  return (
    <section className="py-8 space-y-8">
      {/* Header */}
      <div>
        <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl mb-2">
          Certifications & Achievements
        </TextHeading>
        <Text variant="muted" className="text-sm sm:text-base max-w-2xl">
          Professional certifications and volunteer recognitions across AI, Cloud, Data Science, and community development.
        </Text>
      </div>

      <Ruler />

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(['all', 'technical', 'non-technical'] as const).map((type) => (
            <button
              key={type}
              onClick={() => { setActiveType(type); setActiveCategory('all') }}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border',
                activeType === type
                  ? 'border-accent/40 text-accent bg-accent/5'
                  : 'border-border/20 text-muted-foreground hover:text-foreground hover:border-border/40'
              )}
            >
              {type === 'all' ? 'All' : type === 'technical' ? 'Technical' : 'Volunteering'}
            </button>
          ))}
        </div>

        {(activeType === 'all' || activeType === 'technical') && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-2.5 py-1 rounded text-[11px] font-medium transition-all duration-200 border',
                  activeCategory === cat.value
                    ? 'border-accent/30 text-accent bg-accent/5'
                    : 'border-border/15 text-muted-foreground/70 hover:text-muted-foreground hover:border-border/30'
                )}
              >
                {cat.label} <span className="opacity-50">({cat.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Certificates List */}
      <div className="space-y-10">
        {(activeType === 'all' || activeType === 'technical') && filteredTechnical.length > 0 && (
          <div>
            <TextHeading as="h3" className="text-lg mb-4">
              Technical Certifications
            </TextHeading>
            <div className="grid gap-4">
              {filteredTechnical.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {(activeType === 'all' || activeType === 'non-technical') && nonTechnicalCertificates.length > 0 && (
          <div>
            <TextHeading as="h3" className="text-lg mb-4">
              Volunteer & Recognition
            </TextHeading>
            <div className="grid gap-4">
              {nonTechnicalCertificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {displayCertificates.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <Text variant="muted">No certificates found in this category</Text>
          </div>
        )}
      </div>
    </section>
  )
}
