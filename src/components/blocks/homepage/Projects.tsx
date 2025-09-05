'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { Project, ProjectCategory, categoryLabels } from '@/app/projects/_types/project-types'
import { majorProjects } from "@/app/projects/_data/projects-data"
import { ProjectModal } from './ProjectModal'

// For homepage, we'll show only 4 featured projects initially
const featuredProjects = majorProjects
    .filter(p => p.featured)
    .slice(0, 4) // Show only first 4 featured projects

const allProjects = majorProjects

// Export as a named export for proper module importing
export function Projects() {
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null)
    const [showAll, setShowAll] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const displayedProjects = selectedCategory
        ? allProjects.filter(project => project.category === selectedCategory)
        : (showAll ? allProjects : featuredProjects)

    return (
        <>
            <div className="py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl">
                    {showAll ? 'All Projects' : 'Featured Projects'}
                </TextHeading>
                
                <div className="flex flex-wrap gap-2">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setSelectedCategory(selectedCategory === key ? null : key as ProjectCategory)
                                setShowAll(true)
                            }}
                            className={cn(
                                "px-3 py-1.5 text-sm rounded-full",
                                "transition-colors duration-200",
                                selectedCategory === key 
                                    ? "bg-purple-500 text-white"
                                    : "bg-accent/10 text-muted-foreground hover:bg-accent/20"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6">
                {displayedProjects.map((project: Project, idx: number) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div 
                            className="group p-6 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                            onClick={() => setSelectedProject(project)}>
                            <div className="flex flex-col gap-4">
                                <div>
                                    {project.images && project.images[0] && (
                                        <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden rounded-lg mb-4">
                                            <Image 
                                                src={project.images[0].src} 
                                                alt={project.images[0].alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover object-center w-full h-full bg-accent/5"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <Text className="font-semibold group-hover:text-accent transition-colors">
                                        {project.title}
                                    </Text>
                                    <Text variant="caption" className="text-muted-foreground mt-2">
                                        {project.description}
                                    </Text>
                                </div>

                                {project.highlights && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.highlights.map((highlight) => (
                                            <span
                                                key={highlight}
                                                className="px-2 py-1 text-xs bg-accent/10 text-muted-foreground rounded-md"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs bg-purple-500/10 text-purple-500 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 text-sm bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
                                    >
                                        GitHub
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                        </svg>
                                    </Link>
                                    {project.live && (
                                        <Link
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 text-sm bg-purple-500/10 text-purple-500 rounded-full hover:bg-purple-500/20 transition-colors"
                                        >
                                            Live Demo
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => {
                        setShowAll(!showAll)
                        setSelectedCategory(null)
                    }}
                    className="inline-flex items-center px-4 py-2 text-sm bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
                >
                    {showAll 
                        ? 'Show Featured Only' 
                        : `View All Projects (${allProjects.length - featuredProjects.length} More)`}
                    <svg 
                        className={cn(
                            "w-4 h-4 ml-2 transition-transform",
                            showAll ? "rotate-180" : ""
                        )} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    )
}
