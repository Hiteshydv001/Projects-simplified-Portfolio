'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'

const patents = {
    'smart-pillow': {
        emoji: '🛏️',
        title: 'The Smart Pillow - Non-Intrusive Health & Sleep Monitoring',
        status: 'Patent Application Filed',
        overview: `As a co-inventor, I conceptualized and filed a patent for the "Smart Pillow," an innovative health-tech device designed to monitor vital signs and sleep quality in a completely non-intrusive way. This project addresses the critical shortcomings of wearable health trackers, which are often uncomfortable and impractical for 24/7 monitoring, especially during sleep. Our invention embeds advanced biomedical sensors directly into a comfortable, ergonomic pillow, creating a seamless and passive health monitoring experience.`,
        challenge: {
            title: 'The Problem: The Discomfort of Continuous Health Tracking',
            description: 'The inspiration for this invention came from a real-world problem: a significant number of health emergencies, like heart attacks, occur during the night when people are least monitored. While smartwatches and fitness bands exist, they present significant challenges:',
            points: [
                'Discomfort During Sleep: Wearing a device on your wrist or chest all night can be irritating and disrupt sleep, leading users to remove them.',
                'Inconsistent Usage: Users often forget to wear their devices or fail to charge them, resulting in incomplete and unreliable health data.',
                'Intrusive Experience: The need to actively manage a device creates a barrier to effortless, long-term health tracking, especially for the elderly or those recovering from illness.',
                'Bulky Alternatives: Under-mattress systems are expensive, complex to install, and often lack the precision needed for accurate vital sign monitoring.'
            ]
        },
        solution: {
            title: 'Our Solution: Intelligent Monitoring, Seamlessly Integrated into Daily Life',
            description: `The Smart Pillow transforms a familiar, everyday object into a powerful health monitoring tool. By embedding technology into the user's natural sleep environment, we eliminate the friction and discomfort of traditional methods.`,
            features: [
                {
                    title: 'Embedded, Contactless Sensor Array',
                    description: `The core of our invention is a network of biomedical-grade sensors integrated within the pillow's structure. These sensors can accurately and continuously track key vitals without direct skin contact:`,
                    subpoints: [
                        'Heart Rate & Respiration Rate: Using micro-vibration and infrared sensors to monitor cardiovascular and respiratory health.',
                        'Sleep Quality & Posture: Analyzing movement and breathing patterns to track sleep cycles (REM, deep, light) and identify restlessness or poor posture.'
                    ]
                },
                {
                    title: 'Passive and Automatic Operation',
                    description: 'The pillow is designed for zero-effort use.',
                    subpoints: [
                        'Smart Activation: Pressure and motion sensors automatically activate monitoring when the user lies down.',
                        'Effortless Data Sync: Real-time data is transmitted wirelessly via Bluetooth or Wi-Fi to a companion mobile app.'
                    ]
                },
                {
                    title: 'User-Centric Design & Comfort',
                    description: 'We prioritized user experience by ensuring the technology remains completely unobtrusive. The pillow is crafted from breathable, hypoallergenic materials, and all electronic components are shielded within soft cushioning.'
                },
                {
                    title: 'Intelligent Health Insights & Alerts',
                    description: 'The companion app provides more than just raw data. It offers:',
                    subpoints: [
                        'Personalized Analytics: Visualizes long-term health trends and provides insights into sleep patterns.',
                        'Customizable Alerts: Users or caregivers can set thresholds for vital signs, and the system will send alerts if abnormalities are detected.'
                    ]
                }
            ],
            techStack: {
                title: 'Technology Stack & Core Components',
                hardware: 'Embedded micro-vibration sensors, infrared sensors, pressure sensors, a power-efficient microcontroller, and a Bluetooth/Wi-Fi communication module.',
                software: 'A custom mobile application for data visualization, trend analysis, and alert management, with a secure cloud backend for long-term data storage.'
            }
        }
    },
    'smart-earbud': {
        emoji: '🎧',
        title: 'AI-Powered Smart Earbud with Real-Time Meeting Summarization',
        status: 'Patent Application Filed',
        overview: `As a inventor, I designed and filed a patent for a next-generation smart earbud that redefines hands-free productivity. Our invention, the "Tap-to-Activate Smart Earbud," is an AI-powered wearable assistant that provides real-time meeting summarization, intelligent conversation recall, and contextual follow-up suggestions, all initiated with a simple tap. This work moves beyond standard voice assistants to create a seamless, private, and efficient tool for professionals.`,
        challenge: {
            title: 'The Limitations of Existing Smart Earbuds',
            description: `Modern voice assistants are powerful but often impractical in professional settings. We identified four key problems with prior technology:`,
            points: [
                'Clumsy Activation: Reliance on awkward "wake words" (e.g., "Hey Siri") is disruptive and unreliable in noisy environments.',
                'No Conversational Memory: Existing assistants lack context. They cannot recall past discussions or provide summaries, forcing users to take manual notes.',
                'Slow, Cloud-Reliant Performance: Processing voice commands on distant servers leads to delays, requires a constant internet connection, and raises significant privacy concerns.',
                'Poor Battery Life: The "always-listening" mode required for wake words drains battery, making all-day use impossible.'
            ]
        },
        solution: {
            title: 'Our Innovative Solution',
            description: `Our smart earbud solves these challenges with a novel architecture that integrates cutting-edge hardware and a hybrid AI model.`,
            features: [
                {
                    title: 'Tap-to-Activate Interface',
                    description: 'We replaced wake words with an intuitive capacitive touch sensor. A simple tap instantly activates the AI, ensuring discreet and reliable operation in any environment.'
                },
                {
                    title: 'On-Device AI for Summarization & Recall',
                    description: "The core of our invention is its ability to process conversations in real-time. The earbud's embedded AI can:",
                    subpoints: [
                        'Generate Instant Summaries: Listen to a meeting and provide a concise audio summary of key points and decisions.',
                        'Recall Past Conversations: Users can ask, "What did we decide about the project budget last week?" and receive an instant, accurate answer.',
                        'Suggest Intelligent Follow-ups: The AI analyzes discussion history to recommend topics for the next meeting, ensuring conversation continuity.'
                    ]
                },
                {
                    title: 'Hybrid Edge-Cloud Architecture',
                    description: 'We designed a smart, efficient processing system.',
                    subpoints: [
                        'Edge AI (On-Device): A lightweight Small Language Model (SmoLLM) runs directly on the earbud for instant speech-to-text, keyword extraction, and retrieval of recent summaries.',
                        'Cloud AI: For deep analysis of long meetings, only essential, anonymized data is sent to the cloud for processing.'
                    ]
                }
            ],
            techStack: {
                title: 'Technology Stack & Core Components',
                hardware: 'Capacitive Touch Sensor, Microphone Array with DSP for noise cancellation, Embedded Edge AI Processor, and low-power Bluetooth/Wi-Fi module.',
                software: 'Custom-trained Small Language Model (SmoLLM) for on-device NLP, real-time Automatic Speech Recognition (ASR), Named Entity Recognition (NER), and a secure API for cloud integration.'
            }
        }
    },
    'underwater-sensor': {
        emoji: '🌊',
        title: 'AI-Guided System for Autonomous Deployment of Underwater Sensor Networks',
        status: 'Patent Application Filed',
        overview: `As a principal inventor, I designed and filed a patent for a groundbreaking autonomous system that intelligently deploys and manages underwater surveillance networks. This invention leverages an AI-guided Autonomous Underwater Vehicle (AUV) to create a persistent, adaptive, and secure sensor field for maritime monitoring.`,
        challenge: {
            title: 'The Blind Spots in Underwater Surveillance',
            description: 'Effective underwater surveillance is a complex engineering challenge. We identified critical flaws in existing methods:',
            points: [
                'Static Sensor Arrays: Manually deployed sensor grids are incredibly expensive, inflexible, and cannot be adapted to new threats.',
                'AUV Patrols: While mobile, AUVs provide only temporary, "snapshot" surveillance.',
                'Lack of Intelligence: Prior art systems rely on pre-programmed paths and "dumb" sensors.'
            ]
        },
        solution: {
            title: 'Our Innovative Solution',
            description: 'Our invention is a holistic, intelligent system that functions as a "network architect," not just a deployment tool.',
            features: [
                {
                    title: 'AI-Driven Adaptive Deployment',
                    description: "The core of our innovation is the AUV's AI Decision Engine.",
                    subpoints: [
                        'Reinforcement Learning: We use a reinforcement learning model (e.g., PPO) for real-time analysis.',
                        'Intelligent Placement: The AI autonomously identifies strategically valuable locations.'
                    ]
                },
                {
                    title: 'Edge-Computing Smart Sensor Nodes',
                    description: 'We designed "smart" sensor nodes that think for themselves.',
                    subpoints: [
                        'Onboard AI Accelerators: Each node has a low-power AI accelerator for local processing.',
                        'Local Threat Detection: Nodes analyze their own sensor data for genuine threats.'
                    ]
                },
                {
                    title: 'Secure, Self-Healing Underwater Mesh Network',
                    description: 'Our system creates a resilient communication fabric.',
                    subpoints: [
                        'Decentralized Communication: Nodes form a secure, ad-hoc mesh network.',
                        'Resilience and Security: Network can self-heal and ensures secure communications.'
                    ]
                }
            ],
            techStack: {
                title: 'Technology Stack & Core Components',
                hardware: 'NVIDIA Jetson Nano for AI processing, Robot Operating System (ROS), sonar/hydrophone suite, and a custom deployment actuator.',
                software: 'Reinforcement Learning (PPO) for deployment decisions, TensorFlow Lite for on-node classification, B.A.T.M.A.N. protocol for mesh networking.'
            }
        }
    }
}

