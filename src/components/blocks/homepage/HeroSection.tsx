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
import { Button } from '@/components/ui/primitives/button'
import { FileText, Send } from 'lucide-react'

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

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.55 }}
                                className="mt-5 mb-1 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm text-muted-foreground leading-relaxed"
                            >
                                <span>I build with</span>
                                {[
                                    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://www.python.org" },
                                    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org" },
                                    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://www.tensorflow.org" },
                                ].map((tech, i, arr) => (
                                    <span key={tech.name} className="inline-flex items-center gap-0.5">
                                        <a
                                            href={tech.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/25 transition-all text-foreground font-medium text-xs"
                                        >
                                            <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5" />
                                            {tech.name}
                                        </a>
                                        {i < arr.length - 1 && <span className="text-muted-foreground/50">,</span>}
                                    </span>
                                ))}
                                <span>and ship with</span>
                                {[
                                    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org" },
                                    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org" },
                                    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
                                ].map((tech, i, arr) => (
                                    <span key={tech.name} className="inline-flex items-center gap-0.5">
                                        <a
                                            href={tech.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/25 transition-all text-foreground font-medium text-xs"
                                        >
                                            <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5" />
                                            {tech.name}
                                        </a>
                                        {i < arr.length - 1 && <span className="text-muted-foreground/50">,</span>}
                                    </span>
                                ))}
                                <span>. Cloud of choice:</span>
                                {[
                                    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", url: "https://azure.microsoft.com" },
                                    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", url: "https://aws.amazon.com" },
                                ].map((tech, i, arr) => (
                                    <span key={tech.name} className="inline-flex items-center gap-0.5">
                                        <a
                                            href={tech.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/25 transition-all text-foreground font-medium text-xs"
                                        >
                                            <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5" />
                                            {tech.name}
                                        </a>
                                        {i < arr.length - 1 && <span className="text-muted-foreground/50">,</span>}
                                    </span>
                                ))}
                                <span>.</span>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-3 mt-6 mb-8"
                            >
                                <Link href="/resume">
                                    <Button className="rounded-full border border-border/60 bg-white/80 dark:bg-white/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 h-10 px-5 text-sm backdrop-blur-md transition-all text-black dark:text-white font-medium shadow-sm hover:shadow-md">
                                        <FileText className="w-4 h-4 mr-2 text-black/70 dark:text-white/70" />
                                        Resume / CV
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button className="rounded-full bg-accent hover:bg-accent/90 text-white h-10 px-5 text-sm shadow-md shadow-accent/20 transition-all font-medium">
                                        <Send className="w-4 h-4 mr-2" />
                                        Get in touch
                                    </Button>
                                </Link>
                            </motion.div>

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
