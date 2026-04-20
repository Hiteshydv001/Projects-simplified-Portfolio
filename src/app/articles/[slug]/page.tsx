'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import Ruler from '@/components/ui/ruler/ruler'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import { TableOfContents } from '@/components/blocks/table-of-contents/table-of-contents'

interface Article {
  title: string;
  emoji: string;
  category: string;
  content: string;
  createdAt: string;
}

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [article, setArticle] = useState<Article | null>(null)
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const fetchArticle = async () => {
      try {
        const res = await fetch('/api/articles')
        const articles = await res.json()
        const found = articles.find((a: any) => a.slug === resolvedParams.slug)
        
        if (found) {
          setArticle(found)
          const mdx = await serialize(found.content)
          setMdxSource(mdx)
        } else {
          setArticle(null)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <BaseContainer size="md" paddingX="md" paddingY="lg">
        <div className="py-20 text-center text-muted-foreground">Loading article...</div>
      </BaseContainer>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="lg">
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb 
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { href: '/articles', label: 'Articles' },
              { label: article.title }
            ]}
          />
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{article.emoji}</span>
            <TextHeading as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {article.title}
            </TextHeading>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent font-medium uppercase tracking-wider text-[10px]">
              {article.category}
            </span>
            <span>•</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </motion.div>

        <Ruler />

        <TableOfContents contentId="article-content" />

        <motion.article 
          id="article-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-stone dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-code:text-accent
            prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-black/5 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-border/40"
        >
          {mdxSource && <MDXRemote {...mdxSource} components={mdxComponents} />}
        </motion.article>

        <Ruler marginTop="xl" />

        <div className="flex justify-between items-center py-8">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to articles
            </Link>
        </div>
      </StackVertical>
    </BaseContainer>
  )
}
