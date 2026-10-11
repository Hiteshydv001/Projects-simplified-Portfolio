import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return <section className="mx-auto max-w-3xl px-5 py-20 sm:py-28"><div className="page-hero"><p className="page-eyebrow mb-5">404</p><h1 className="mb-5 text-3xl sm:text-4xl">Page not found</h1><p className="mb-8 max-w-md text-muted-foreground">This page may have moved, or the link might be a little out of date. There’s still plenty to explore.</p><div className="flex flex-wrap gap-3"><Link href="/" className="action-primary"><ArrowLeft size={16} /> Back home</Link><Link href="/projects" className="action-secondary">Explore projects <ArrowUpRight size={16} /></Link></div></div></section>
}
