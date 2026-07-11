'use client'

import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import TextHeading from "@/components/ui/text-heading/text-heading"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Text from "@/components/ui/text/text"
import { SectionFooter } from "@/components/layout/footer/SectionFooter"
import Playground from '@/app/ai-playground/_components/Playground';
import Pictionary from '@/app/ai-playground/_components/Pictionary';

export default function AIPlaygroundPage() {
  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <StackVertical gap="md">
        <div className="page-toolbar">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'AI Playground' }
            ]}
          />
          <ThemeToggle />
        </div>
        <div className="page-hero">
          <TextHeading as="h1" weight="bold">
            🤖 AI Playground
          </TextHeading>
          <Text variant="muted" className="max-w-2xl">
            Explore how transformers process and understand text through interactive visualizations.
            Type any text and see attention patterns in action!
          </Text>
        </div>
        <Playground />
        <div className="surface-card rounded-2xl p-5 sm:p-7">
          <TextHeading as="h2" weight="bold">
            Vision Pictionary
          </TextHeading>
          <Text variant="muted" className="mb-6">
            Draw on the canvas and let Gemini Vision guess what it is. It works best with bold shapes and clear strokes.
          </Text>
          <Pictionary />
        </div>
      </StackVertical>
      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  );
}
