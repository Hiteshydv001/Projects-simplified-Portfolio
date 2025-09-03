'use client'

import { Project } from "@/app/projects/_types/project-types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/primitives/dialog"
import Text from "@/components/ui/text/text"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectModalProps {
    project: Project
    onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    if (!project) return null

    const sections = [
        {
            title: "Key Features",
            items: project.keyFeatures,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ),
            color: "bg-emerald-500/10 text-emerald-500"
        },
        {
            title: "Technical Implementation",
            items: project.implementation,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            color: "bg-blue-500/10 text-blue-500"
        },
        {
            title: "Challenges & Solutions",
            items: project.challenges,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            color: "bg-orange-500/10 text-orange-500"
        },
        {
            title: "Key Learnings",
            items: project.learnings,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            color: "bg-violet-500/10 text-violet-500"
        },
        {
            title: "Future Work",
            items: project.futureWork,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
            ),
            color: "bg-pink-500/10 text-pink-500"
        }
    ]

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                <DialogHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-6 border-b">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pr-8"
                    >
                        <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                        <Text className="text-lg text-muted-foreground mt-2">{project.description}</Text>
                    </motion.div>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent/10 transition-colors"
                        aria-label="Close dialog"
                    >
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </DialogHeader>

                <div className="p-6 space-y-8">
                    {/* Hero Image */}
                    {project.images && project.images[0] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative h-[400px] overflow-hidden rounded-lg border"
                        >
                            <img 
                                src={project.images[0].src} 
                                alt={project.images[0].alt}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </motion.div>
                    )}

                    {/* Main Content */}
                    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                        {/* Left Column - Main Content */}
                        <div className="space-y-8">
                            {/* Long Description */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="prose dark:prose-invert max-w-none"
                            >
                                <Text className="text-lg leading-relaxed whitespace-pre-wrap">
                                    {project.longDescription || project.description}
                                </Text>
                            </motion.div>

                            {/* Detailed Sections */}
                            <div className="grid gap-8">
                                {sections.map((section, sectionIndex) => (
                                    section.items && section.items.length > 0 && (
                                        <motion.section 
                                            key={section.title} 
                                            className="space-y-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: sectionIndex * 0.1 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${section.color}`}>
                                                    {section.icon}
                                                </div>
                                                <h3 className="text-xl font-semibold">
                                                    {section.title}
                                                </h3>
                                            </div>
                                            <ul className="grid gap-3 pl-4">
                                                {section.items.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                                                        className="flex gap-3 items-start group"
                                                    >
                                                        <span className={`mt-2 w-1.5 h-1.5 rounded-full ${section.color} transition-all duration-300 group-hover:scale-150`} />
                                                        <Text className="flex-1">{item}</Text>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.section>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Tech Stack & Links */}
                        <div className="space-y-6">
                            {/* Tech Stack */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="sticky top-28"
                            >
                                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <motion.span
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-3 py-1.5 text-sm bg-purple-500/10 text-purple-500 rounded-full transition-colors hover:bg-purple-500/20"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Project Links */}
                                <div className="flex flex-col gap-3 mt-6">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-4 py-2.5 bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        View Source Code
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-4 py-2.5 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Live Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
