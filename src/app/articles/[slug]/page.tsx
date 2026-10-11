'use client'

import { use, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxComponents } from '@/lib/mdx/mdx-components'
import { TableOfContents } from '@/components/blocks/table-of-contents/table-of-contents'
import { Reveal } from '@/components/studio/motion'
import { Sticker } from '@/components/studio/primitives'

interface Article { title: string; slug: string; emoji: string; category: string; content: string; description: string; createdAt: string }
export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [article, setArticle] = useState<Article | null>(null)
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(false); setArticle(null); setSource(null)
    const load = async () => {
      try {
        const response = await fetch(`/api/articles/${encodeURIComponent(slug)}`, { signal: controller.signal })
        if (response.status === 404) return
        if (!response.ok) throw new Error('Unavailable')
        const data: { article: Article; source: MDXRemoteSerializeResult } = await response.json()
        if (!data.article || typeof data.source?.compiledSource !== 'string') throw new Error('Unavailable')
        if (!controller.signal.aborted) { setArticle(data.article); setSource(data.source) }
      } catch { if (!controller.signal.aborted) setError(true) }
      finally { if (!controller.signal.aborted) setLoading(false) }
    }
    load()
    return () => controller.abort()
  }, [slug, attempt])
  if (loading) return <div className="studio-page py-20" role="status">Opening this article…</div>
  if (error) return <div className="studio-page"><h1 className="case-title">This article couldn’t load.</h1><p className="my-6">Please try again in a moment.</p><div className="flex gap-6"><button className="small-link" onClick={() => setAttempt(value => value + 1)}>Try again ↻</button><Link className="small-link" href="/articles">Back to notebook</Link></div></div>
  if (!article) notFound()
  return <article className="studio-page"><Link href="/articles" className="small-link mb-12">← Articles</Link><Reveal className="case-header"><div><span className="text-4xl">{article.emoji}</span><h1 className="case-title mt-6">{article.title}</h1><p className="case-summary">{article.description}</p></div><aside className="case-notes"><Sticker color="cyan"><strong>Filed under</strong>{article.category}</Sticker><Sticker color="yellow"><strong>Published</strong>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Sticker></aside></Reveal><TableOfContents contentId="article-content" /><div id="article-content" className="paper-prose prose dark:prose-invert max-w-none">{source && <MDXRemote {...source} components={mdxComponents} />}</div><Link href="/articles" className="small-link">← All articles</Link></article>
}
