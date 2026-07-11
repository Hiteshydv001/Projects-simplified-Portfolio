'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BaseContainer from '@/components/layout/container/base-container'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { researchPapers } from '../_data/papers'

export default function ResearchPaperPage() {
  const { slug } = useParams<{ slug: string }>()
  const paper = researchPapers[slug as keyof typeof researchPapers]
  useEffect(() => window.scrollTo(0, 0), [])
  if (!paper) return <BaseContainer size="md" paddingX="md" paddingY="lg"><div className="page-hero text-center"><TextHeading as="h1" className="mb-3 text-3xl">Paper not found</TextHeading><Link href="/research">Back to research</Link></div></BaseContainer>

  const metrics = [{ label: 'Research area', value: 'domain' in paper ? paper.domain : 'Predictive machine learning' }, { label: 'Core system', value: paper.model }, { label: 'Key result', value: 'accuracy' in paper ? paper.accuracy : paper.status }]
  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <div className="page-toolbar"><DynamicBreadcrumb items={[{ href: '/', label: 'Home', emoji: '👾' }, { href: '/research', label: 'Research' }, { label: 'Paper' }]} /><ThemeToggle /></div>
      <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <header className="page-hero">
          <Text className="page-eyebrow mb-4">{paper.conference} · {paper.year}</Text>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div><TextHeading as="h1" className="mb-4 text-3xl sm:text-4xl md:text-5xl">{paper.title}</TextHeading><Text variant="muted" className="max-w-3xl leading-relaxed">{paper.shortDescription}</Text></div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 shadow-lg"><Image src={paper.image} alt={paper.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 35vw" /></div>
          </div>
          {'authors' in paper && <Text size="xs" className="mt-6 text-muted-foreground">Authors · {paper.authors}</Text>}
          {'doi' in paper && <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="unstyled mt-3 inline-flex rounded-lg border border-primary/35 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground">View IEEE publication ↗</a>}
        </header>
        <section className="grid gap-4 md:grid-cols-3">{metrics.map(metric => <div key={metric.label} className="surface-card rounded-2xl p-5"><Text size="xs" className="mb-2 uppercase tracking-[0.12em] text-muted-foreground">{metric.label}</Text><Text size="sm" className="font-semibold leading-snug">{metric.value}</Text></div>)}</section>
        <section className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-6"><div className="surface-card rounded-2xl p-6 sm:p-8"><TextHeading as="h2" className="mb-4 text-2xl">The context</TextHeading><Text className="leading-relaxed">{paper.overview}</Text></div><div className="surface-card rounded-2xl p-6 sm:p-8"><TextHeading as="h2" className="mb-4 text-2xl">What we built</TextHeading><Text className="leading-relaxed">{paper.contribution}</Text></div></div>
          <aside className="surface-card h-fit rounded-2xl p-6 sm:p-8"><TextHeading as="h2" className="mb-4 text-2xl">Why it matters</TextHeading><ul className="space-y-4">{paper.impact.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></aside>
        </section>
        <section className="surface-card rounded-2xl p-6 sm:p-8"><TextHeading as="h2" className="mb-3 text-2xl">Research takeaway</TextHeading><Text className="max-w-4xl leading-relaxed">{paper.conclusion}</Text></section>
      </motion.article>
    </BaseContainer>
  )
}
