import type { Metadata } from 'next'
import { StudioAbout } from '@/components/studio/about'

export const metadata: Metadata = { title: 'About', description: 'A little about Hitesh Kumar, his approach to AI engineering, and the journey so far.' }
export default function About() { return <StudioAbout /> }
