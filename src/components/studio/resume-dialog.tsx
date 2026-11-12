'use client'

import { cloneElement, useEffect, useState, type MouseEvent, type ReactElement } from 'react'
import { FileText, Download, ArrowUpRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/primitives/dialog'

export const RESUME_VIEW_URL = '/api/resume'
export const RESUME_DOWNLOAD_URL = '/api/resume?download=1'

type TriggerProps = { onClick?: (event: MouseEvent<HTMLElement>) => void }

/**
 * Shows the résumé PDF in an on-site window instead of a new tab.
 * Browsers without an inline PDF viewer (most phones) get clear download / open actions instead.
 * The trigger keeps its real link, so ctrl/cmd/shift/middle-click still open a tab as usual.
 */
export function ResumeDialog({ children }: { children: ReactElement<TriggerProps> }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [canEmbed, setCanEmbed] = useState(true)

  useEffect(() => {
    // `pdfViewerEnabled` is false on browsers that would download instead of rendering inline.
    const nav = navigator as Navigator & { pdfViewerEnabled?: boolean }
    if (nav.pdfViewerEnabled === false) setCanEmbed(false)
  }, [])

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
      <DialogContent className="studio-booking-dialog studio-resume-dialog" aria-describedby="resume-dialog-description">
        <header className="booking-head">
          <span className="booking-badge" aria-hidden="true"><FileText size={20} strokeWidth={1.9} /></span>
          <div className="booking-copy">
            <DialogTitle>Résumé</DialogTitle>
            <DialogDescription id="resume-dialog-description">Hitesh Kumar · AI/ML Engineer · one page</DialogDescription>
          </div>
          <a className="booking-newtab resume-download" href={RESUME_DOWNLOAD_URL} download><Download size={13} aria-hidden="true" />Download PDF</a>
          <a className="booking-newtab" href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer">Open in new tab <ArrowUpRight size={13} aria-hidden="true" /></a>
        </header>
        <div className="booking-frame resume-frame" data-loaded={loaded || !canEmbed}>
          {canEmbed ? <>
            {!loaded && <div className="resume-skeleton" role="status" aria-label="Loading résumé">
              <div className="resume-paper">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ width: `${[46, 30, 0, 88, 92, 74, 0, 34, 90, 86, 62, 0, 40, 80][i]}%`, animationDelay: `${i * 50}ms` }} />)}</div>
            </div>}
            {open && <iframe src={`${RESUME_VIEW_URL}#toolbar=0&navpanes=0&view=FitH`} title="Hitesh Kumar’s résumé (PDF)" onLoad={() => setLoaded(true)} />}
          </> : <div className="resume-fallback">
            <span className="booking-badge" aria-hidden="true"><FileText size={22} /></span>
            <strong>Your browser can’t show PDFs inside the page.</strong>
            <p>Download it or open it in your PDF viewer instead.</p>
            <div>
              <a className="studio-button" href={RESUME_DOWNLOAD_URL} download><span className="button-icon"><Download size={20} /></span><span>Download PDF</span></a>
              <a className="booking-newtab" href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer">Open PDF <ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>}
        </div>
      </DialogContent>
    </Dialog>
  </>
}
