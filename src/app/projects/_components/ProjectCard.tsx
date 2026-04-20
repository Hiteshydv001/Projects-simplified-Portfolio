'use client'

import { Project } from "../_types/project-types"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils/utils'
import Text from '@/components/ui/text/text'

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');

    return (
        <Link 
            href={`/projects/${projectSlug}`}
            className="group block"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="flex flex-col sm:flex-row gap-6 overflow-hidden rounded-xl border border-border/20 bg-transparent backdrop-blur-[2px] transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group-hover:border-accent/30 group-hover:shadow-lg"
            >
                {/* Image Container */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-transparent">
                    {project.images && project.images[0] ? (
                        <Image
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 200px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-transparent">
                            <span className="text-muted-foreground text-sm">No Image</span>
                        </div>
                    )}
                    {/* Project Badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 border border-white/10 backdrop-blur-md flex items-center justify-center text-xl shadow-lg">
                        🚀
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col bg-transparent">
                    <Text className="font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                    </Text>
                    {project.highlights && project.highlights.length > 0 && (
                        <Text variant="caption" className="text-muted-foreground mb-4">
                            {project.highlights.slice(0, 2).join(' • ')}
                        </Text>
                    )}
                    <Text variant="caption" className="flex-1 mb-4">
                        {project.description}
                    </Text>
                    {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 4).map((tech) => (
                                <span 
                                    key={tech}
                                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="mt-auto flex items-center text-accent">
                        <span className="text-sm font-medium">View project</span>
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
}
