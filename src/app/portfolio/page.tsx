'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { motion } from "framer-motion"

export default function Portfolio() {
    return (
        <BaseContainer size="lg" paddingX="sm" paddingY="lg">
            <StackVertical gap="md">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'Portfolio' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div>
                    <TextHeading as="h1" weight="bold">
                        Portfolio
                    </TextHeading>
                    <Text variant="muted" className="mb-8">
                        An interactive showcase of my projects and professional experience.
                    </Text>
                </div>

                <div className="relative w-full h-[calc(100vh-20rem)] rounded-lg overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-100/10 to-transparent dark:from-slate-900/10 pointer-events-none z-10" />
                    <motion.iframe
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        src="https://hitesh-aiml.vercel.app/"
                        className="w-full h-full border-0 bg-white dark:bg-slate-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </StackVertical>
            <SectionFooter color="purple" showToTop={false} />
        </BaseContainer>
    )
}