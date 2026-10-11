import type { Metadata } from 'next'
import { StudioContact } from '@/components/studio/contact'

export const metadata: Metadata = { title: 'Contact', description: 'Talk to Hitesh about AI engineering, collaboration, or your next project.' }
export default function ContactPage() { return <StudioContact /> }
