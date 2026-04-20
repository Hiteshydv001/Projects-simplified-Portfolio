'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BaseContainer from '@/components/layout/container/base-container'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Ruler from '@/components/ui/ruler/ruler'
import { ArticlesQuickNav } from '@/components/blocks/table-of-contents/articles-quick-nav'

interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  emoji: string;
  createdAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <BaseContainer size="lg" paddingX="md" paddingY="lg">
      <div className="flex items-center justify-between mb-8">
        <DynamicBreadcrumb 
          items={[
            { href: '/', label: 'Home', emoji: '👾' },
            { label: 'Articles' }
          ]}
        />
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <TextHeading as="h1" className="text-4xl md:text-5xl font-bold mb-4">
          Articles
        </TextHeading>
        <Text variant="muted" className="text-lg">
          Thoughts on AI, machine learning, and building systems.
        </Text>
      </motion.div>

      <Ruler marginBottom="lg" />

      {!loading && articles.length > 0 && <ArticlesQuickNav articles={articles} />}

      {loading ? (
        <div className="py-20 text-center text-muted-foreground">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No articles yet. Check back later!</div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article, index) => (
            <Link 
              key={article._id}
              href={`/articles/${article.slug}`}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="relative overflow-hidden rounded-lg border border-border/40 bg-transparent p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{article.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <Text className="text-xl font-semibold group-hover:text-accent transition-colors">
                        {article.title}
                      </Text>
                      <Text variant="caption" className="text-muted-foreground">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Text>
                    </div>
                    <Text variant="caption" className="text-accent/80 font-medium mb-3">
                      {article.category}
                    </Text>
                    <Text variant="caption" className="text-muted-foreground leading-relaxed">
                      {article.description}
                    </Text>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </BaseContainer>
  )
}
