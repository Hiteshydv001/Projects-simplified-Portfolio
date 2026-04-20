import { notFound } from "next/navigation"
import { majorProjects as allProjects } from "../_data/projects-data"
import ProjectContent from "./project-content"

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = allProjects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);

    if (!project) {
        notFound();
    }

    return <ProjectContent project={project} />;
}
