'use client'

import { Project } from "../_types/project-types"
import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
    project: Project;
    isLast?: boolean;
}

export function ProjectCard({ project, isLast }: ProjectCardProps) {
    // Create project slug from title
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
    
    return (
        <>
            <div className="group relative">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <Link href={`/projects/${projectSlug}`} className="block hover:no-underline">
                                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {project.title}
                                </h2>
                            </Link>
                            <div className="mt-2 text-muted-foreground">
                                {project.description}
                            </div>
                        </div>
                        
                        {project.images && project.images[0] && (
                            <Link href={`/projects/${projectSlug}`} className="block hover:no-underline">
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                        src={project.images[0].src}
                                        alt={project.images[0].alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span 
                                    key={tech}
                                    className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {project.highlights && (
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {project.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        )}
                        
                        <div className="flex gap-4">
                            <Link 
                                href={`/projects/${projectSlug}`}
                                className="text-sm text-primary hover:underline"
                            >
                                View Details →
                            </Link>
                            <Link 
                                href={project.link}
                                className="text-sm text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub →
                            </Link>
                            {project.live && (
                                <Link 
                                    href={project.live}
                                    className="text-sm text-primary hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Demo →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!isLast && <hr className="border-gray-500/20 mt-3" />}
        </>
    )
}
