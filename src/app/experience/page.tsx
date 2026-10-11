import type { Metadata } from 'next'
import { StudioExperience } from '@/components/studio/experience'

export const metadata: Metadata = { title: 'Experience', description: 'Engineering roles, internships, and open-source work by Hitesh Kumar.' }
export default function ExperiencePage() { return <StudioExperience /> }
