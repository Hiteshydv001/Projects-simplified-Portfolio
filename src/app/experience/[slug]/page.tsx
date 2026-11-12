'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { IconContext, ArrowSquareOut as ExternalLink, CaretLeft as ChevronLeft, ArrowLeft, Files as FileBadge2, FileText, Certificate as Award, Globe, GithubLogo as Github, Translate as Languages, MapPin, Sparkle as Sparkles, Code as Code2, BookOpenText as BookOpen, Briefcase, ArrowUpRight } from '@phosphor-icons/react'
import { Sticker } from '@/components/studio/primitives'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { experiences } from '@/app/experience/_data/experiences'

function toPreviewUrl(url: string) {
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
    ].filter((doc): doc is NonNullable<typeof doc> => doc !== null)

    return allDocs
  }, [experience])

  const [activeDocKey, setActiveDocKey] = useState<string | null>(null)

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
      <BaseContainer size="md" paddingX="md" paddingY="lg" className="page-shell">
        <StackVertical gap="lg">
        <Link href="/experience" className="back-pill"><span className="back-pill-icon" aria-hidden="true"><ArrowLeft size={14} weight="bold" /></span>All experience</Link>

          <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-6">
            <TextHeading as="h1" className="text-2xl font-bold">Experience not found</TextHeading>
            <Text variant="muted" className="mt-2">This experience could not be found. Explore the full experience archive.</Text>
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

  const isCurrent = /present/i.test(experience.period)
  const tones = ['cyan', 'yellow', 'green', 'pink'] as const
  const links = [
    experience.companyUrl && { href: experience.companyUrl, label: 'Company site', Icon: Globe },
    experience.githubUrl && { href: experience.githubUrl, label: 'GitHub', Icon: Github },
    experience.deploymentUrl && { href: experience.deploymentUrl, label: 'Live demo', Icon: ExternalLink },
    experience.frenchWebsiteUrl && { href: experience.frenchWebsiteUrl, label: 'French site', Icon: Languages },
  ].filter((link): link is { href: string; label: string; Icon: typeof Globe } => Boolean(link))

  return (
    <IconContext.Provider value={{ weight: 'duotone' }}>
    <div className="xp-page">
      <Link href="/experience" className="back-pill"><span className="back-pill-icon" aria-hidden="true"><ArrowLeft size={14} weight="bold" /></span>All experience</Link>

      {/* Header: studio identity (hand note, Flux title, sticker period) on a polished card */}
      <header className="xp-hero">
        <span className="xp-hero-wave" aria-hidden="true" />
        <p className="hand-note xp-hero-note">{isCurrent ? 'where I work now' : 'where I shipped it'}</p>
        <div className="xp-hero-main">
          <div className="xp-logo"><Image src={experience.image} alt={`${experience.company} logo`} fill className="object-cover" sizes="88px" /></div>
          <div className="xp-hero-copy">
            <span className="xp-kicker">{experience.company}</span>
            <h1 className="xp-title">{experience.title}</h1>
            <div className="xp-meta">
              <Sticker color="yellow" className="xp-period">{experience.period}</Sticker>
              {isCurrent && <Sticker color="green" className="xp-now">now ✦</Sticker>}
              <span className="xp-place"><MapPin size={14} aria-hidden="true" />{experience.location}</span>
            </div>
          </div>
        </div>
        {links.length > 0 && <div className="xp-actions">
          {links.map(({ href, label, Icon }, index) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={index === 0 ? 'studio-button xp-primary' : 'rk-btn'}>
            {index === 0 ? <><span className="button-icon"><Icon size={18} aria-hidden="true" /></span><span>{label}</span></> : <><Icon size={15} aria-hidden="true" />{label}</>}
          </a>)}
        </div>}
      </header>

      <div className="xp-grid">
        <div className="xp-col">
          <section className="xp-card" aria-label="Highlights">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-cyan" aria-hidden="true"><Sparkles size={15} /></span>Highlights</h2>
            <ol className="xp-points">
              {experience.description.map((line, index) => <li key={line}><span className="xp-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{line}</span></li>)}
            </ol>
          </section>

          <section className="xp-card" aria-label="Technologies">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-yellow" aria-hidden="true"><Code2 size={15} /></span>Technologies</h2>
            <div className="rk-chips xp-chips">{experience.technologies.map((tech) => <kbd key={tech}>{tech}</kbd>)}</div>
          </section>

          {experience.content && <section className="xp-card" aria-label="About this work">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-pink" aria-hidden="true"><BookOpen size={15} /></span>About this work</h2>
            <div className="xp-prose">{experience.content}</div>
          </section>}
        </div>

        <div className="xp-col">
          {docs.length > 0 && <section className="xp-card xp-docs" aria-label="Documents">
            <div className="xp-docs-head">
              <h2 className="xp-card-title"><span className="xp-tile xp-tone-green" aria-hidden="true"><FileBadge2 size={15} /></span>Documents</h2>
              {activeDoc && <a href={activeDoc.url} target="_blank" rel="noopener noreferrer" className="rk-btn xp-open">Open original <ExternalLink size={14} aria-hidden="true" /></a>}
            </div>

            {docs.length > 1 && <div className="xp-segment" role="tablist" aria-label="Choose a document">
              {docs.map((doc) => {
                const isActive = doc.key === activeDocKey
                const Icon = doc.icon
                return <button key={doc.key} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveDocKey(doc.key)} className={isActive ? 'is-active' : ''}>
                  <Icon size={14} aria-hidden="true" />{doc.label}
                </button>
              })}
            </div>}

            <div className="xp-window">
              <div className="xp-window-bar"><i /><i /><i /><span>{activeDoc?.label ?? 'Document'}</span></div>
              {activeDoc && activeDoc.url.includes('drive.google.com') ? (
                <iframe key={activeDoc.key} src={toPreviewUrl(activeDoc.url)} title={activeDoc.label} loading="lazy" allow="fullscreen" />
              ) : (
                <div className="xp-window-empty">
                  <FileText size={28} aria-hidden="true" />
                  <strong>This document can’t be previewed here</strong>
                  <p>Its host doesn’t allow embedding. Open the original to view it.</p>
                  {activeDoc && <a href={activeDoc.url} target="_blank" rel="noopener noreferrer" className="rk-btn">Open {activeDoc.label} <ExternalLink size={14} aria-hidden="true" /></a>}
                </div>
              )}
            </div>
          </section>}

          <section className="xp-card" aria-label="More experience">
            <h2 className="xp-card-title"><span className="xp-tile xp-tone-cyan" aria-hidden="true"><Briefcase size={15} /></span>More experience</h2>
            <div className="xp-related">
              {relatedExperiences.map((item, index) => <Link key={item.slug} href={`/experience/${item.slug}`} className="xp-related-item">
                <span className="xp-related-logo"><Image src={item.image} alt="" fill className="object-cover" sizes="40px" /></span>
                <span className="xp-related-copy"><strong>{item.company}</strong><small>{item.title} · {item.period}</small></span>
                <span className={`xp-related-go xp-tone-${tones[index % 4]}`} aria-hidden="true"><ArrowUpRight size={14} /></span>
              </Link>)}
            </div>
          </section>
        </div>
      </div>
    </div>
    </IconContext.Provider>
  )
}
