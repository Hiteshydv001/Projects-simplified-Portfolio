import type { Metadata } from "next"
import { CertificateGallery } from "@/components/blocks/certificates/certificate-gallery"
import BaseContainer from "@/components/layout/container/base-container"
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"

export const metadata: Metadata = {
  title: "Certificates & Achievements | Hitesh",
  description: "Professional certifications, technical credentials, and volunteer recognitions. Explore my AI, Cloud, Data Science, and community development achievements.",
}

export default function CertificatesPage() {
  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg" className="page-shell">
      <div className="page-toolbar">
        <DynamicBreadcrumb
          items={[
            { href: '/', label: 'Home', emoji: '👾' },
            { label: 'Certificates' },
          ]}
        />
        <ThemeToggle />
      </div>
      <CertificateGallery />
    </BaseContainer>
  )
}
