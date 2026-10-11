'use client'

import { useEffect, useRef, useState } from 'react'
import { SendIcon, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMotionSettings } from '@/components/layout/motion-provider'

type Message = { role: 'assistant' | 'user'; text: string }
const suggestions = ['Show projects', 'Experience highlights', 'Research work', 'Contact Hitesh']

export function ChatWindow({ active = true }: { active?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi! I’m Hitesh’s portfolio assistant. Ask about projects, research, experience, or how to get in touch.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const quiet = reduced || !!systemReduced
  useEffect(() => {
    if (active && window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true })
  }, [active])
  useEffect(() => {
    if (!active || !messagesRef.current) return
    // Scroll only the conversation, never the surrounding portfolio page.
    messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: quiet || loading ? 'instant' : 'smooth' })
  }, [messages, loading, active, quiet])

  const sendMessage = async (value = input) => {
    const message = value.trim()
    if (!message || loading || message.length > 2000) return
    const history = messages
    setMessages(prev => [...prev, { role: 'user', text: message }, { role: 'assistant', text: '' }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('https://portfolio-67uz.onrender.com/api/v1/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' }, signal: AbortSignal.timeout(45000), body: JSON.stringify({ message, chat_history: history.slice(-20).map(item => ({ role: item.role, content: item.text })) }) })
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

  return <div className="flex h-full min-h-0 flex-col">
    <div ref={messagesRef} role="log" aria-label="Conversation" aria-live={active && !loading ? 'polite' : 'off'} aria-busy={loading} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
      {messages.map((message, index) => <motion.div key={index} initial={quiet ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'border border-border/70 bg-muted/40 text-foreground'}`}>{message.text || (loading && <span className="inline-flex gap-1" role="status" aria-label="Assistant is replying"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" /></span>)}</div></motion.div>)}
    </div>
    {messages.length <= 2 && <div className="flex shrink-0 flex-wrap gap-1.5 px-4 pb-3">{suggestions.map(question => <button type="button" key={question} disabled={loading} onClick={() => sendMessage(question)} className="rounded-full border border-border/70 bg-muted/35 px-2.5 py-1.5 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-primary">{question}</button>)}</div>}
    <div className="shrink-0 border-t border-border/60 p-3"><div className="flex items-end gap-2"><textarea ref={inputRef} aria-label="Message for portfolio assistant" maxLength={2000} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); sendMessage() } }} placeholder="Ask about Hitesh’s work..." rows={1} className="input-surface min-h-11 min-w-0 flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none" /><button type="button" aria-label="Send message" onClick={() => sendMessage()} disabled={loading || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-50"><SendIcon className="h-4 w-4" /></button></div><p className="mt-2 flex items-center gap-1 text-[9px] text-muted-foreground"><Sparkles className="h-3 w-3 shrink-0" /> AI responses may be imperfect.</p></div>
  </div>
}
