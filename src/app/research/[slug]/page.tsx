'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'

const papers = {
    'train-ticket': {
        emoji: '🚆',
        title: 'Train Waitlisted Ticket Confirmation Prediction Using Machine Learning',
        conference: '2024 Second International Conference on Advanced Computing & Communication Technologies (ICACCTech)',
        publisher: 'IEEE',
        authors: 'Ruchi, Fardin Khan, Hitesh Kumar, Kamalveer Singh, Sachin Yadav',
        doi: 'https://ieeexplore.ieee.org/document/10918548',
        overview: `In India's railway system, millions of passengers face uncertainty due to waitlisted tickets. Predicting whether these tickets will get confirmed is a highly complex task, as it depends on multiple factors such as booking patterns, cancellations, passenger behavior, and travel seasonality.`,
        contribution: `We developed a machine learning framework that predicts the likelihood of waitlisted tickets being confirmed with remarkable accuracy. By leveraging historical booking data, cancellation records, and passenger preferences, our system helps both passengers and railway authorities in making informed decisions.`,
        model: 'Light Gradient Boosting Machine (LightGBM)',
        accuracy: '96.67%',
        features: 'booking time, travel routes, seasonal demand, and cancellation probabilities',
        impact: [
            'For passengers: reduces uncertainty and improves travel planning.',
            'For railway authorities: helps in efficient resource management, forecasting seat availability, and improving customer satisfaction.',
            'For the future: opens doors to integrating real-time digital ticketing data for even more accurate predictions.'
        ],
        conclusion: `This work demonstrates how AI & ML can address real-world transportation challenges, making rail travel smarter and more reliable.`
    },
    'weather-traffic': {
        emoji: '🌦️',
        title: 'Weather-Integrated Traffic Routing with Dynamic Speed Prediction',
        conference: 'International Conference on Recent Advances in AI (ICRAAI 2025)',
        status: 'Accepted for Publication',
        domain: 'Smart Cities, Intelligent Transportation Systems (ITS)',
        technologies: 'Machine Learning, Deep Learning, Real-time Data Integration',
        problem: `Today's navigation apps are excellent at finding the shortest or least congested route. However, they often overlook a critical factor: the weather. A road that is safe at 60 mph on a sunny day can become hazardous during a sudden downpour or in dense fog. This gap between static road data and dynamic real-world conditions can lead to inefficient routes and, more importantly, compromised safety.`,
        solution: `Our research introduces a novel framework to address this challenge by creating a navigation system that sees and adapts to the weather. We developed a sophisticated AI model that integrates three key data streams:
        - Real-Time Traffic Data: Current congestion and flow.
        - Hyperlocal Weather Data: Conditions like rain, fog, and humidity.
        - Static Road Attributes: Road type, speed limits, and construction work.`,
        innovations: [
            '🏙️ Smart City Framework: We designed a robust AI framework that serves as a blueprint for optimizing urban traffic flow and enhancing public safety.',
            '🌦️ Dynamic Weather Integration: Our model is one of the first to systematically incorporate real-time weather data, making routing decisions that prioritize driver safety in adverse conditions.',
            '⚡ Advanced Speed Prediction: Instead of relying on static speed limits, our algorithms provide dynamic speed forecasts that adapt instantly to changing traffic and environmental factors.',
            '🎯 Foundation for Real-Time Systems: This research establishes the core prediction engine needed for a fully adaptive traffic management system capable of real-time processing and rerouting.'
        ],
        impact: `This work paves the way for the next generation of traffic management. The applications are vast: from making daily commutes safer and more efficient to optimizing logistics for delivery fleets. Most critically, it can drastically reduce response times for emergency vehicles, where navigating safely at the highest possible speed is a matter of life and death. By building weather-aware intelligence into our navigation systems, we are taking a significant step toward creating truly smart and resilient cities.`
    }
}

export default function ResearchPaperPage() {
    const { slug } = useParams()
    const paper = papers[slug as keyof typeof papers]

    if (!paper) {
        return <div>Paper not found</div>
    }

    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to home
                </Link>

                <StackVertical gap="lg" className="mt-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">{paper.emoji}</span>
                            <TextHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl">
                                {paper.title}
                            </TextHeading>
                        </div>

                        {'conference' in paper && (
                            <Text variant="caption" className="text-muted-foreground">
                                {paper.conference}
                            </Text>
                        )}

                        {'publisher' in paper && (
                            <Text variant="caption" className="text-muted-foreground">
                                Publisher: {paper.publisher}
                            </Text>
                        )}

                        {'authors' in paper && (
                            <Text variant="caption" className="text-muted-foreground">
                                Authors: {paper.authors}
                            </Text>
                        )}

                        {'doi' in paper && (
                            <Text variant="caption" className="text-muted-foreground">
                                DOI: <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="hover:underline">{paper.doi}</a>
                            </Text>
                        )}
                    </div>

                    <Ruler />

                    {'overview' in paper && (
                        <>
                            <div>
                                <TextHeading as="h2" className="text-xl mb-4">Overview</TextHeading>
                                <Text>{paper.overview}</Text>
                            </div>
                            <Ruler />
                        </>
                    )}

                    {'contribution' in paper && (
                        <>
                            <div>
                                <TextHeading as="h2" className="text-xl mb-4">Our Contribution</TextHeading>
                                <Text>{paper.contribution}</Text>
                                {paper.model && (
                                    <Text className="mt-4">
                                        <strong>Model Used:</strong> {paper.model}
                                    </Text>
                                )}
                                {paper.accuracy && (
                                    <Text className="mt-2">
                                        <strong>Accuracy Achieved:</strong> {paper.accuracy}
                                    </Text>
                                )}
                                {paper.features && (
                                    <Text className="mt-2">
                                        <strong>Key Features Considered:</strong> {paper.features}
                                    </Text>
                                )}
                            </div>
                            <Ruler />
                        </>
                    )}

                    {'problem' in paper && (
                        <>
                            <div>
                                <TextHeading as="h2" className="text-xl mb-4">The Problem</TextHeading>
                                <Text>{paper.problem}</Text>
                            </div>
                            <Ruler />
                        </>
                    )}

                    {'solution' in paper && (
                        <>
                            <div>
                                <TextHeading as="h2" className="text-xl mb-4">Our Solution</TextHeading>
                                <Text>{paper.solution}</Text>
                            </div>
                            <Ruler />
                        </>
                    )}

                    {'innovations' in paper && (
                        <>
                            <div>
                                <TextHeading as="h2" className="text-xl mb-4">Key Innovations & Features</TextHeading>
                                <ul className="space-y-2">
                                    {paper.innovations.map((innovation, index) => (
                                        <li key={index}>
                                            <Text>{innovation}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Ruler />
                        </>
                    )}

                    {'impact' in paper && (
                        <div>
                            <TextHeading as="h2" className="text-xl mb-4">Impact</TextHeading>
                            {Array.isArray(paper.impact) ? (
                                <ul className="space-y-2">
                                    {paper.impact.map((point, index) => (
                                        <li key={index}>
                                            <Text>{point}</Text>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Text>{paper.impact}</Text>
                            )}
                        </div>
                    )}

                    {'conclusion' in paper && (
                        <>
                            <Ruler />
                            <div>
                                <Text>{paper.conclusion}</Text>
                            </div>
                        </>
                    )}
                </StackVertical>
            </motion.div>
        </BaseContainer>
    )
}
