// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ChevronLeft, FileBadge2, FileText, Award } from 'lucide-react'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import { SectionFooter } from '@/components/layout/footer/SectionFooter'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { experiences } from '@/app/experience/_data/experiences'

function toPreviewUrl(url) {
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
  }
  return url
}

export default function ExperienceDetailPage() {
  const params = useParams()
  const slug = params?.slug

  const experience = useMemo(
    () => experiences.find((item) => item.slug === slug),
    [slug]
  )

  const docs = useMemo(() => {
    if (!experience) return []

    const allDocs = [
      experience.certificateUrl
        ? { key: 'certificate', label: 'Certificate', url: experience.certificateUrl, icon: Award }
        : null,
      experience.additionalCertificateUrl
        ? { key: 'additional', label: 'Offer Letter / Additional Doc', url: experience.additionalCertificateUrl, icon: FileBadge2 }
        : null,
      experience.lorUrl
        ? { key: 'lor', label: 'Letter of Recommendation', url: experience.lorUrl, icon: FileText }
        : null,
    ].filter(Boolean)

    return allDocs
  }, [experience])

  const [activeDocKey, setActiveDocKey] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (docs.length > 0) {
      setActiveDocKey(docs[0].key)
    } else {
      setActiveDocKey(null)
    }
  }, [docs])

  if (!experience) {
    return (
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <StackVertical gap="lg">
          <div className="flex items-center justify-between">
            <DynamicBreadcrumb
              items={[
                { href: '/', label: 'Home', emoji: '👾' },
                { href: '/experience', label: 'Experience' },
                { label: 'Not Found' },
              ]}
            />
            <ThemeToggle />
          </div>

          <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-6">
            <TextHeading as="h1" className="text-2xl font-bold">Experience not found</TextHeading>
            <Text variant="muted" className="mt-2">Ye route exist nahi karta. Wapas experience page pe jao.</Text>
            <Link
              href="/experience"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Experience
            </Link>
          </div>
        </StackVertical>
      </BaseContainer>
    )
  }

  const activeDoc = docs.find((doc) => doc.key === activeDocKey) ?? null
  const relatedExperiences = experiences.filter((item) => item.slug !== experience.slug).slice(0, 4)

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="lg">
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { href: '/experience', label: 'Experience' },
              { label: experience.company },
            ]}
          />
          <ThemeToggle />
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-background/90 to-emerald-500/10 p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border/40 bg-background/40">
                <Image
                  src={experience.image}
                  alt={experience.company}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <TextHeading as="h1" className="text-2xl sm:text-3xl leading-tight">
                  {experience.title}
                </TextHeading>
                <Text variant="muted" className="mt-1">
                  {experience.company} · {experience.location}
                </Text>
                <Text size="sm" className="mt-2 font-medium text-cyan-300">
                  {experience.period}
                </Text>
              </div>
            </div>

            <Link
              href="/experience"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm hover:bg-background/70 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              All Experience
            </Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
              <TextHeading as="h2" className="text-lg sm:text-xl">Highlights</TextHeading>
              <div className="mt-4 space-y-3">
                {experience.description.map((line) => (
                  <div key={line} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400/70" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
              <TextHeading as="h2" className="text-lg sm:text-xl">Technologies</TextHeading>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
              <TextHeading as="h2" className="text-lg sm:text-xl">About This Work</TextHeading>
              <div className="prose prose-sm dark:prose-invert mt-4 max-w-none text-muted-foreground">
                {experience.content}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {docs.length > 0 && (
              <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-background/70 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <TextHeading as="h2" className="text-lg sm:text-xl">Document Preview</TextHeading>
                  {activeDoc && (
                    <a
                      href={activeDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                    >
                      Open Original
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {docs.map((doc) => {
                    const isActive = doc.key === activeDocKey
                    const Icon = doc.icon

                    return (
                      <button
                        key={doc.key}
                        onClick={() => setActiveDocKey(doc.key)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-200'
                            : 'border-border/50 bg-background/40 text-muted-foreground hover:bg-background/70'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {doc.label}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-border/50 bg-black/20">
                  {activeDoc && activeDoc.url.includes('drive.google.com') ? (
                    <iframe
                      key={activeDoc.key}
                      src={toPreviewUrl(activeDoc.url)}
                      title={activeDoc.label}
                      className="h-[72vh] min-h-[520px] w-full border-0"
                      loading="lazy"
                      allow="fullscreen"
                    />
                  ) : (
                    <div className="flex h-[72vh] min-h-[520px] w-full items-center justify-center p-8 text-center">
                      <div className="max-w-md space-y-3">
                        <p className="text-base font-semibold">Inline preview unavailable for this document</p>
                        <p className="text-sm text-muted-foreground">
                          Is document ka source provider inline embed allow nahi karta. Open Original pe click karke full document dekho.
                        </p>
                        {activeDoc && (
                          <a
                            href={activeDoc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                          >
                            Open {activeDoc.label}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
              <TextHeading as="h3" className="text-lg">Explore More</TextHeading>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedExperiences.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/experience/${item.slug}`}
                    className="rounded-lg border border-border/50 bg-muted/20 px-3 py-1.5 text-xs font-medium hover:bg-muted/35 transition-colors"
                  >
                    {item.company}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StackVertical>
      <SectionFooter color="purple" showToTop={true} />
    </BaseContainer>
  )
}
