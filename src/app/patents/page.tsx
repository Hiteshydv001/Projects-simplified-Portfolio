import BaseContainer from '@/components/layout/container/base-container'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { Patents } from '@/components/blocks/homepage/Patents'

export default function PatentsPage() {
  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <div className="page-toolbar">
        <DynamicBreadcrumb items={[{ href: '/', label: 'Home', emoji: '👾' }, { label: 'Patents' }]} />
        <ThemeToggle />
      </div>
      <section className="page-hero mb-8">
        <Text className="page-eyebrow mb-3">Invention portfolio</Text>
        <TextHeading as="h1" className="mb-3 text-4xl md:text-5xl">Patents & product systems</TextHeading>
        <Text variant="muted" className="max-w-2xl">A collection of applied AI, health-tech, and autonomous systems designed around real-world constraints.</Text>
      </section>
      <Patents />
    </BaseContainer>
  )
}
