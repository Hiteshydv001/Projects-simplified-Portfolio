import type { Metadata } from 'next'
import { StudioPlayground } from '@/components/studio/playground'

export const metadata: Metadata = { title: 'R&D Lab', description: 'Prototypes, research, side projects and interactive AI tools by Hitesh Kumar.' }
export default function PlaygroundPage() { return <StudioPlayground /> }
