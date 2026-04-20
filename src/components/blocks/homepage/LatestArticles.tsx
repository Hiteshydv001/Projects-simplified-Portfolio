'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'

type Article = {
  _id: string
  title: string
  slug: string
  description: string
  emoji: string
  createdAt: string
}

const isArticleArray = (value: unknown): value is Article[] => Array.isArray(value)

export function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    let isMounted = true

    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles')
        if (!res.ok) return

        const data: unknown = await res.json()
        if (isMounted && isArticleArray(data)) {
          setArticles(data.slice(0, 2))
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchArticles()
    return () => {
      isMounted = false
    }
  }, [])

  if (articles.length === 0) return null

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl">
          Latest Articles
        </TextHeading>
        <Link href="/articles" className="text-sm text-primary hover:underline font-medium">
          View all →
        </Link>
      </div>

      <div className="grid gap-4">
        {articles.map((article, index) => (
          <Link 
            key={article._id}
            href={`/articles/${article.slug}`}
            className="group block"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/20 bg-transparent backdrop-blur-[2px] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-2xl border border-accent/10">
                {article.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <Text className="font-semibold truncate group-hover:text-accent transition-colors">
                  {article.title}
                </Text>
                <Text variant="caption" className="text-muted-foreground line-clamp-1">
                  {article.description}
                </Text>
              </div>
              <div className="hidden sm:block text-right">
                <Text variant="caption" className="text-muted-foreground whitespace-nowrap opacity-60">
                    {new Date(article.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