export default function PatentPage() {
    const { slug } = useParams()
    const patent = patents[slug as keyof typeof patents]

    if (!patent) {
        return <div>Patent not found</div>
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
                            <span className="text-4xl">{patent.emoji}</span>
                            <TextHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl">
                                {patent.title}
                            </TextHeading>
                        </div>

                        <Text variant="caption" className="text-muted-foreground">
                            Status: {patent.status}
                        </Text>
                    </div>

                    <Ruler />

                    <div>
                        <TextHeading as="h2" className="text-xl mb-4">Project Overview</TextHeading>
                        <Text>{patent.overview}</Text>
                    </div>

                    <Ruler />

                    <div>
                        <TextHeading as="h2" className="text-xl mb-4">{patent.challenge.title}</TextHeading>
                        <Text>{patent.challenge.description}</Text>
                        <ul className="mt-4 space-y-2">
                            {patent.challenge.points.map((point, index) => (
                                <li key={index}>
                                    <Text>{point}</Text>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Ruler />

                    <div>
                        <TextHeading as="h2" className="text-xl mb-4">{patent.solution.title}</TextHeading>
                        <Text>{patent.solution.description}</Text>

                        <div className="mt-6 space-y-6">
                            {patent.solution.features.map((feature, index) => (
                                <div key={index}>
                                    <TextHeading as="h3" className="text-lg mb-2">{feature.title}</TextHeading>
                                    <Text>{feature.description}</Text>
                                    {feature.subpoints && (
                                        <ul className="mt-2 space-y-2">
                                            {feature.subpoints.map((point, idx) => (
                                                <li key={idx}>
                                                    <Text>{point}</Text>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Ruler />

                    <div>
                        <TextHeading as="h2" className="text-xl mb-4">{patent.solution.techStack.title}</TextHeading>
                        <Text className="font-semibold">Hardware</Text>
                        <Text className="mt-2 mb-4">{patent.solution.techStack.hardware}</Text>
                        <Text className="font-semibold">Software & AI</Text>
                        <Text className="mt-2">{patent.solution.techStack.software}</Text>
                    </div>
                </StackVertical>
            </motion.div>
        </BaseContainer>
    )
}
