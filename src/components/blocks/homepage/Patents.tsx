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
            
            <div className="grid gap-6">
                {patents.map((patent) => (
                    <Link 
                        key={patent.id}
                        href={`/patents/${patent.id}`}
                        className="group block"
                    >
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="flex flex-col sm:flex-row gap-6 overflow-hidden rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                        >
                            {/* Image Container */}
                            <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                                <Image
                                    src={patent.image}
                                    alt={patent.imageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, 200px"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:bg-none" />
                                {/* Emoji Badge */}
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg">
                                    {patent.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <Text className="font-semibold mb-2 group-hover:text-accent transition-colors">
                                    {patent.title}
                                </Text>
                                <Text variant="caption" className="text-muted-foreground mb-4">
                                    Status: {patent.status}
                                </Text>
                                <Text variant="caption" className="flex-1">
                                    {patent.shortDescription}
                                </Text>
                                <div className="mt-4 flex items-center text-accent">
                                    <span className="text-sm font-medium">Read details</span>
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
