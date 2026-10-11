import { notFound } from 'next/navigation'
import { patentDetails } from '@/lib/content/patent-details'
import { patentSummaries } from '@/lib/content/patents'
import { StudioStory } from '@/components/studio/story'

export default async function PatentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const patent = patentDetails[slug as keyof typeof patentDetails]
  const summary = patentSummaries.find(item => item.id === slug)
  if (!patent || !summary) notFound()
  return <StudioStory title={patent.title} intro={summary.description} meta={patent.status} image={{ src: summary.image, alt: summary.alt }} notes={[{ label: 'Status', value: patent.status, color: 'cyan' }, { label: 'Focus', value: slug === 'smart-pillow' ? 'Health & sleep monitoring' : slug === 'smart-earbud' ? 'Wearable AI assistant' : 'Autonomous deployment', color: 'yellow' }, { label: 'Contribution', value: 'Concept & invention', color: 'green' }, { label: 'Explore', value: 'Problem, system, and technology', color: 'pink' }]} back={{ href: '/patents', label: 'Patents' }} sections={[{ id: 'overview', label: 'Overview', title: 'The idea.', paragraphs: [patent.overview] }, { id: 'problem', label: 'Problem', title: patent.challenge.title, paragraphs: [patent.challenge.description], items: patent.challenge.points }, { id: 'solution', label: 'Solution', title: patent.solution.title, paragraphs: [patent.solution.description], features: patent.solution.features.map(feature => ({ title: feature.title, description: feature.description, items: 'subpoints' in feature ? feature.subpoints : [] })) }, { id: 'technology', label: 'Technology', title: patent.solution.techStack.title, paragraphs: [patent.solution.techStack.hardware, patent.solution.techStack.software] }]} />
}
