'use client'

import { useEffect, useState } from 'react'
import { Tilt } from '@/components/studio/motion'

interface Note { _id: string; text: string; name?: string; emoji: string; color: string }
const colors: Record<string,string> = { orange: '#ffe1ad', emerald: '#cbefc8', blue: '#c4ecf5', pink: '#f8c3d9', purple: '#e2cef4', amber: '#ffeaaa' }
export default function NoteWall() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let controller: AbortController
    const fetchNotes = () => {
      controller?.abort(); controller = new AbortController()
      const signal = controller.signal
      setLoading(true); setError(false)
      fetch('/api/notes', { signal }).then(async response => {
        if (!response.ok) throw new Error('Unavailable')
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Unavailable')
        if (!signal.aborted) setNotes(data)
      }).catch(() => { if (!signal.aborted) setError(true) }).finally(() => { if (!signal.aborted) setLoading(false) })
    }
    fetchNotes()
    window.addEventListener('refresh-notes', fetchNotes)
    return () => { controller?.abort(); window.removeEventListener('refresh-notes', fetchNotes) }
  }, [attempt])
  if (loading) return <p role="status" className="py-12">Reading the wall…</p>
  if (error) return <div className="surface-card p-6 my-10" role="status"><p className="mb-4">The note wall is temporarily unavailable.</p><button className="small-link" onClick={() => setAttempt(value => value + 1)}>Try again ↻</button></div>
  if (!notes.length) return <p className="py-12">An empty wall, waiting for its first note.</p>
  return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">{notes.map((note,index) => <Tilt key={note._id} style={{ rotate: `${((index * 3.5) % 8) - 4}deg` }}><article className="public-note" style={{ background: colors[note.color] || colors.orange }}><span className="text-2xl">{note.emoji}</span><p>{note.text}</p>{note.name && <small>— {note.name}</small>}</article></Tilt>)}</div>
}
