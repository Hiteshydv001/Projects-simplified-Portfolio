import type { Metadata } from "next"
import { CertificateDetail } from "@/components/blocks/certificates/certificate-detail"
import { technicalCertificates } from "@/app/certificates/_data/technical-certificates"
import { nonTechnicalCertificates } from "@/app/certificates/_data/non-technical-certificates"

const allCertificates = [...technicalCertificates, ...nonTechnicalCertificates]

export const metadata: Metadata = {
  title: "Certificate Details | Hitesh",
  description: "View detailed information about my professional certificates and achievements.",
}

interface CertificateDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return allCertificates.map(cert => ({
    slug: cert.slug,
  }))
}

export default async function CertificateDetailPage({ params }: CertificateDetailPageProps) {
  const { slug } = await params

  return <CertificateDetail slug={slug} />
}
