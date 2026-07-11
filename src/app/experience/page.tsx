'use client'

import { useEffect } from 'react'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { ExperienceSection } from '@/components/blocks/homepage/ExperienceSection'

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg" className="page-shell">
      <StackVertical gap="lg">
        <div className="page-toolbar">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'Experience' },
            ]}
          />
          <ThemeToggle />
        </div>

        <div className="page-hero space-y-2">
          <TextHeading as="h1" className="text-3xl sm:text-4xl font-bold">
            Experience
          </TextHeading>
          <Text variant="muted">
            A detailed timeline of my internships, mentorships, and engineering roles.
          </Text>
        </div>

        <ExperienceSection showViewAllButton={false} />
      </StackVertical>
      <SectionFooter color="purple" showToTop={true} />
    </BaseContainer>
  )
}
