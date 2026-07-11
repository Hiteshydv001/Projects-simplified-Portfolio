import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { Analytics } from "@vercel/analytics/react"
import { monoFont, sansFont } from '@/styles/fonts/fonts'
import { PaperBackground } from '@/components/ui/paper-background/paper-background'
import ToasterProvider from '@/components/ui/toast/toaster-provider'
import { AssistantWidget } from '@/components/blocks/assistant/assistant-widget'

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

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(
      "h-full",
      monoFont.variable,
      sansFont.variable
    )} suppressHydrationWarning>
      <body className={cn(
        "h-full bg-transparent transition-colors duration-300 overflow-x-hidden"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
          <PaperBackground />
          <Script id="person-schema" type="application/ld+json" strategy="beforeInteractive">
            {JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Hitesh Kumar', url: siteUrl, jobTitle: 'AI & Machine Learning Engineer', description: 'AI and Machine Learning engineer specializing in RAG systems, LLM agents, machine learning, and full-stack applications.', sameAs: ['https://github.com/Hiteshydv001', 'https://www.linkedin.com/in/hiteshkumar'] })}
          </Script>
          <div className="flex flex-col min-h-screen relative">
            <div className="flex-1 flex flex-col">
              <main className="container mx-auto mt-4 px-4 flex-1">
                {children}
                <Analytics />
              </main>
            </div>
          </div>
          <ToasterProvider />
          <AssistantWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

