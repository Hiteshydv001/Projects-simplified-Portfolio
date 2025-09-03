'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

export default function About() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'About' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div>
                <TextHeading as="h1" weight="bold">
                    About Me
                </TextHeading>
                <Text variant="muted" size="xs" className="mb-8">September 1, 2025</Text>
                <StackVertical gap="md">
                    <Text>
                        Hi, I'm Hitesh 👋 — a curious mind who enjoys turning complex problems into simple, practical solutions with the help of AI, data, and code. Right now, I'm pursuing my B.E. in Computer Science (AI & ML) at Chandigarh University, where I've been diving deep into machine learning, NLP, and computer vision.
                    </Text>

                    <Text>
                        Beyond the academics, I've built projects like an AI-powered remote proctoring system, a multi-agent RAG tool, and advanced lane detection for autonomous driving. I also love contributing to open-source and collaborating on ideas that push tech forward.
                    </Text>

                    <Text>
                        What excites me most is building things that are useful and impactful — whether it's automating workflows, designing intelligent systems, or experimenting with new ways to make AI more human-friendly.
                    </Text>
                    <Text>
                        When I'm not coding, you'll usually find me exploring new tech trends, sketching out project ideas, or reading about how AI is shaping the world.
                    </Text>

                    <Text>
                        I believe in the power of technology to solve real-world problems, and I'm particularly interested in how AI can be used to create more efficient, accessible, and sustainable solutions. Whether it's through my projects, research, or collaborations, I'm always looking for ways to contribute to this exciting field.
                    </Text>

                    <Text>
                        Feel free to reach out if you want to collaborate on a project, discuss AI and tech, or just have a chat about the future of technology. I'm always open to new ideas and connections!
                    </Text>
                </StackVertical>
            </div>
            </StackVertical>
            <SectionFooter color="purple" />
        </BaseContainer>
    )
}

