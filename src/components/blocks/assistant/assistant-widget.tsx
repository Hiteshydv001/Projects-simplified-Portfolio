'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, CircuitBoard, MessageCircle } from "lucide-react"
import { ChatWindow } from "./chat-window"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog"
import { Button } from "@/components/ui/primitives/button"

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
    <div className="fixed bottom-6 right-20 z-50">
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
        <DialogContent className="flex flex-col h-[85vh] max-h-[675px] sm:max-w-[440px] p-0 gap-0">
          <DialogHeader className="shrink-0 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <CircuitBoard className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-blue-400 dark:text-blue-300" />
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
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg hover:shadow-blue-500/25 transition-shadow"
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
