'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/toast/use-toast'

const COLORS = ['orange', 'emerald', 'blue', 'pink', 'purple', 'amber']

const EMOJIS = ['🚀', '💫', '✨', '🌟', '💡', '🎉', '🎨', '🎭', '🎪', '🎢']

export default function NoteForm() {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emoji, setEmoji] = useState(EMOJIS[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          name: name || null,
          email: email || null,
          emoji,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        })
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to save your note.')
      }

      setText('')
      setName('')
      setEmail('')
      setEmoji(EMOJIS[0])

      toast({
        title: "Note dropped successfully! 🎉",
        description: "Your note has been added to the wall.",
      })
      window.dispatchEvent(new Event('refresh-notes'))
    } catch (error) {
      console.warn('Error connecting to notes database:', error)
      toast({
        title: "Note submission unavailable",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onSubmit={handleSubmit}
      className="surface-card rounded-2xl p-5 sm:p-6"
    >
      <div className="mb-4">
        <textarea
          aria-label="Your note"
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a note..."
          className="input-surface w-full resize-none p-3 transition-all duration-300"
          required
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          aria-label="Your name (optional)"
          autoComplete="name"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="input-surface p-2.5 outline-none transition-all"
        />
        <input
          type="email"
          aria-label="Your email (kept private)"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (optional)"
          className="input-surface p-2.5 outline-none transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {EMOJIS.map((e) => (
            <button
              aria-label={`Choose ${e} emoji`}
              aria-pressed={emoji === e}
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                emoji === e
                  ? 'bg-accent/20 border border-accent/40'
                  : 'hover:bg-accent/10 border border-transparent'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="studio-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Dropping note...' : 'Drop Note'} {emoji}
        </button>
      </div>
    </motion.form>
  )
}

