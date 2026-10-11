'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { StudioHeading } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import { ArrowUpRight } from 'lucide-react'

interface Article { _id: string; title: string; slug: string; description: string; category: string; emoji: string; createdAt: string }
export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(false)
    fetch('/api/articles', { signal: controller.signal }).then(async res => {
      if (!res.ok) throw new Error('Unavailable')
      const data = await res.json()
      if (!Array.isArray(data)) throw new Error('Unavailable')
      if (!controller.signal.aborted) setArticles(data)
    }).catch(() => { if (!controller.signal.aborted) setError(true) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [attempt])
  const results = articles.filter(article => `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="studio-page"><Reveal><StudioHeading note="thinking out loud">Articles</StudioHeading><p className="mb-12 max-w-xl">Thoughts on AI, machine learning, and the small things you discover while building systems.</p></Reveal>{articles.length > 0 && <input type="search" className="input-surface p-3 w-full mb-10" aria-label="Search articles" placeholder="Search articles…" value={query} onChange={event => setQuery(event.target.value)} />}{loading ? <p role="status" className="py-16">Loading articles…</p> : error ? <div className="surface-card p-8"><h2 className="text-2xl mb-3">Articles are temporarily unavailable.</h2><p className="mb-6">Articles couldn’t load. The implementation notes are still available.</p><div className="flex flex-wrap gap-6"><button className="small-link" onClick={() => setAttempt(value => value + 1)}>Try again ↻</button><Link className="small-link" href="/paper-implementations">Explore paper notes <ArrowUpRight size={16} /></Link></div></div> : !results.length ? <p className="py-16">{query ? 'No articles match this search.' : 'A little quiet here. New ideas will appear soon.'}</p> : <div className="grid md:grid-cols-2 gap-10">{results.map(article => <Reveal key={article._id}><Link href={`/articles/${article.slug}`} className="surface-card block p-8 h-full"><span className="text-4xl">{article.emoji}</span><div className="flex justify-between gap-4 my-6 project-date"><span>{article.category}</span><time>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</time></div><h2 className="text-3xl tracking-tight leading-tight mb-5">{article.title} <ArrowUpRight size={23} className="inline" /></h2><p className="text-muted-foreground">{article.description}</p></Link></Reveal>)}</div>}</div>
}
