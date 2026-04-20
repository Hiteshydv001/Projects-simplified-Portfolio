'use client'

import { useState, useMemo, useEffect } from 'react'
import { majorProjects } from './_data/projects-data'
import { ProjectGalleryCard } from './_components/ProjectGalleryCard'
import { projectFilters, ProjectCategory, categoryLabels } from './_types/project-types'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

// Group projects by category
const projectsByCategory = majorProjects.reduce<Record<ProjectCategory, typeof majorProjects[number][]>>((acc, project) => {
    if (!acc[project.category]) {
        acc[project.category] = []
    }
    acc[project.category].push(project)
    return acc
}, {})

const categories: ProjectCategory[] = ['ai-fullstack', 'machine-learning', 'blockchain', 'web-dev', 'utilities']

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') return majorProjects
        return majorProjects.filter(project => project.category === selectedCategory)
    }, [selectedCategory])

    const displayFilters = projectFilters.filter(f => f.value !== 'featured')

    return (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14 bg-transparent">
            <div className="flex items-center justify-between mb-8">
                <DynamicBreadcrumb 
                    items={[
                        { href: '/', label: 'Home', emoji: '👾' },
                        { label: 'Projects' }
                    ]}
                />
                <ThemeToggle />
            </div>

            {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-14 space-y-6">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
                    >
                        Selected Work
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Projects Archive
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl text-base sm:text-lg text-muted-foreground"
                    >
                        A curated set of full-stack builds, research experiments, and systems work.
                    </motion.p>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap justify-center gap-2 sm:gap-3"
                    >
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                                selectedCategory === 'all'
                                    ? 'bg-transparent text-foreground border-primary/40 shadow-none'
                                    : 'bg-transparent text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground'
                            }`}
                        >
                            All Projects
                        </button>
                        {displayFilters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setSelectedCategory(filter.value)}
                                className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                                    selectedCategory === filter.value
                                        ? 'bg-transparent text-foreground border-primary/40 shadow-none'
                                        : 'bg-transparent text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Display */}
                {selectedCategory === 'all' ? (
                    /* Category-wise display when showing all */
                    <div className="space-y-16">
                        {categories.map((category) => {
                            const categoryProjects = projectsByCategory[category] || []
                            if (categoryProjects.length === 0) return null

                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <div className="inline-flex items-center gap-3 rounded-full border border-border/50 bg-transparent px-4 py-2 text-sm text-foreground/90">
                                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                            <span className="font-semibold text-foreground">
                                                {categoryLabels[category]}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {categoryProjects.length} project{categoryProjects.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                        <AnimatePresence mode="popLayout">
                                            {categoryProjects.map((project, index: number) => (
                                                <ProjectGalleryCard
                                                    key={project.title}
                                                    project={project}
                                                    index={index}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                ) : (
                    /* Filtered display for specific category */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectGalleryCard
                                    key={project.title}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="mt-4 text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </motion.div>
                )}
        </div>
    )
}
