'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'

interface Patent {
    id: string;
    emoji: string;
    title: string;
    status: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
}

const patents: Patent[] = [
    {
        id: 'smart-earbud',
        emoji: '🎧',
        title: 'AI-Powered Smart Earbud with Real-Time Meeting Summarization',
        status: 'Patent Application Filed',
        shortDescription: 'A next-generation smart earbud that redefines hands-free productivity with AI-powered real-time meeting summarization, intelligent conversation recall, and contextual follow-up suggestions, all initiated with a simple tap.',
        image: '/patents/smart-earbud.jpg',
        imageAlt: 'AI-powered smart earbud concept visualization'
    },
    {
        id: 'smart-pillow',
        emoji: '🛏️',
        title: 'The Smart Pillow - Non-Intrusive Health & Sleep Monitoring',
        status: 'Patent Application Filed',
        shortDescription: 'An innovative health-tech device that transforms a familiar pillow into a powerful health monitoring tool, tracking vital signs and sleep quality without any wearables. Features contactless sensors for heart rate, respiration, and sleep patterns.',
        image: '/patents/smart-pillow.jpg',
        imageAlt: 'Smart pillow with embedded health monitoring sensors visualization'
    },
    {
        id: 'underwater-sensor',
        emoji: '🌊',
        title: 'AI-Guided System for Autonomous Deployment of Underwater Sensor Networks',
        status: 'Patent Application Filed',
        shortDescription: 'A groundbreaking autonomous system leveraging AI-guided Autonomous Underwater Vehicles (AUV) to create persistent, adaptive, and secure sensor fields for maritime monitoring.',
        image: '/patents/underwater-sensor.jpg',
        imageAlt: 'Underwater autonomous sensor network visualization'
    }
]

export function Patents() {
    return (
        <div className="py-8">
            <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl mb-6">
                Patents
            </TextHeading>
            
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {patents.map((patent) => (
                    <Link 
                        key={patent.id}
                        href={`/patents/${patent.id}`}
                        className="group block"
                    >
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="surface-card flex h-full flex-col overflow-hidden rounded-2xl"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted/30">
                                <Image
                                    src={patent.image}
                                    alt={patent.imageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, 200px"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                                {/* Emoji Badge */}
                                <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-xl shadow-lg backdrop-blur-md">
                                    {patent.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-5">
                                <Text className="font-semibold mb-2 group-hover:text-accent transition-colors">
                                    {patent.title}
                                </Text>
                                <Text variant="caption" className="mb-4 text-primary">
                                    {patent.status}
                                </Text>
                                <Text variant="caption" className="flex-1 leading-relaxed text-muted-foreground">
                                    {patent.shortDescription}
                                </Text>
                                <div className="mt-5 flex items-center text-primary">
                                    <span className="text-sm font-semibold">Explore invention</span>
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
                ))}
            </div>
        </div>
    )
}
