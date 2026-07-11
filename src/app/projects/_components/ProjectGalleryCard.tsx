'use client'

import { useMemo, useState } from 'react'
import { Project } from '../_types/project-types'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Text from '@/components/ui/text/text'

interface ProjectGalleryCardProps {
  project: Project
  index: number
}

export function ProjectGalleryCard({ project, index }: ProjectGalleryCardProps) {
  const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-')
  const [imageFailed, setImageFailed] = useState(false)
  const primaryImage = project.images?.[0]
  const fallbackLabel = useMemo(() => project.title.split(' ').filter(Boolean).slice(0, 2).map(word => word[0]?.toUpperCase() ?? '').join('') || 'PR', [project.title])
  const category = project.category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <Link href={`/projects/${projectSlug}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
        whileHover={{ y: -5 }}
        className="surface-card flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted/30">
          {primaryImage && !imageFailed ? (
            <Image src={primaryImage.src} alt={primaryImage.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" onError={() => setImageFailed(true)} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted/40 to-accent/15">
              <span className="rounded-2xl border border-border/70 bg-background/70 px-5 py-3 text-xl font-bold tracking-wide text-foreground backdrop-blur">{fallbackLabel}</span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">{category}</span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Text size="lg" className="mb-3 font-semibold leading-tight text-foreground dark:text-white group-hover:text-primary transition-colors">{project.title}</Text>
          <Text size="sm" className="line-clamp-3 flex-1 leading-relaxed text-muted-foreground">{project.description}</Text>
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map(tech => <span key={tech} className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 text-[10px] font-semibold text-muted-foreground">{tech}</span>)}
              {project.techStack.length > 3 && <span className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 text-[10px] font-semibold text-muted-foreground">+{project.techStack.length - 3}</span>}
            </div>
          )}
          <div className="mt-5 flex items-center text-primary"><span className="text-sm font-semibold">Explore project</span><span className="ml-2 transition-transform group-hover:translate-x-1">→</span></div>
        </div>
      </motion.article>
    </Link>
  )
}
