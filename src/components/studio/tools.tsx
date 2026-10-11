'use client'

import { useState } from 'react'
import { CalendarDays, MessageCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/primitives/dialog'

import { usePortfolioAssistant } from './assistant-pet'

export function StudioTool({ type }: { type: 'booking' | 'assistant' }) {
  const [open, setOpen] = useState(false)
  const openAssistant = usePortfolioAssistant()
  if (type === 'assistant') return <button type="button" className="small-link" onClick={event => openAssistant(event.currentTarget)}><MessageCircle size={17} />Ask about my work</button>
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button type="button" className="small-link"><CalendarDays size={17} />Book a call</button></DialogTrigger><DialogContent className="studio-booking-dialog"><DialogTitle>A good time to talk.</DialogTitle><DialogDescription>Choose a 30-minute slot that works for you.</DialogDescription>{open && <iframe src="https://cal.com/hitesh-kumar-aiml/30min" title="Meeting booking calendar" className="w-full h-full min-h-0 border-0" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />}</DialogContent></Dialog>
}
