import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { Paper } from "../_types/paper-types";
import Link from "next/link";
import { motion } from "framer-motion";

interface PaperCardProps {
    paper: Paper;
    isLast: boolean;
}

export function PaperCard({ paper, isLast }: PaperCardProps) {
    return (
        <Link href={`/paper-implementations/${paper.slug}`}>
            <motion.article 
                className={`group py-8 ${!isLast && 'border-b border-border'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
            >
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <TextHeading as="h2" size="sm" weight="bold" className="group-hover:text-purple-500 transition-colors">
                                {paper.title}
                            </TextHeading>
                            {paper.isNew && (
                                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-500 rounded-full">
                                    New
                                </span>
                            )}
                        </div>
                        <div className="mt-2 space-y-1">
                            <Text variant="muted" size="sm">
                                By {paper.authors.join(", ")}
                            </Text>
                            <Text variant="muted" size="sm">
                                Published on {paper.publishedAt}
                            </Text>
                        </div>
                    </div>
                    
                    <Text className="line-clamp-2">
                        {paper.description}
                    </Text>
                    
                    <div className="flex flex-wrap gap-2">
                        {paper.tags.map((tag) => (
                            <span 
                                key={tag}
                                className="px-2 py-1 text-xs bg-accent/10 text-muted-foreground rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm" onClick={(e) => e.stopPropagation()}>
                        {paper.paperLink && (
                            <button
                                onClick={() => window.open(paper.paperLink, '_blank')}
                                className="inline-flex items-center text-purple-500 hover:text-purple-600"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Original Paper
                            </button>
                        )}
                        {paper.githubLink && (
                            <button 
                                onClick={() => window.open(paper.githubLink, '_blank')}
                                className="inline-flex items-center text-purple-500 hover:text-purple-600"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                Implementation
                            </button>
                        )}
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
