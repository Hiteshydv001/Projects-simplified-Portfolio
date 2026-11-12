'use client'

import { CalendarDays, MessageCircle } from 'lucide-react'
import { BookingDialog, BOOKING_URL } from './booking'

import { usePortfolioAssistant } from './assistant-pet'

export function StudioTool({ type }: { type: 'booking' | 'assistant' }) {
  const openAssistant = usePortfolioAssistant()
  if (type === 'assistant') return <button type="button" className="small-link" onClick={event => openAssistant(event.currentTarget)}><MessageCircle size={17} />Ask about my work</button>
  return <BookingDialog><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="small-link"><CalendarDays size={17} />Book a call</a></BookingDialog>
}
