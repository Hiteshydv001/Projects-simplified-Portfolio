import type { Metadata } from 'next'
import { patentSummaries } from '@/lib/content/patents'
import { StudioHeading } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import { ArchiveCard } from '@/components/studio/archive-card'

export const metadata: Metadata = { title: 'Patents', description: 'AI-powered inventions and patent applications by Hitesh Kumar.' }
export default function PatentsPage() {
  return <div className="studio-page"><Reveal><StudioHeading note="ideas beyond the screen">Patents</StudioHeading></Reveal><div className="work-grid">{patentSummaries.map(patent => <Reveal key={patent.id}><ArchiveCard href={`/patents/${patent.id}`} title={patent.title} description={patent.description} image={patent.image} alt={patent.alt} meta="Patent application filed" /></Reveal>)}</div></div>
}
