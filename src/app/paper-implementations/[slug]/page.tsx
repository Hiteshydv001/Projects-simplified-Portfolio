import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { papers } from '../_data/papers'
import { Reveal } from '@/components/studio/motion'
import { SelectionFrame, Sticker } from '@/components/studio/primitives'
import { ArrowUpRight } from 'lucide-react'

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const paper = papers.find(item => item.slug === slug)
  if (!paper) notFound()
  const source = await readFile(path.join(process.cwd(), 'src/app/paper-implementations/content/transformer-implementation.mdx'), 'utf8')
  return <article className="studio-page"><Link className="small-link mb-12" href="/paper-implementations">← Paper notes</Link><Reveal className="case-header"><div><span className="project-date">{paper.publishedAt}</span><h1 className="case-title">{paper.title}</h1><p className="case-summary">{paper.description}</p><div className="project-tags">{paper.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{paper.paperLink && <a href={paper.paperLink} className="small-link mt-7" target="_blank" rel="noopener noreferrer">Original research paper <ArrowUpRight size={16} /></a>}</div><aside className="case-notes"><Sticker color="cyan"><strong>Research</strong>{paper.authors.join(', ')}</Sticker><Sticker color="yellow"><strong>Focus</strong>Transformer architecture</Sticker><Sticker color="green"><strong>Built with</strong>PyTorch</Sticker><Sticker color="pink"><strong>Approach</strong>Learning by implementation</Sticker></aside></Reveal><Reveal><SelectionFrame color="ink"><div className="attention-diagram" aria-label="Transformer processing stages">{['Token embeddings', 'Multi-head attention', 'Feed-forward layers', 'Predictions'].map((stage,index) => <div key={stage}><span className="diagram-step">0{index+1}</span><strong>{stage}</strong>{index<3 && <span className="diagram-arrow" aria-hidden="true">→</span>}</div>)}</div></SelectionFrame></Reveal><div className="paper-prose prose dark:prose-invert max-w-none"><MDXRemote source={source.replace(/^# [^\n]*\r?\n/, '')} /></div></article>
}
