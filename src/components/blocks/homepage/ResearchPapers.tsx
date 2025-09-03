'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'

interface ResearchPaper {
    id: string;
    emoji: string;
    title: string;
    conference: string;
    year: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
}

const papers: ResearchPaper[] = [
    {
        id: 'train-ticket',
        emoji: '🚆',
        title: 'Train Waitlisted Ticket Confirmation Prediction Using Machine Learning',
        conference: 'Second International Conference on Advanced Computing & Communication Technologies (ICACCTech)',
        year: '2024',
        shortDescription: 'Developed a machine learning framework achieving 96.67% accuracy in predicting waitlisted ticket confirmations. Our system processes historical booking data, cancellation patterns, and seasonal trends to help millions of railway passengers make informed decisions about their travel plans. This innovative approach combines traditional ML techniques with domain-specific railway booking patterns.',
        image: '/research/train-prediction.jpg',
        imageAlt: 'Indian Railway train station with passengers'
    },
    {
        id: 'weather-traffic',
        emoji: '🌦️',
        title: 'Weather-Integrated Traffic Routing with Dynamic Speed Prediction',
        conference: 'International Conference on Recent Advances in AI (ICRAAI)',
        year: '2025',
        shortDescription: 'Created an AI-powered framework for weather-aware navigation systems, integrating real-time weather data for safer and smarter route optimization. Our system processes hyperlocal weather conditions, traffic patterns, and road characteristics to provide dynamic routing recommendations that adapt to changing environmental conditions.',
        image: '/research/weather-traffic.jpg',
        imageAlt: 'Weather affected traffic conditions visualization'
    }
]

export function ResearchPapers() {
    return (
        <div className="py-8">
            <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl mb-6">
                Research Papers
            </TextHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {papers.map((paper) => (
                    <Link 
                        key={paper.id}
                        href={`/research/${paper.id}`}
                        className="group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col h-full overflow-hidden rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={paper.image}
                                    alt={paper.imageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                {/* Emoji Badge */}
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg">
                                    {paper.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <Text className="font-semibold mb-2 group-hover:text-accent transition-colors">
                                    {paper.title}
                                </Text>
                                <Text variant="caption" className="text-muted-foreground mb-4">
                                    {paper.conference} • {paper.year}
                                </Text>
                                <Text variant="caption" className="flex-1">
                                    {paper.shortDescription}
                                </Text>
                                <div className="mt-4 flex items-center text-accent">
                                    <span className="text-sm font-medium">Read more</span>
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
