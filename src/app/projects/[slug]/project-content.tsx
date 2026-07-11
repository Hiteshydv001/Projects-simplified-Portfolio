'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Layers, Sparkles } from 'lucide-react'
import { Project } from '../_types/project-types'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import BaseContainer from '@/components/layout/container/base-container'

interface ProjectContentProps { project: Project }

const sectionMeta = [
  { key: 'keyFeatures', title: 'What it does', label: 'Capabilities' },
  { key: 'implementation', title: 'How it works', label: 'Implementation' },
  { key: 'challenges', title: 'What it solved', label: 'Challenges' },
  { key: 'learnings', title: 'What I learned', label: 'Takeaways' },
  { key: 'futureWork', title: 'Where it goes next', label: 'Roadmap' },
] as const

export default function ProjectContent({ project }: ProjectContentProps) {
  useEffect(() => window.scrollTo(0, 0), [])
  const category = project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const heroImage = project.images?.[0]
  const sections = sectionMeta.filter(section => project[section.key]?.length)

  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <div className="page-toolbar">
        <DynamicBreadcrumb items={[{ href: '/', label: 'Home', emoji: '👾' }, { href: '/projects', label: 'Projects' }, { label: project.title }]} />
        <ThemeToggle />
      </div>

      <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <header className="page-hero">
          <Text className="page-eyebrow mb-4">{category} · Selected build</Text>
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></span><Text size="sm" className="font-semibold text-primary">Project case study</Text></div>
              <TextHeading as="h1" className="mb-4 text-3xl sm:text-4xl md:text-5xl">{project.title}</TextHeading>
              <Text variant="muted" className="max-w-2xl leading-relaxed">{project.longDescription || project.description}</Text>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="unstyled inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><Github className="h-4 w-4" /> Source code</a>
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="unstyled inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/55 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/50"><ExternalLink className="h-4 w-4" /> Live preview</a>}
              </div>
            </div>
            {heroImage ? <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-xl shadow-primary/10"><Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 1024px) 100vw, 42vw" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" /></div> : <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-border/60 bg-muted/30"><Layers className="h-12 w-12 text-primary/50" /></div>}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
          <div className="surface-card rounded-2xl p-6"><Text size="xs" className="mb-2 uppercase tracking-[0.14em] text-muted-foreground">Focus</Text><Text className="font-semibold">{category}</Text></div>
          <div className="surface-card rounded-2xl p-6"><Text size="xs" className="mb-3 uppercase tracking-[0.14em] text-muted-foreground">Built with</Text><div className="flex flex-wrap gap-2">{project.techStack.map(tech => <span key={tech} className="rounded-md border border-border/70 bg-muted/35 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground">{tech}</span>)}</div></div>
        </section>

        {project.highlights && project.highlights.length > 0 && <section className="surface-card rounded-2xl p-6 sm:p-8"><Text className="page-eyebrow mb-3">At a glance</Text><div className="grid gap-3 sm:grid-cols-3">{project.highlights.map((highlight, index) => <div key={highlight} className="rounded-xl border border-border/60 bg-background/35 p-4"><Text size="xs" className="mb-2 text-primary">0{index + 1}</Text><Text size="sm" className="font-semibold">{highlight}</Text></div>)}</div></section>}

        <section className="grid gap-5 lg:grid-cols-2">
          {sections.map(({ key, title, label }) => <section key={key} className="surface-card rounded-2xl p-6 sm:p-7"><Text className="page-eyebrow mb-3">{label}</Text><TextHeading as="h2" className="mb-5 text-2xl">{title}</TextHeading><ul className="space-y-3">{project[key]?.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></section>)}
        </section>

        {project.images && project.images.length > 1 && <section><TextHeading as="h2" className="mb-5 text-2xl">Product gallery</TextHeading><div className="grid gap-5 sm:grid-cols-2">{project.images.slice(1).map(image => <div key={image.src} className="group relative aspect-video overflow-hidden rounded-2xl border border-border/60"><Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, 50vw" /></div>)}</div></section>}

        <Link href="/projects" className="unstyled inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/55 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50"><ArrowLeft className="h-4 w-4" /> Explore all projects</Link>
      </motion.article>
    </BaseContainer>
  )
}
