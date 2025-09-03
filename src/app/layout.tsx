import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils/utils'
import { Analytics } from "@vercel/analytics/react"
import { monoFont, sansFont } from '@/styles/fonts/fonts'
import { PaperBackground } from '@/components/ui/paper-background/paper-background'
import ToasterProvider from '@/components/ui/toast/toaster-provider'
import { AssistantWidget } from '@/components/blocks/assistant/assistant-widget'

export const metadata: Metadata = {
  title: 'Hitesh',
  description: 'Welcome to my personal portfolio where I share my projects, thoughts, and learning journey',
}

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
        "h-full bg-background transition-colors duration-300 overflow-x-hidden"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PaperBackground />
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

