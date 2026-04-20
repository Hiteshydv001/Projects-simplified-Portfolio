'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils/utils'

interface ArticleLinkItem {
  _id: string
  title: string
  slug: string
}

interface ArticlesQuickNavProps {
  articles: ArticleLinkItem[]
}

export function ArticlesQuickNav({ articles }: ArticlesQuickNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const renderNav = () => (
    <nav className="space-y-2">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Articles Index
      </p>
      <div className="space-y-1">
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug}`}
            className={cn(
              'block rounded-xl px-3 py-2 text-sm text-primary font-medium transition-all duration-200',
              'hover:text-primary/80 hover:bg-primary/10'
            )}
          >
            {article.title}
          </Link>
        ))}
      </div>
    </nav>
  )

  return (
    <>
      <div className="hidden xl:block fixed right-8 top-28 w-72 max-h-[calc(100vh-10rem)]">
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide rounded-2xl border border-border/30 bg-background/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-4">
          {renderNav()}
        </div>
      </div>

      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 z-40 rounded-full border border-border/40 bg-background/80 px-4 py-2 text-xs font-semibold tracking-wide text-foreground shadow-lg backdrop-blur-md"
        >
          {isOpen ? 'Close' : 'Index'}
        </button>

        {isOpen && (
          <div className="fixed inset-x-4 bottom-20 z-40 max-h-[60vh] overflow-y-auto scrollbar-hide rounded-2xl border border-border/30 bg-background/90 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4">
            {renderNav()}
          </div>
        )}
      </div>
    </>
  )
}
