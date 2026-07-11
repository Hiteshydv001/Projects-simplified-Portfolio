'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import BaseContainer from '@/components/layout/container/base-container'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { researchPapers } from './_data/papers'

export default function ResearchPage() {
  const papers = Object.values(researchPapers)
  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <div className="page-toolbar">
        <DynamicBreadcrumb items={[{ href: '/', label: 'Home', emoji: '👾' }, { label: 'Research' }]} />
        <ThemeToggle />
      </div>
      <section className="page-hero mb-10">
        <Text className="page-eyebrow mb-3">Applied research</Text>
        <TextHeading as="h1" className="mb-3 text-4xl md:text-5xl">Research that meets the real world.</TextHeading>
        <Text variant="muted" className="max-w-2xl text-base">Exploring machine learning systems that make transport, cities, and everyday decisions more reliable.</Text>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        {papers.map((paper, index) => (
          <Link key={paper.id} href={`/research/${paper.id}`} className="group block h-full">
            <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -5 }} className="surface-card flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60">
                <Image src={paper.image} alt={paper.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" sizes="(max-width: 768px) 100vw, 50vw" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-slate-950/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">{paper.year}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Text className="page-eyebrow mb-3">{paper.conference}</Text>
                <Text size="lg" className="mb-3 font-semibold leading-snug group-hover:text-primary">{paper.title}</Text>
                <Text variant="muted" size="sm" className="flex-1 leading-relaxed">{paper.shortDescription}</Text>
                <span className="mt-6 text-sm font-semibold text-primary">Read paper <span className="ml-1 transition-transform group-hover:translate-x-1 inline-block">→</span></span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </BaseContainer>
  )
}
