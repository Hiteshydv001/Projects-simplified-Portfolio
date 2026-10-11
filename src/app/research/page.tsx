import type { Metadata } from 'next'
import { researchPapers } from './_data/papers'
import { StudioHeading } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import { ArchiveCard } from '@/components/studio/archive-card'

export const metadata: Metadata = { title: 'Research', description: 'Applied machine learning research by Hitesh Kumar.' }
export default function ResearchPage() {
  return <div className="studio-page"><Reveal><StudioHeading note="questions worth exploring">Research</StudioHeading></Reveal><div className="work-grid">{Object.values(researchPapers).map(paper => <Reveal key={paper.id}><ArchiveCard href={`/research/${paper.id}`} title={paper.title} description={paper.shortDescription} image={paper.image} alt={paper.imageAlt} meta={paper.year} tags={[paper.conference]} /></Reveal>)}</div></div>
}
