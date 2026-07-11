'use client'

import { useEffect } from 'react'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from '@/components/ui/primitives/breadcrumb'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import { motion } from 'framer-motion'

const resumeDownloadUrl = '/api/resume?download=1'
const embeddedResumeUrl = '/api/resume#toolbar=0&navpanes=0&scrollbar=1'

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg" className="page-shell">
      <StackVertical gap="lg">
        <div className="page-toolbar">
          <DynamicBreadcrumb
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'Resume' }
            ]}
          />
          <ThemeToggle />
        </div>

        <div className="page-hero text-center">
          <Text className="page-eyebrow mb-3">Professional profile</Text>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TextHeading as="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold">
              Resume
            </TextHeading>
          </motion.div>
          <Text variant="muted" className="mx-auto mt-3 max-w-xl">
            A concise overview of my AI, machine learning, and full-stack engineering work. Preview it here or keep a copy for later.
          </Text>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={resumeDownloadUrl}
            download
            className="unstyled inline-flex items-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Download PDF
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="surface-card overflow-hidden rounded-2xl"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/20 bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
              <div className="h-3 w-3 rounded-full bg-amber-400/70"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-400/70"></div>
            </div>
            <Text variant="caption" className="text-muted-foreground">
              CV_Hitesh_Kumar.pdf
            </Text>
            <div className="w-12" />
          </div>
          <iframe
            src={embeddedResumeUrl}
            title="Resume PDF"
            className="w-full h-[75vh] bg-white"
          />
        </motion.div>
      </StackVertical>
    </BaseContainer>
  )
}
