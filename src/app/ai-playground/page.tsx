'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Text from "@/components/ui/text/text"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Playground from '@/app/ai-playground/_components/Playground';

export default function AIPlaygroundPage() {
  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg">
      <StackVertical gap="md">
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'AI Playground' }
            ]}
          />
          <ThemeToggle />
        </div>
        <div>
          <TextHeading as="h1" weight="bold">
            🤖 AI Playground
          </TextHeading>
          <Text variant="muted" className="mb-8">
            Explore how transformers process and understand text through interactive visualizations.
            Type any text and see attention patterns in action!
          </Text>
        </div>
        <Playground />
      </StackVertical>
      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  );
}
