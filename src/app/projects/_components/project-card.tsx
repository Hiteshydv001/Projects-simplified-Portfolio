'use client'

import React from 'react'
import Image from 'next/image'
import { Project } from '../_types/projects'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-lg border bg-background transition-all hover:bg-accent aspect-[16/10] h-[500px] w-full"
    >
      {/* Image Container */}
      <div className="relative h-full w-full">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Content Container */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-200/90">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
