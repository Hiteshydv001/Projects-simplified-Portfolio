'use client'

import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"
import { papers } from "../_data/papers"
import { notFound } from "next/navigation"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import { motion } from "framer-motion"
import { use } from 'react'

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function Page({ params }: PageProps) {
    const resolvedParams = use(params);
    const paper = papers.find(p => p.slug === resolvedParams.slug)
    
    if (!paper) {
        notFound()
    }

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="lg">
                {/* Header */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <DynamicBreadcrumb 
                            items={[
                                { href: '/', label: 'Home', emoji: '👾' },
                                { href: '/paper-implementations', label: 'Paper Implementations' },
                                { label: paper.title }
                            ]}
                        />
                        <ThemeToggle />
                    </div>
                    
                    <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <TextHeading as="h1" weight="bold">
                            {paper.title}
                        </TextHeading>
                        
                        <div className="space-y-2">
                            <Text variant="muted">
                                By {paper.authors.join(", ")}
                            </Text>
                            <Text variant="muted" size="sm">
                                Published on {paper.publishedAt}
                            </Text>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {paper.tags.map((tag) => (
                                <span 
                                    key={tag}
                                    className="px-3 py-1.5 text-sm bg-accent/10 text-muted-foreground rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            {paper.paperLink && (
                                <a 
                                    href={paper.paperLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full hover:bg-purple-500/20 transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Original Paper
                                </a>
                            )}
                            {paper.githubLink && (
                                <a 
                                    href={paper.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-accent/10 text-muted-foreground rounded-full hover:bg-accent/20 transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    View Implementation
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Preview Image */}
                {paper.previewImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[400px] overflow-hidden rounded-lg border"
                    >
                        <img 
                            src={paper.previewImage} 
                            alt={`Preview image for ${paper.title}`}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose dark:prose-invert max-w-none"
                >
                    <Text className="text-lg leading-relaxed">
                        {paper.content || paper.description}
                    </Text>
                </motion.div>
            </StackVertical>
            <SectionFooter color="purple" />
        </BaseContainer>
    )
}
