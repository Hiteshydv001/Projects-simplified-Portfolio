import type { Metadata } from 'next'
import { FileDown, ExternalLink } from 'lucide-react'
import { StudioHeading, SelectionFrame } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'

export const metadata: Metadata = { title: 'Resume', description: 'View or download Hitesh Kumar’s engineering resume.' }
export default function ResumePage() {
  return <div className="studio-page"><Reveal><StudioHeading note="the story, on one page">Resume</StudioHeading><div className="mb-12 flex flex-wrap gap-5"><a href="/api/resume?download=1" download className="action-primary"><FileDown size={17} />Download PDF</a><a href="/api/resume" target="_blank" rel="noopener noreferrer" className="small-link">Open in a new tab <ExternalLink size={16} /></a></div></Reveal><Reveal><SelectionFrame color="ink"><div className="resume-preview"><div className="exhibit-address">CV_Hitesh_Kumar.pdf</div><iframe src="/api/resume#toolbar=0&navpanes=0" title="Hitesh Kumar’s resume PDF" /></div></SelectionFrame></Reveal><p className="mt-6 text-sm text-muted-foreground">If the PDF doesn’t display in your browser, use the download or new-tab link above.</p></div>
}
