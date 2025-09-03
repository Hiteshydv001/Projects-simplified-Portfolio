'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { Navbar } from "@/components/ui/navbar/Navbar"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

export default function ResearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <div className="flex justify-between items-center mb-8">
                <Navbar />
                <ThemeToggle />
            </div>
            {children}
        </BaseContainer>
    )
}
