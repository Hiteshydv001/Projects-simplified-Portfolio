import type { Metadata } from 'next'
import { WorkGallery } from '@/components/studio/work-gallery'

export const metadata: Metadata = { title: 'Projects', description: 'AI, machine learning, and full-stack projects by Hitesh Kumar.' }
export default function ProjectsPage() { return <WorkGallery /> }
