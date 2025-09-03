'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import { PaperCard } from "./_components/PaperCard"
import { PaperHeader } from "./_components/PaperHeader"
import { papers } from "./_data/papers"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"

export default function PaperListing() {
    return (
        <BaseContainer size="md" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <PaperHeader />
                <StackVertical gap="none">
                    {papers.map((paper, index) => (
                        <PaperCard 
                            key={paper.id} 
                            paper={paper} 
                            isLast={index === papers.length - 1}
                        />
                    ))}
                </StackVertical>
            </StackVertical>
            <SectionFooter showToTop={false} />
        </BaseContainer>
    )
}
