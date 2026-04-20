'use client'

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Project } from "../_types/project-types"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

interface ProjectContentProps {
    project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const sections = [
        {
            title: "Key Features",
            items: project.keyFeatures,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )
        },
        {
            title: "Technical Implementation",
            items: project.implementation,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: "Challenges & Solutions",
            items: project.challenges,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            title: "Key Learnings",
            items: project.learnings,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            title: "Future Work",
            items: project.futureWork,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
            )
        }
    ];

    return (
        <article className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10"
                >
                    <div className="flex items-center justify-between">
                        <DynamicBreadcrumb 
                            items={[
                                { href: '/', label: 'Home', emoji: '👾' },
                                { href: '/projects', label: 'Projects' },
                                { label: project.title }
                            ]}
                        />
                        <ThemeToggle />
                    </div>

                    {/* Header */}
                    <header className="space-y-6 rounded-2xl border border-border/40 bg-transparent p-6 shadow-sm">
                        <div className="flex flex-wrap items-start gap-4">
                            <span className="text-5xl">🚀</span>
                            <div className="flex-1">
                                <TextHeading as="h1" className="text-3xl sm:text-4xl md:text-5xl mb-3">
                                    {project.title}
                                </TextHeading>
                                <Text variant="caption" className="text-muted-foreground">
                                    Focus: {project.category ? project.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Active'}
                                </Text>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                            >
                                View on GitHub ↗
                            </Link>
                            {project.live && (
                                <Link
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors text-sm font-medium"
                                >
                                    Live Demo ↗
                                </Link>
                            )}
                        </div>
                    </header>

                    {/* Project Hero */}
                    {project.images && project.images[0] && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-sm">
                            <Image
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                    )}

                    {/* Main Description Section */}
                    <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
                        <TextHeading as="h2" className="text-xl mb-4">Project Overview</TextHeading>
                        <Text className="text-lg leading-relaxed text-foreground/90">
                            {project.longDescription || project.description}
                        </Text>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                        <TextHeading as="h3" className="text-lg">Technologies</TextHeading>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Images */}
                    {project.images && project.images.length > 1 && (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {project.images.slice(1).map((image, index) => (
                                <div key={index} className="relative aspect-video rounded-2xl overflow-hidden border border-border/40 bg-transparent">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sections */}
                    <div className="grid gap-8">
                        {sections.map((section) => (
                            section.items && section.items.length > 0 && (
                                <section key={section.title} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            {section.icon}
                                        </div>
                                        <TextHeading as="h2" className="text-xl sm:text-2xl">
                                            {section.title}
                                        </TextHeading>
                                    </div>
                                    <ul className="grid gap-3">
                                        {section.items.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex gap-3 items-start rounded-xl border border-border/40 bg-transparent p-4 hover:border-primary/40 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                            >
                                                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                                <Text className="text-sm text-foreground/90">{item}</Text>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </section>
                            )
                        ))}
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
