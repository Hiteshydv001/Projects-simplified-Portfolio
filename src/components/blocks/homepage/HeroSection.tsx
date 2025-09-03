'use client'

import { motion } from 'framer-motion'
import { monoFont } from '@/styles/fonts/fonts'
import { cn } from '@/lib/utils/utils'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import Link from 'next/link'
import Image from 'next/image'
import Ruler from '@/components/ui/ruler/ruler'
import { List, ListItem } from '@/components/ui/list/list'

export function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pb-8"
        >
            <div className="relative">
                <StackVertical gap="xs">
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                        }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={cn("text-2xl sm:text-3xl md:text-4xl", monoFont.className)}
                    >
                        👾
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <TextHeading as="h1" className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                            hitesh.ml
                        </TextHeading>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Text>
                            Hey, I'm Hitesh Kumar 👋
                        </Text>

                        <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Text>
                                I work in AI & Machine Learning, but at heart I'm just curious about how ideas turn into systems that people can actually use. I love tinkering with LLM agents, multi-agent setups, and AI tools that don't just sit in theory — they run, they scale, and they ship.
                            </Text>
                            <Ruler color='colorless' marginTop='sm' marginBottom='none'/>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                                <Text>
                                    This space is my personal corner on the internet — part notes, part reflections, part experiments. Think of it as my digital notebook, open to anyone who wants to peek inside.
                                </Text>

                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                    Here you'll find things like:
                                </Text>

                                <Ruler color='colorless' marginTop='md' marginBottom='none'/>

                                <List spacing='tight'>
                                    <ListItem>
                                        My journey — thoughts from learning, messing up, and figuring things out
                                    </ListItem>
                                    <ListItem>
                                        Visions & resolutions — not rigid roadmaps, but where I see myself growing
                                    </ListItem>
                                    <ListItem>
                                        Machine learning notes — beginner-friendly entries and deeper dives
                                    </ListItem>
                                    <ListItem>
                                        Weekly learnings — snapshots of what I've been exploring lately
                                    </ListItem>
                                </List>

                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                    It's not polished. It's not meant to be. It's just me — learning in public, sharing what I know, and maybe sparking an idea for someone else.
                                </Text>

                                <Ruler color='colorless' marginTop='lg' marginBottom='none'/>

                                <Text>
                                    Glad you're here 🙂 Take a look around.
                                </Text>
                        </motion.div>
                    </motion.div>
                </StackVertical>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 -mb-8"
            >
                <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden">
                    <Image
                        className="object-cover"
                        fill
                        src="/Portfolio.png" 
                        alt="A photo of Gion Town, Kyoto I took on March 2024."
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                    />
                </div>
            </motion.div>
        </motion.div>
    )
} 
