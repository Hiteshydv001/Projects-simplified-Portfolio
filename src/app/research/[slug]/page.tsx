import { notFound } from 'next/navigation'
import { researchPapers } from '../_data/papers'
import { StudioStory } from '@/components/studio/story'

export default async function ResearchPaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const paper = researchPapers[slug as keyof typeof researchPapers]
  if (!paper) notFound()
  return <StudioStory title={paper.title} intro={paper.shortDescription} meta={`Research · ${paper.year}`} image={{ src: paper.image, alt: paper.imageAlt }} notes={[{ label: 'Published at', value: paper.conference, color: 'cyan' }, { label: 'Core model', value: paper.model, color: 'yellow' }, { label: 'Key result', value: 'accuracy' in paper ? paper.accuracy : paper.status, color: 'green' }, { label: 'Area', value: 'domain' in paper ? paper.domain : 'Predictive machine learning', color: 'pink' }]} tags={['Machine Learning', paper.year]} links={'doi' in paper ? [{ href: paper.doi, label: 'IEEE publication' }] : []} back={{ href: '/research', label: 'Research' }} sections={[{ id: 'context', label: 'Context', title: 'The question we started with.', paragraphs: [paper.overview] }, { id: 'approach', label: 'Approach', title: 'What we built.', paragraphs: [paper.contribution, `Inputs: ${paper.features}`] }, { id: 'impact', label: 'Impact', title: 'Why it matters.', items: paper.impact }, { id: 'conclusion', label: 'Takeaway', title: 'What the research shows.', paragraphs: [paper.conclusion, ...('authors' in paper ? [`Authors: ${paper.authors}`] : [])] }]} />
}
