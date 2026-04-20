'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/components/ui/toast/use-toast'
import Text from '@/components/ui/text/text'

interface Note {
  _id: string;
  text: string;
  name?: string;
  emoji: string;
  color: string;
  createdAt: string;
}

const COLOR_MAP: Record<string, string> = {
  orange: 'from-orange-100/40 to-amber-100/40 dark:from-orange-500/10 dark:to-amber-500/10 border-orange-200/50 dark:border-orange-500/30',
  emerald: 'from-emerald-100/40 to-teal-100/40 dark:from-emerald-500/10 dark:to-teal-500/10 border-emerald-200/50 dark:border-emerald-500/30',
  blue: 'from-blue-100/40 to-sky-100/40 dark:from-blue-500/10 dark:to-sky-500/10 border-blue-200/50 dark:border-blue-500/30',
  pink: 'from-rose-100/40 to-pink-100/40 dark:from-rose-500/10 dark:to-pink-500/10 border-rose-200/50 dark:border-rose-500/30',
  purple: 'from-purple-100/40 to-indigo-100/40 dark:from-purple-500/10 dark:to-indigo-500/10 border-purple-200/50 dark:border-purple-500/30',
  amber: 'from-yellow-100/40 to-orange-100/40 dark:from-yellow-500/10 dark:to-orange-500/10 border-yellow-200/50 dark:border-yellow-500/30',
}

export default function NoteWall() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes')
      const data = await response.json()
      if (Array.isArray(data)) {
        setNotes(data)
      }
    } catch (error) {
      console.warn('Error connecting to notes database:', error)
      setNotes([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()

    const handleRefresh = () => {
      fetchNotes()
    }

    window.addEventListener('refresh-notes', handleRefresh)
    return () => window.removeEventListener('refresh-notes', handleRefresh)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {[...Array(6)].map((_, i) => {
          // Use index-based rotation for consistent SSR/client rendering
          const rotation = ((i * 2.5) % 6) - 3;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="animate-pulse h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
              style={{
                rotate: rotation + 'deg',
                transformOrigin: 'center',
              }}
            />
          );
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      <AnimatePresence mode="popLayout">
        {notes.map((note, idx) => {
          // Stable rotation based on index to prevent hydration mismatch
          const rotation = ((idx * 3.5) % 8) - 4;
          const colorClasses = COLOR_MAP[note.color] || COLOR_MAP.orange;
          
          return (
            <motion.div
              key={note._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`bg-gradient-to-br ${colorClasses} p-6 rounded-xl shadow-sm border backdrop-blur-md transition-all duration-300 relative overflow-hidden`}
              style={{
                rotate: rotation + 'deg',
                transformOrigin: 'center',
              }}
              whileHover={{ 
                scale: 1.02,
                rotate: 0,
                zIndex: 10,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
              }}
            >
              <motion.div className="absolute top-3 right-3 text-2xl drop-shadow-sm">
                {note.emoji}
              </motion.div>
              <div className="relative">
                <Text className="text-foreground/90 mb-4 mt-2 whitespace-pre-wrap break-words leading-relaxed text-sm">
                  {note.text}
                </Text>
                {note.name && (
                  <Text variant="caption" className="text-muted-foreground/80 font-medium italic">
                    – {note.name}
                  </Text>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  )
}
