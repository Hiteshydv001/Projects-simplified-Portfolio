'use client'

import { cloneElement, useState, type MouseEvent, type ReactElement } from 'react'
import { useTheme } from 'next-themes'
import { CalendarDays, ArrowUpRight, Clock, Video } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/primitives/dialog'

export const BOOKING_URL = 'https://cal.com/hitesh-kumar-aiml/30min'

type TriggerProps = { onClick?: (event: MouseEvent<HTMLElement>) => void }

/**
 * Opens the booking calendar in an on-site window instead of a new tab.
 * The trigger keeps its real link, so ctrl/cmd/shift/middle-click still open a tab as usual.
 */
export function BookingDialog({ children }: { children: ReactElement<TriggerProps> }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const trigger = cloneElement(children, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event)
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      setLoaded(false)
      setOpen(true)
    },
  })

  return <>
    {trigger}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="studio-booking-dialog" aria-describedby="booking-dialog-description">
        <header className="booking-head">
          <span className="booking-badge" aria-hidden="true"><CalendarDays size={20} strokeWidth={1.9} /></span>
          <div className="booking-copy">
            <DialogTitle>Let’s talk</DialogTitle>
            <DialogDescription id="booking-dialog-description">Pick a slot that suits you. It lands straight in my calendar.</DialogDescription>
          </div>
          <div className="booking-meta" aria-hidden="true">
            <span><Clock size={13} />15–60 min</span>
            <span><Video size={13} />Google Meet</span>
          </div>
          <a className="booking-newtab" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Open in new tab <ArrowUpRight size={13} aria-hidden="true" /></a>
        </header>
        <div className="booking-frame" data-loaded={loaded}>
          {!loaded && <div className="booking-skeleton" role="status" aria-label="Loading calendar">
            <div className="booking-skeleton-side"><i /><i /><i /><i /></div>
            <div className="booking-skeleton-cal">{Array.from({ length: 35 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 60 + Math.floor(i / 7) * 40}ms` }} />)}</div>
          </div>}
          {open && <iframe
            src={`${BOOKING_URL}?embed=true&layout=month_view&theme=${theme}`}
            title="Book a 30-minute call with Hitesh"
            onLoad={() => setLoaded(true)}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="payment"
          />}
        </div>
      </DialogContent>
    </Dialog>
  </>
}
