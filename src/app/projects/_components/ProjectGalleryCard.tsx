'use client'

import { useMemo, useState } from "react"
import { Project } from "../_types/project-types"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Text from '@/components/ui/text/text'

interface ProjectGalleryCardProps {
    project: Project;
    index: number;
}

export function ProjectGalleryCard({ project, index }: ProjectGalleryCardProps) {
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
    const [imageFailed, setImageFailed] = useState(false)
    const primaryImage = project.images?.[0]

    const fallbackLabel = useMemo(() => {
        const words = project.title.split(' ').filter(Boolean)
        return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || 'PR'
    }, [project.title])

    return (
        <Link 
            href={`/projects/${projectSlug}`}
            className="group block"
        >
            <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                style={{ opacity: 1, transform: 'none', backgroundColor: 'transparent' }}
                className="relative flex flex-col gap-0 transition-all duration-300 rounded-2xl border border-border/20 bg-transparent backdrop-blur-[2px] hover:bg-black/5 dark:hover:bg-white/5 group-hover:border-accent/30 shadow-sm hover:shadow-lg"
            >
                {/* Image Container */}
                <div className="relative w-full h-52 overflow-hidden bg-transparent">
                    {primaryImage && !imageFailed ? (
                        <Image
                            src={primaryImage.src}
                            alt={primaryImage.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 200px"
                            onError={() => setImageFailed(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/15 via-slate-200/30 to-orange-500/15 dark:from-cyan-500/20 dark:via-slate-800/20 dark:to-orange-500/20">
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-4 py-3 backdrop-blur">
                                <span className="text-lg font-semibold tracking-wide text-foreground">{fallbackLabel}</span>
                                <span className="text-xs text-muted-foreground">Preview unavailable</span>
                            </div>
                        </div>
                    )}
                    {/* Emoji Badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-lg">
                        🚀
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col bg-transparent">
                    <Text size="lg" className="font-semibold mb-1 text-foreground dark:text-white group-hover:text-accent transition-colors">
                        {project.title}
                    </Text>
                    {project.category && (
                        <Text size="sm" className="text-orange-600 dark:text-orange-400 font-medium mb-4">
                            Category: {project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Text>
                    )}
                    <Text size="sm" className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed">
                        {project.description}
                    </Text>
                    <div className="mt-4 flex items-center text-accent hover:text-accent/80 transition-colors">
                        <span className="text-sm font-bold tracking-tight uppercase">Read details</span>
                        <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
