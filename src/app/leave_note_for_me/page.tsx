'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Text from "@/components/ui/text/text"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import NoteForm from "@/components/blocks/note-wall/note-form"
import NoteWall from "@/components/blocks/note-wall/note-wall"

export default function LeaveNoteForMe() {
    return (
        <BaseContainer size="lg" paddingX="md" paddingY="lg">
            <StackVertical gap="md">
                <div className="flex items-center justify-between">
                    <DynamicBreadcrumb 
                        items={[
                            { href: '/', label: 'Home', emoji: '👾' },
                            { label: 'Leave a Note' }
                        ]}
                    />
                    <ThemeToggle />
                </div>

                <div>
                    <TextHeading as="h1" weight="bold">
                        Leave a Note
                    </TextHeading>
                    <Text variant="muted" className="mb-8">
                        Drop a message, share your thoughts, or just say hi! Your notes will appear on the wall below.
                    </Text>
                </div>

                <div className="mb-12">
                    <NoteForm />
                </div>

                <NoteWall />
            </StackVertical>
            <SectionFooter color="purple" showToTop={true} />
        </BaseContainer>
    )
}
