'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileBadge2 } from 'lucide-react'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/accordion'
import { experiences } from '@/app/experience/_data/experiences'
import { cn } from '@/lib/utils/utils'

const TECH_ICONS: Record<string, string> = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Python (Programming Language)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Selenium": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  "Playwright": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  "Streamlit": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg",
  "Solidity": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  "Ethereum": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
  "Kaggle": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg",
  "WordPress Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  "WordPress CMS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  "WordPress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  "Machine Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "Deep Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "Artificial Intelligence": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Artificial Intelligence (AI)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "AI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Blockchain": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
  "Web3.py": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
  "Smart Contracts": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  "Ganache": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
}

function buildLinks(exp: typeof experiences[number]) {
  const links = [] as { label: string; href: string }[]

  if (exp.companyUrl) links.push({ label: 'Company', href: exp.companyUrl })
  if (exp.githubUrl) links.push({ label: 'GitHub', href: exp.githubUrl })
  if (exp.deploymentUrl) links.push({ label: 'Live Demo', href: exp.deploymentUrl })
  if (exp.frenchWebsiteUrl) links.push({ label: 'French Site', href: exp.frenchWebsiteUrl })

  return links
}

interface ExperienceSectionProps {
  showViewAllButton?: boolean
}

export function ExperienceSection({ showViewAllButton = true }: ExperienceSectionProps) {
  const experiencesToShow = showViewAllButton ? experiences.slice(0, 4) : experiences

  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <Text variant="muted" size="xs" className="uppercase tracking-[0.4em]">
          {showViewAllButton ? 'Featured' : 'All'}
        </Text>
        <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl !text-foreground dark:!text-white">
          Experience
        </TextHeading>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {experiencesToShow.map((exp) => {
          const links = buildLinks(exp)
          const isCurrent = exp.period.toLowerCase().includes('present')

          return (
            <AccordionItem
              key={exp.slug}
              value={exp.slug}
              className="surface-card rounded-2xl px-4 sm:px-6"
            >
              <AccordionTrigger className="py-5 no-underline hover:no-underline">
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/40 bg-muted/20">
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <Text size="sm" className="font-semibold text-foreground dark:text-white">{exp.title}</Text>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <span>Currently</span>
                              <span>Working</span>
                              <span>Here</span>
                            </span>
                          </span>
                        )}
                      </div>
                      <Text size="sm" className="text-slate-700 dark:text-slate-300">
                        {exp.company}
                      </Text>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <Text size="sm" className="font-medium text-foreground dark:text-white">
                      {exp.period}
                    </Text>
                    <Text size="sm" className="text-slate-700 dark:text-slate-300">
                      {exp.location}
                    </Text>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {exp.description.map((item) => (
                          <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {exp.content && (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                          {exp.content}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Text size="sm" className="font-semibold">
                          Technologies & Tools
                        </Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={cn(
                                'inline-flex items-center gap-1.5 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/15 hover:border-black/20 dark:hover:border-white/25 transition-all'
                              )}
                            >
                              {TECH_ICONS[tech] && (
                                <img
                                  src={TECH_ICONS[tech]}
                                  alt={tech}
                                  className="w-3.5 h-3.5 object-contain"
                                />
                              )}
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {(exp.certificateUrl || exp.additionalCertificateUrl || exp.lorUrl) && (
                        <div>
                          <Text size="sm" className="font-semibold">
                            Certificates & Documents
                          </Text>
                          <div className="mt-2 rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-3 py-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <p className="text-xs text-cyan-300/90 flex items-center gap-1.5">
                                  <FileBadge2 className="h-3.5 w-3.5" />
                                  Full document previews available
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Certificate, Offer Letter, LOR sab dedicated page pe full-screen style me.
                                </p>
                              </div>
                              <Link
                                href={`/experience/${exp.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                              >
                                Open
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <Link
                          href={`/experience/${exp.slug}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/35 transition-colors"
                        >
                          View Experience Page
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      {links.length > 0 && (
                        <div>
                          <Text size="sm" className="font-semibold">
                            Links
                          </Text>
                          <div className="mt-2 flex flex-col gap-2 text-sm">
                            {links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:text-accent/80 transition-colors"
                              >
                                {link.label} →
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {showViewAllButton && (
        <div className="mt-6 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 hover:bg-accent text-accent-foreground transition-colors text-sm font-medium hover:shadow-sm"
          >
            Show all work experiences
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}
