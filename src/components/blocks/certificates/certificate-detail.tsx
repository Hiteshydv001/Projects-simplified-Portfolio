'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Ruler from '@/components/ui/ruler/ruler'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import BaseContainer from '@/components/layout/container/base-container'

type CertificateDetailProps = {
  slug: string
}

export function CertificateDetail({ slug }: CertificateDetailProps) {
  const certificate =
    technicalCertificates.find(c => c.slug === slug) ||
    nonTechnicalCertificates.find(c => c.slug === slug)

  if (!certificate) {
    return (
      <div className="py-12 text-center">
        <TextHeading as="h1" className="text-3xl mb-4">Certificate Not Found</TextHeading>
        <Link href="/certificates" className="text-accent hover:text-accent/80">
          Back to Certificates
        </Link>
      </div>
    )
  }

  const isTechnical = 'category' in certificate
  const isExpired = isTechnical && (certificate as any).expiryDate
    ? new Date((certificate as any).expiryDate) < new Date()
    : false

  const galleryImages = useMemo(() => {
    const images = [
      {
        key: 'certificate',
        src: certificate.image,
        alt: certificate.title,
        label: 'Certificate',
      },
    ]

    if (
      'badgeImage' in certificate &&
      (certificate as any).badgeImage &&
      String((certificate as any).badgeImage).trim() !== String(certificate.image).trim()
    ) {
      images.push({
        key: 'badge',
        src: (certificate as any).badgeImage,
        alt: `${certificate.title} Supporting Image`,
        label: 'Image 2',
      })
    }

    return images
  }, [certificate])

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [slug])

  const activeImage = galleryImages[activeImageIndex]

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg" className="page-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-toolbar">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { href: '/certificates', label: 'Certificates' },
              { label: certificate.title },
            ]}
          />
          <ThemeToggle />
        </div>

        <StackVertical gap="lg" className="mt-8">
          {/* Header */}
          <div className="page-hero">
            <Text variant="caption" className="text-muted-foreground mb-2 text-xs uppercase tracking-wider">
              {isTechnical ? (certificate as any).category : 'Volunteering'}
              {isExpired && ' · Expired'}
            </Text>

            <TextHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl">
              {certificate.title}
            </TextHeading>

            <div className="mt-3 space-y-1">
              <Text className="font-semibold">
                {isTechnical ? (certificate as any).issuer : ('organization' in certificate ? certificate.organization : '')}
              </Text>
              {('role' in certificate) && (
                <Text variant="muted">
                  {certificate.role}
                </Text>
              )}
            </div>
          </div>

          <Ruler />

          {/* Certificate Gallery */}
          <div className="surface-card space-y-4 rounded-2xl p-4 sm:p-6">
            <div className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-white/80 dark:bg-slate-950/40">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.key}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-36 overflow-hidden rounded-lg border transition-all ${
                      idx === activeImageIndex
                        ? 'border-accent shadow-[0_0_0_1px_rgba(34,211,238,0.45)]'
                        : 'border-border/30 hover:border-accent/50'
                    }`}
                    aria-label={`Show ${img.label} image`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={240}
                      height={160}
                      className="w-full h-auto object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <Ruler />

          {/* Key Information */}
          <div>
            <TextHeading as="h2" className="text-xl mb-4">Details</TextHeading>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Text variant="muted" className="w-32 shrink-0 text-sm">Issue Date</Text>
                <Text className="font-semibold text-sm">{certificate.issueDate}</Text>
              </div>

              {isTechnical && (certificate as any).expiryDate && (
                <div className="flex items-start gap-3">
                  <Text variant="muted" className="w-32 shrink-0 text-sm">Expiry Date</Text>
                  <Text className={`font-semibold text-sm ${isExpired ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {(certificate as any).expiryDate}
                  </Text>
                </div>
              )}

              {isTechnical && (certificate as any).credentialId && (
                <div className="flex items-start gap-3">
                  <Text variant="muted" className="w-32 shrink-0 text-sm">Credential ID</Text>
                  <Text className="font-mono text-sm text-muted-foreground break-all">{(certificate as any).credentialId}</Text>
                </div>
              )}

              {'location' in certificate && (
                <div className="flex items-start gap-3">
                  <Text variant="muted" className="w-32 shrink-0 text-sm">Location</Text>
                  <Text className="font-semibold text-sm">{certificate.location}</Text>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {'description' in certificate && (
            <>
              <Ruler />
              <div>
                <TextHeading as="h2" className="text-xl mb-4">About This Certificate</TextHeading>
                <Text>{certificate.description}</Text>
              </div>
            </>
          )}

          <Ruler />

          {/* Skills */}
          <div>
            <TextHeading as="h2" className="text-xl mb-4">Skills & Technologies</TextHeading>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded text-xs font-medium border border-border/30 text-muted-foreground bg-transparent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          {isTechnical && (certificate as any).credentialUrl && (
            <>
              <Ruler />
              <div>
                <a
                  href={(certificate as any).credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
                >
                  <span className="text-sm font-medium">View Credential</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </>
          )}

          <Ruler />

          {/* Related Certificates */}
          <div>
            <TextHeading as="h2" className="text-xl mb-4">Related Certificates</TextHeading>
            <div className="grid gap-4">
              {(isTechnical
                ? technicalCertificates
                    .filter(c => c.category === (certificate as any).category)
                    .filter(c => c.slug !== slug)
                    .slice(0, 4)
                : nonTechnicalCertificates
                    .filter(c => c.slug !== slug)
                    .slice(0, 4)
              ).map((relCert) => (
                <Link
                  key={relCert.id}
                  href={`/certificates/${relCert.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-border/20 bg-transparent transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 group-hover:border-accent/30 p-4"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border/20">
                    <Image
                      src={relCert.image}
                      alt={relCert.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text size="sm" className="font-semibold line-clamp-1 group-hover:text-accent transition-colors">
                      {relCert.title}
                    </Text>
                    <Text variant="muted" size="xs">
                      {relCert.issueDate}
                    </Text>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </StackVertical>
      </motion.div>
    </BaseContainer>
  )
}
