import type { Metadata } from 'next'
import { StudioPlayground } from '@/components/studio/playground'

export const metadata: Metadata = { title: 'Experiments', description: 'Experiments, side projects, and interactive AI tools by Hitesh Kumar.' }
export default function PlaygroundPage() { return <StudioPlayground /> }
