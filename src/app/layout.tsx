import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { Analytics } from "@vercel/analytics/react"
import { monoFont, sansFont, displayFont, handwritingFont } from '@/styles/fonts/fonts'
import ToasterProvider from '@/components/ui/toast/toaster-provider'
import { StudioNavbar, StudioFooter } from '@/components/studio/chrome'
import { PortfolioCursor } from '@/components/studio/selection-cursor'
import { MotionProvider } from '@/components/layout/motion-provider'
import { TrafficTracker } from '@/components/layout/traffic-tracker'
import { PortfolioAssistant } from '@/components/studio/assistant-pet'
import { experiences } from '@/app/experience/_data/experiences'
import { majorProjects } from '@/app/projects/_data/projects-data'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'

// Send only labels and destinations to the navbar, not the full content datasets.
const navigationSections = {
  '/': [{ label: 'Introduction', href: '/#top' }, { label: 'Featured work', href: '/#featured-work' }, { label: 'Experiments', href: '/#experiments' }],
  '/about': [{ label: 'Bio', href: '/about#bio' }, { label: 'Education', href: '/about#education' }, ...experiences.slice(0, 5).map(item => ({ label: item.company, href: `/experience/${item.slug}` })), { label: 'All experience', href: '/experience' }, { label: 'Resume', href: '/resume' }],
  '/case-study': [...majorProjects.map(item => ({ label: item.title, href: `/case-study/${item.title.toLowerCase().replace(/\s+/g, '-')}` })), { label: 'All projects', href: '/case-study' }],
  '/certificates': [...technicalCertificates, ...nonTechnicalCertificates].map(item => ({ label: item.title, href: `/certificates/${item.slug}` })),
  '/play-ground': [{ label: 'AI lab', href: '/ai-playground' }, { label: 'Paper implementations', href: '/paper-implementations' }, { label: 'Research', href: '/research' }, { label: 'Patents', href: '/patents' }, { label: 'Leave a note', href: '/leave_note_for_me' }],
  '/articles': [{ label: 'All articles', href: '/articles' }],
  '/analytics': [{ label: 'Visitors & page views', href: '/analytics#traffic' }, { label: 'GitHub contributions', href: '/analytics#github-contributions' }],
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    || process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Hitesh Kumar | AI & Machine Learning Engineer', template: '%s | Hitesh Kumar' },
  description: 'Portfolio of Hitesh Kumar, an AI and Machine Learning engineer building production-ready RAG, agentic AI, full-stack, and data systems.',
  keywords: ['Hitesh Kumar', 'AI engineer', 'machine learning engineer', 'RAG developer', 'LLM agents', 'Python developer', 'portfolio'],
  authors: [{ name: 'Hitesh Kumar' }],
  creator: 'Hitesh Kumar',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { type: 'website', url: '/', title: 'Hitesh Kumar | AI & Machine Learning Engineer', description: 'Projects, research, and experience in AI, ML, RAG, and full-stack systems.', siteName: 'Hitesh Kumar' },
  twitter: { card: 'summary_large_image', title: 'Hitesh Kumar | AI & Machine Learning Engineer', description: 'Projects, research, and experience in AI, ML, RAG, and full-stack systems.' },
}

const gaId = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || '') ? process.env.NEXT_PUBLIC_GA_ID : undefined

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html id="top" lang="en" className={cn(
      "h-full",
      monoFont.variable,
      displayFont.variable,
      sansFont.variable,
      handwritingFont.variable
    )} suppressHydrationWarning>
      <body className={cn(
        "studio-body"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storageKey="hitesh-studio-theme-v2"
          enableSystem={false}
          disableTransitionOnChange
        >
          {gaId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });`}
              </Script>
            </>
          )}
          <MotionProvider>
          <PortfolioAssistant>
          <TrafficTracker />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <StudioNavbar sections={navigationSections} />
          <PortfolioCursor />
          <Script id="person-schema" type="application/ld+json" strategy="beforeInteractive">
            {JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Hitesh Kumar', url: siteUrl, jobTitle: 'AI & Machine Learning Engineer', description: 'AI and Machine Learning engineer specializing in RAG systems, LLM agents, machine learning, and full-stack applications.', sameAs: ['https://github.com/Hiteshydv001', 'https://www.linkedin.com/in/hitesh-kumar-7b8a1b1b0/'] }).replace(/</g, '\u003c')}
          </Script>
          <div className="flex flex-col min-h-screen relative">
            <div className="flex-1 flex flex-col">
              <main id="main-content" tabIndex={-1} className="mx-auto w-full flex-1">
                {children}
                <Analytics />
              </main>
            </div>
          </div>
          <ToasterProvider />
          <StudioFooter />
          </PortfolioAssistant>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

