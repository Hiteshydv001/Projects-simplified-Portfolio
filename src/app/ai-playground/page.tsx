import type { Metadata } from 'next'
import { StudioHeading, Sticker } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import Playground from './_components/Playground'
import Pictionary from './_components/Pictionary'

export const metadata: Metadata = { title: 'AI lab', description: 'Interactive transformer attention, embedding, and vision experiments.' }
export default function AIPlaygroundPage() {
  return <div className="studio-page"><Reveal><StudioHeading note="inside the machine">AI lab</StudioHeading><p className="mb-12 max-w-2xl">Explore how transformers process text. Follow attention patterns, inspect embeddings, or draw something for the vision model.</p></Reveal><Reveal><Playground /></Reveal><Reveal className="mt-20"><Sticker color="pink">A drawing experiment</Sticker><h2 className="mt-5 mb-4 text-4xl">Vision Pictionary.</h2><p className="mb-8 text-muted-foreground">Draw a shape and let Gemini Vision try to identify it. Bold, clear strokes work best.</p><SelectionPanel /></Reveal></div>
}

function SelectionPanel() { return <div className="surface-card p-5 sm:p-8"><Pictionary /></div> }
