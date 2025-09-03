import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { majorProjects as allProjects } from "../_data/projects-data"
import { cn } from "@/lib/utils/utils"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"
import { motion } from "framer-motion"

interface ProjectPageProps {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
    const project = allProjects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug);

    if (!project) {
        notFound();
    }

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
        <article className="max-w-4xl mx-auto py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Header */}
                <header className="space-y-4">
                    <TextHeading as="h1" className="text-3xl sm:text-4xl md:text-5xl">
                        {project.title}
                    </TextHeading>
                    
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
                        >
                            View on GitHub
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                            </svg>
                        </Link>
                        {project.live && (
                            <Link
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full hover:bg-purple-500/20 transition-colors"
                            >
                                Live Demo
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                </svg>
                            </Link>
                        )}
                    </div>
                </header>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1.5 text-sm bg-purple-500/10 text-purple-500 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Main Description */}
                <Text className="text-lg leading-relaxed">
                    {project.longDescription || project.description}
                </Text>

                {/* Project Images */}
                {project.images && (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {project.images.map((image, index) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
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
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-accent/10">
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
                                            className="flex gap-3 items-start"
                                        >
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            <Text>{item}</Text>
                                        </motion.li>
                                    ))}
                                </ul>
                            </section>
                        )
                    ))}
                </div>
            </motion.div>
        </article>
    );
}
