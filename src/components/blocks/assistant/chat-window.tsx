'use client'

import { useEffect, useRef, useState } from 'react'
import { SendIcon, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

type Message = { role: 'assistant' | 'user'; text: string }
const suggestions = ['Show projects', 'Experience highlights', 'Research work', 'Contact Hitesh']

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi! I’m Hitesh’s portfolio assistant. Ask about projects, research, experience, or how to get in touch.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading])

  const sendMessage = async (value = input) => {
    const message = value.trim()
    if (!message || loading) return
    const history = messages
    setMessages(prev => [...prev, { role: 'user', text: message }, { role: 'assistant', text: '' }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('https://portfolio-67uz.onrender.com/api/v1/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' }, body: JSON.stringify({ message, chat_history: history.map(item => ({ role: item.role, content: item.text })) }) })
      if (!res.ok || !res.body) throw new Error('The assistant service is unavailable right now.')
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = ''; let response = ''
      while (true) {
        const { done, value } = await reader.read(); if (done) break
        buffer += decoder.decode(value, { stream: true }); const lines = buffer.split('\n'); buffer = lines.pop() || ''
        for (const line of lines) if (line.startsWith('data: ')) { try { const data = JSON.parse(line.slice(6)); if (data.type === 'text') { response += data.data; setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: response }]) } } catch {} }
      }
      if (!response) setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: 'I couldn’t generate a response. Please try again.' }])
    } catch (error) { setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: error instanceof Error ? error.message : 'Unable to connect right now.' }]) } finally { setLoading(false) }
  }

  return <div className="flex h-full flex-col bg-background/80">
    <div className="flex-1 space-y-4 overflow-y-auto p-5">
      {messages.map((message, index) => <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'border border-border/70 bg-muted/40 text-foreground'}`}>{message.text || (loading && <span className="inline-flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" /></span>)}</div></motion.div>)}
      <div ref={endRef} />
    </div>
    {messages.length <= 2 && <div className="flex gap-2 overflow-x-auto px-5 pb-3">{suggestions.map(question => <button key={question} onClick={() => sendMessage(question)} className="shrink-0 rounded-full border border-border/70 bg-muted/35 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary">{question}</button>)}</div>}
    <div className="border-t border-border/60 bg-background/75 p-4"><div className="flex items-end gap-2"><textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage() } }} placeholder="Ask about Hitesh’s work..." rows={1} className="input-surface min-h-11 flex-1 resize-none px-3 py-2.5 text-sm outline-none" /><button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-50"><SendIcon className="h-4 w-4" /></button></div><p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Sparkles className="h-3 w-3" /> AI responses can be imperfect—verify important details.</p></div>
  </div>
}
