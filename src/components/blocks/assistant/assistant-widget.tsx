'use client'

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, CircuitBoard, MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog"
import { Button } from "@/components/ui/primitives/button"

const ChatWindow = dynamic(() => import('./chat-window').then(module => module.ChatWindow), { ssr: false })

export function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    // Hide hint after 5 seconds
    const timer = setTimeout(() => {
      setShowHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hint Message */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Ask me anything!
              </span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-blue-500"
              >
                👋
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="surface-card flex h-[78vh] max-h-[680px] flex-col gap-0 overflow-hidden rounded-2xl border-primary/25 p-0 sm:max-w-[480px]">
          <DialogHeader className="shrink-0 border-b border-border/60 bg-muted/20 px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <CircuitBoard className="h-5 w-5 text-primary" />
                  <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-primary" />
                </div>
                <DialogTitle className="text-lg font-semibold">Portfolio Assistant</DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 w-full min-h-0">
            <ChatWindow />
          </div>
        </DialogContent>

        {/* Floating Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            size="icon"
            className="h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
            onClick={() => {
              setOpen(true)
              setShowHint(false)
            }}
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              <CircuitBoard className="w-6 h-6 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-200" />
            </div>
          </Button>
        </motion.div>
      </Dialog>
    </div>
  )
}
