'use client'

import { useState, useRef, useEffect } from "react"
import { SendIcon } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  role: 'assistant' | 'user'
  text: string
}

const SUGGESTED_QUESTIONS = [
  "Projects",
  "Experience",
  "Research",
  "Patents"
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      text: "Hi 👋 How can I help you today?" 
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const newMsg: Message = { role: "user", text: input.trim() }
    setMessages(prev => [...prev, newMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("https://portfolio-67uz.onrender.com/api/v1/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({ 
          message: input.trim(),
          chat_history: messages.map(msg => ({
            role: msg.role,
            content: msg.text
          }))
        })
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      if (!res.body) {
        throw new Error('Response has no body')
      }

      // Create a new empty message for the assistant that we will update
      const assistantMessageId = Date.now().toString()
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "" 
      }])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let fullResponse = ""

      // Read the stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log('Stream finished')
          break
        }

        // Add the incoming chunk to the buffer
        buffer += decoder.decode(value, { stream: true })

        // Process complete lines from the buffer
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep any incomplete line for next chunk

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonString = line.substring(6) // Remove "data: "
              const data = JSON.parse(jsonString)

              if (data.type === 'text') {
                // Append the new token to our full response
                fullResponse += data.data

                // Update the last assistant message
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: "assistant",
                    text: fullResponse
                  }
                  return updated
                })
              } else if (data.type === 'end') {
                return
              }
            } catch (e) {
              console.error('Error parsing stream JSON:', line, e)
            }
          }
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        assistantText += decoder.decode(value, { stream: true })

        // Update last message as it streams
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "assistant", text: assistantText }
          return updated
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      
      let errorMessage = "Sorry, I'm having trouble connecting."
      if (error instanceof Error) {
        errorMessage += "\n\nError details: " + error.message
      }
      
      if (error instanceof Response) {
        const text = await error.text()
        errorMessage += "\n\nServer response: " + text
      }
      
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          text: errorMessage
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] ${
                m.role === "assistant"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  : "bg-blue-500 text-white"
              }`}
            >
              <p className="whitespace-pre-wrap break-words text-sm">
                {m.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Thinking animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl flex space-x-1">
              <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce delay-300" />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="shrink-0 px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(q)
                sendMessage()
              }}
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            rows={1}
            className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
