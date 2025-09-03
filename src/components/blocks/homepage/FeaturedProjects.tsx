'use client'

import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import { projects } from "@/app/projects/_data/projects";
import { ProjectCard } from "@/app/projects/_components/ProjectCard";
import Link from "next/link";

export function FeaturedProjects() {
    const featuredProjects = projects.filter(project => project.featured);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Projects</h2>
                <Link href="/projects" className="text-primary hover:underline">
                    View all →
                </Link>
            </div>
            <StackVertical gap="md">
                {featuredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        isLast={index === featuredProjects.length - 1}
                    />
                ))}
            </StackVertical>
        </div>
    );
}
