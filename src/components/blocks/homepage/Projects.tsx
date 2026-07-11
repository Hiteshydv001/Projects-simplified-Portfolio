'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { majorProjects } from "@/app/projects/_data/projects-data"

// Show only 4 featured projects on homepage
const featuredProjects = majorProjects
    .filter(p => p.featured)
    .slice(0, 4)

export function Projects() {
    const [failedImages, setFailedImages] = useState(['__init__'])

    return (
        <div className="py-8">
            <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl mb-6">
                Featured Projects
            </TextHeading>

            <div className="grid gap-5">
                {featuredProjects.map((project) => {
                    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
                    const primaryImage = project.images?.[0]
                    const imageFailed = failedImages.includes(projectSlug)
                    const words = project.title.split(' ').filter(Boolean)
                    const fallbackLabel = words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('') || 'PR'

                    return (
                        <Link
                            key={project.title}
                            href={`/projects/${projectSlug}`}
                            className="group block"
                        >
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="surface-card flex flex-col gap-5 overflow-hidden rounded-2xl sm:flex-row"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 w-full overflow-hidden bg-muted/30 sm:h-auto sm:w-52">
                                    {primaryImage && !imageFailed ? (
                                        <Image
                                            src={primaryImage.src}
                                            alt={primaryImage.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 640px) 100vw, 200px"
                                            onError={() => {
                                                setFailedImages((prev) => (prev.includes(projectSlug) ? prev : [...prev, projectSlug]))
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/15 via-slate-200/30 to-orange-500/15 dark:from-cyan-500/20 dark:via-slate-800/20 dark:to-orange-500/20">
                                            <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-4 py-3 backdrop-blur">
                                                <span className="text-lg font-semibold tracking-wide text-foreground">{fallbackLabel}</span>
                                                <span className="text-xs text-muted-foreground">Preview unavailable</span>
                                            </div>
                                        </div>
                                    )}
                                    {/* Project Badge */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-xl">
                                        🚀
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <Text className="font-semibold mb-2 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </Text>
                                    {project.category && (
                                        <Text variant="caption" className="text-muted-foreground mb-4">
                                            Category: {project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </Text>
                                    )}
                                    <Text variant="caption" className="flex-1">
                                        {project.description}
                                    </Text>
                                    <div className="mt-4 flex items-center text-accent">
                                        <span className="text-sm font-medium">Read details</span>
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/15 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-sm transition-all"
                >
                    Show More Projects
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
