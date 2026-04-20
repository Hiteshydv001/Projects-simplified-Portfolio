'use client'

import { useEffect } from 'react'
import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { motion } from "framer-motion"
import Link from "next/link"

const exhibits = [
    {
        title: 'Portfolio Exhibit I',
        url: 'https://hiteshydv001.github.io/portfolio.hitesh.aiml/',
        description: 'My early exploration into personal branding and GitHub Pages.',
        color: 'from-blue-500/10 to-transparent'
    },
    {
        title: 'Portfolio Exhibit II',
        url: 'https://portfolio-hitesh-aiml.vercel.app/',
        description: 'Vercel-hosted iteration focusing on clean typography and layout.',
        color: 'from-purple-500/10 to-transparent'
    },
    {
        title: 'Portfolio Exhibit III',
        url: 'https://hitesh-bot-portfolio.vercel.app/',
        description: 'An AI-focused interface design with chatbot integration concepts.',
        color: 'from-emerald-500/10 to-transparent'
    },
    {
        title: 'Portfolio Exhibit IV',
        url: 'https://hitesh-aiml.vercel.app/',
        description: 'Minimalist approach highlighting core engineering projects.',
        color: 'from-orange-500/10 to-transparent'
    },
    {
        title: 'Portfolio Exhibit V',
        url: 'https://hitesh-ml.vercel.app/',
        description: 'The latest evolution in my design language and technical stack.',
        color: 'from-rose-500/10 to-transparent'
    }
]

export default function Portfolio() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <BaseContainer size="lg" paddingX="sm" paddingY="lg">
            <StackVertical gap="xl">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'Portfolio' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <TextHeading as="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter">
                            Portfolio Walk
                        </TextHeading>
                    </motion.div>
                    <Text variant="muted" className="max-w-2xl mx-auto text-lg leading-relaxed">
                        A chronological gallery of my personal websites. 
                        Each version marks a milestone in my growth as an engineer and designer.
                    </Text>
                </div>

                <div className="space-y-40 py-20">
                    {exhibits.map((exhibit, index) => (
                        <motion.div
                            key={exhibit.url}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4">
                                    <div className="space-y-2">
                                        <div className="text-xs font-mono uppercase tracking-[0.4em] text-primary/60">
                                            Exhibit {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <TextHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                                            {exhibit.title}
                                        </TextHeading>
                                        <Text className="text-muted-foreground text-base max-w-xl leading-relaxed">
                                            {exhibit.description}
                                        </Text>
                                    </div>
                                    <Link
                                        href={exhibit.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-sm font-bold text-primary group-hover:text-accent transition-colors underline underline-offset-8"
                                    >
                                        Launch Project <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                                    </Link>
                                </div>

                                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border/40 bg-background/50 backdrop-blur-md group-hover:border-primary/40 transition-all duration-700">
                                    <div className="absolute top-0 left-0 right-0 h-12 bg-muted/20 border-b border-border/10 flex items-center px-6 gap-3 z-30">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400/30 group-hover:bg-red-400 transition-colors" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400/30 group-hover:bg-amber-400 transition-colors" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400/30 group-hover:bg-emerald-400 transition-colors" />
                                        </div>
                                    </div>

                                    <iframe
                                        src={exhibit.url}
                                        className="w-full h-full pt-12 border-0 bg-white dark:bg-slate-900 group-hover:opacity-100 opacity-95 transition-opacity duration-500 scale-[1.001]"
                                        loading="lazy"
                                        title={exhibit.title}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </StackVertical>
            <SectionFooter color="purple" showToTop={true} />
        </BaseContainer>
    )
}