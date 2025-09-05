'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Note, supabase } from '@/lib/supabase/supabase'
import { useToast } from '@/components/ui/toast/use-toast'

export default function NoteWall() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)

        if (error) throw error
        setNotes(data || [])
      } catch (error) {
        console.error('Error fetching notes:', error)
        toast({
          title: "Error fetching notes",
          description: "Please try refreshing the page.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()

    // Subscribe to realtime changes
    const channel = supabase.channel('notes-channel')
    
    channel
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notes' 
        }, 
        (payload) => {
          setNotes((current) => {
            const newNote = payload.new as Note
            // Avoid duplicates
            if (current.find(note => note.id === newNote.id)) {
              return current
            }
            return [newNote, ...current.slice(0, 49)]
          })
          
          toast({
            title: "New note dropped! 🎉",
            description: "Someone just shared their thoughts.",
            variant: "default"
          })
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="animate-pulse h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm"
            style={{
              rotate: (Math.random() * 6 - 3) + 'deg',
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      <AnimatePresence mode="popLayout">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1
            }}
            className={`${
              note.color
            } p-4 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden backdrop-blur-md hover:backdrop-blur-lg bg-opacity-90 hover:bg-opacity-95 border border-white/20 dark:border-white/10`}
            style={{
              rotate: (Math.random() * 6 - 3) + 'deg',
              transformOrigin: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            whileHover={{ 
              scale: 1.02,
              rotate: 0
            }}
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: 0.2 
              }}
              className="absolute top-2 right-2 text-xl drop-shadow-md"
            >
              {note.emoji}
            </motion.div>
            <div className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-800 dark:text-slate-100 mb-3 mt-4 whitespace-pre-wrap break-words leading-relaxed text-sm"
              >
                {note.text}
              </motion.p>
              {note.name && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-slate-600 dark:text-slate-400 font-medium italic"
                >
                  – {note.name}
                </motion.p>
              )}
            </div>
            <div className="absolute inset-0 bg-white/50 dark:bg-black/20 rounded-xl -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/30 dark:from-white/10 dark:to-white/20 rounded-xl -z-5" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
