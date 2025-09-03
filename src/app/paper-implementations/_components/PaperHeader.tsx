import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import TextHeading from "@/components/ui/text-heading/text-heading"
import Text from "@/components/ui/text/text"

export function PaperHeader() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <DynamicBreadcrumb 
                    items={[
                        { href: '/', label: 'Home', emoji: '👾' },
                        { label: 'Paper_Implementations' }
                    ]}
                />
                <ThemeToggle />
            </div>
            
            <div>
                <TextHeading as="h1" weight="bold">
                    Paper_Implementations
                </TextHeading>
                <Text variant="muted" className="mt-2">
                    Deep dives into research papers with practical implementations, focusing on machine learning and AI architectures.
                </Text>
            </div>
        </div>
    )
}
