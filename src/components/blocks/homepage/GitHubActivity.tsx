'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { useTheme } from 'next-themes'
import { memo } from 'react'

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse flex flex-col items-center gap-4 w-full">
        <div className="h-[120px] w-full bg-muted/20 rounded-lg"></div>
        <div className="h-4 w-32 bg-muted/20 rounded"></div>
      </div>
    )
  }
)

const GitHubActivity = () => {
  const { theme } = useTheme()
  const username = 'Hiteshydv001'

  // Theme-aware colors to match site palette
  const themeColors = {
    light: ['#ebedf0', '#fbbf24', '#f59e0b', '#d97706', '#b45309'], // Amber/Orange shades
    dark: ['#1e293b', '#451a03', '#92400e', '#d97706', '#f59e0b'] // Darker to lighter amber
  }

  return (
    <div className="py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div className="space-y-1">
          <Text variant="caption" className="text-accent font-medium tracking-[0.24em] uppercase mb-1">
            Activity
          </Text>
          <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl">
            GitHub Contributions
          </TextHeading>
          <Text variant="muted" size="sm" className="max-w-xl">
            A rolling 12-month snapshot of coding consistency and open-source momentum.
          </Text>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <Text variant="caption" className="font-semibold text-foreground">
            Username <span className="text-accent">@{username}</span>
          </Text>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border/30 bg-background/25 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-20 right-8 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mb-4 flex items-center justify-between gap-3">
          <Text variant="caption" className="text-muted-foreground uppercase tracking-[0.2em]">
            Last 12 months
          </Text>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent transition-colors hover:bg-accent/20"
          >
            Open profile
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="relative w-full overflow-x-auto scrollbar-hide py-2 px-1 sm:px-0 translate-x-1 sm:translate-x-0">
          <GitHubCalendar
            username={username}
            blockSize={11}
            blockMargin={4}
            fontSize={12}
            theme={themeColors}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            style={{
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                margin: '0 auto'
            }}
          />
        </div>
      </motion.div>
      
        <div className="mt-4 flex justify-end">
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5 group font-mono"
        >
          View full profile
          <svg 
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default memo(GitHubActivity)
