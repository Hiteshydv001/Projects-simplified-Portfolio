import type { Metadata } from 'next'
import { papers } from './_data/papers'
import { StudioHeading } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import { ArchiveCard } from '@/components/studio/archive-card'

export const metadata: Metadata = { title: 'Paper notes', description: 'Rebuilding machine learning research papers, with notes from the implementation.' }
export default function PaperListing() {
  return <div className="studio-page"><Reveal><StudioHeading note="read it. build it. understand it.">Paper notes</StudioHeading></Reveal><div className="work-grid">{papers.map(paper => <Reveal key={paper.id}><ArchiveCard href={`/paper-implementations/${paper.slug}`} title={paper.title} description={paper.description} image="/paper-implementations/autograd-logic/dag.png" alt="A computation graph from the implementation notebook" meta={paper.publishedAt} tags={paper.tags} contain /></Reveal>)}</div></div>
}
