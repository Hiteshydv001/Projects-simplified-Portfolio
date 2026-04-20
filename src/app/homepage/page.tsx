import BaseContainer from "@/components/layout/container/base-container"
import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import { HomepageFooter } from "@/components/layout/footer/HomepageFooter"
import { HeroSection } from "@/components/blocks/homepage/HeroSection"
import { CurrentWork } from "@/components/blocks/homepage/CurrentWork"
import { Navbar } from "@/components/ui/navbar/Navbar"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { CommandPalette } from "@/components/blocks/command-palette/command-palette"
import { HomepageSocials } from "@/components/blocks/homepage/HomepageSocials"
import { Projects } from "@/components/blocks/homepage/Projects"
import { ResearchPapers } from "@/components/blocks/homepage/ResearchPapers"
import { Patents } from "@/components/blocks/homepage/Patents"
import { LatestArticles } from "@/components/blocks/homepage/LatestArticles"
import GitHubActivity from "@/components/blocks/homepage/GitHubActivity"
import { VisitorCounter } from "@/components/blocks/homepage/VisitorCounter"
import { ExperienceSection } from "@/components/blocks/homepage/ExperienceSection"
import { CalBooking } from "@/components/blocks/homepage/CalBooking"
import { CertificatePreview } from "@/components/blocks/homepage/CertificatePreview"

export default function Homepage() {
  return (
    <>
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <div className="mb-8 flex items-center justify-between gap-3 lg:hidden">
          <Navbar />
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="mb-8 hidden lg:flex items-center justify-between gap-4 min-h-12">
          <div className="flex-1 flex justify-center">
            <Navbar />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <CommandPalette />
            <ThemeToggle />
          </div>
        </div>
        <StackVertical gap="lg">
            <HeroSection />
          <ExperienceSection />
            <ResearchPapers />
            <Patents />
            <LatestArticles />
            <GitHubActivity />
            <CurrentWork />
            <CertificatePreview />
            <Projects />
            <CalBooking />
            <HomepageSocials />
            <VisitorCounter />
        </StackVertical>
      </BaseContainer>
      <HomepageFooter />
    </>
  )
}
