'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'

const portfolioShowcase = [
    {
        title: 'Portfolio Exhibit I',
        url: 'https://hiteshydv001.github.io/portfolio.hitesh.aiml/',
        label: 'GitHub Pages'
    },
    {
        title: 'Portfolio Exhibit II',
        url: 'https://portfolio-hitesh-aiml.vercel.app/',
        label: 'Vercel'
    },
    {
        title: 'Portfolio Exhibit III',
        url: 'https://hitesh-bot-portfolio.vercel.app/',
        label: 'Vercel'
    },
    {
        title: 'Portfolio Exhibit IV',
        url: 'https://hitesh-aiml.vercel.app/',
        label: 'Vercel'
    },
    {
        title: 'Portfolio Exhibit V',
        url: 'https://hitesh-ml.vercel.app/',
        label: 'Vercel'
    }
]

export function PortfolioMuseum() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="relative"
        >
            <div className="absolute -top-10 right-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-12 left-0 h-36 w-36 rounded-full bg-secondary/15 blur-2xl" />

            <div className="relative rounded-2xl border border-border/40 bg-transparent p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <TextHeading as="h2" className="text-2xl sm:text-3xl">Portfolio Museum</TextHeading>
                        <Text className="text-base text-muted-foreground">
                            A small gallery of my past portfolio iterations, preserved like exhibits.
                        </Text>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/20"
                    >
                        Explore Projects
                    </Link>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {portfolioShowcase.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                            className="group"
                        >
                            <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`relative block h-full rounded-2xl border border-border/40 bg-transparent p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-black/5 dark:hover:bg-white/5 hover:shadow-lg hover:shadow-primary/10 ${
                                    index % 2 === 0 ? 'sm:-rotate-1' : 'sm:rotate-1'
                                }`}
                            >
                                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                                    <span>Exhibit {String(index + 1).padStart(2, '0')}</span>
                                    <span>{item.label}</span>
                                </div>

                                <div className="mt-6 flex min-h-[8rem] flex-col justify-between gap-6">
                                    <div className="space-y-2">
                                        <Text className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {item.title}
                                        </Text>
                                        <Text variant="caption" className="text-muted-foreground">
                                            A snapshot of my design language at the time.
                                        </Text>
                                    </div>

                                    <div className="flex items-center justify-between rounded-xl border border-border/40 bg-transparent px-4 py-3 text-sm">
                                        <span className="truncate text-muted-foreground">{item.url}</span>
                                        <span className="ml-3 text-primary">View ↗</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
