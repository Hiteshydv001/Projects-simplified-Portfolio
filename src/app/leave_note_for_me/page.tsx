import type { Metadata } from 'next'
import { StudioHeading } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import NoteForm from '@/components/blocks/note-wall/note-form'
import NoteWall from '@/components/blocks/note-wall/note-wall'

export const metadata: Metadata = { title: 'Notes', description: 'Leave a thought, a question, or a hello on Hitesh’s public note wall.' }
export default function LeaveNoteForMe() {
  return <div className="studio-page"><Reveal><StudioHeading note="a little corner for your thoughts">Notes</StudioHeading><p className="mb-10 max-w-xl">A thought, a question, or just hello. Your note will appear publicly here; your email stays private.</p></Reveal><Reveal className="mb-16"><NoteForm /></Reveal><NoteWall /></div>
}
