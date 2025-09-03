'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/supabase'
import { useToast } from '@/components/ui/toast/use-toast'

const COLORS = [
  'bg-gradient-to-br from-yellow-100 to-orange-100',
  'bg-gradient-to-br from-green-100 to-emerald-100',
  'bg-gradient-to-br from-blue-100 to-cyan-100',
  'bg-gradient-to-br from-pink-100 to-rose-100',
  'bg-gradient-to-br from-purple-100 to-indigo-100',
  'bg-gradient-to-br from-orange-100 to-amber-100'
]

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
      const { error } = await supabase.from('notes').insert({
        text,
        name: name || null,
        email: email || null,
        emoji,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      })

      if (error) throw error

      setText('')
      setName('')
      setEmail('')
      setEmoji(EMOJIS[0])
      
      toast({
        title: "Note dropped successfully! 🎉",
        description: "Your note has been added to the wall.",
      })
    } catch (error) {
      console.error('Error submitting note:', error)
      toast({
        title: "Error dropping note",
        description: "Please try again.",
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
      className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a note..."
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none transition-all duration-300 hover:bg-white dark:hover:bg-slate-900"
          required
          rows={4}
          style={{ 
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (optional)"
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                emoji === e
                  ? 'bg-purple-100 dark:bg-purple-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Dropping note...' : 'Drop Note'} {emoji}
        </button>
      </div>
    </motion.form>
  )
}
