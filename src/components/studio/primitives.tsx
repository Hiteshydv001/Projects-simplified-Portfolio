import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function SelectionFrame({ children, className = '', color = 'cyan', invertCursor = false }: { children: ReactNode; className?: string; color?: 'cyan' | 'ink' | 'yellow'; invertCursor?: boolean }) {
  return <div data-invert-cursor={invertCursor ? '' : undefined} className={`selection-frame frame-${color} ${className}`}>{children}{['tl', 'tr', 'bl', 'br'].map(corner => <i aria-hidden="true" className={`frame-handle handle-${corner}`} key={corner} />)}</div>
}

export function StudioHeading({ children, note, as: Tag = 'h1', className = '' }: { children: ReactNode; note?: string; as?: 'h1' | 'h2'; className?: string }) {
  return <div className={`studio-heading-wrap ${className}`}>{note && <p className="hand-note underlined-note">{note}</p>}<Tag className="studio-heading">{children}</Tag></div>
}

export function StudioButton({ children, href, className = '', external = false }: { children: ReactNode; href: string; className?: string; external?: boolean }) {
  return <Link href={href} className={`studio-button ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span className="button-icon"><ArrowUpRight size={22} /></span><span>{children}</span></Link>
}

export function Polaroid({ src, alt, caption, className = '' }: { src: string; alt: string; caption: string; className?: string }) {
  return <figure className={`polaroid ${className}`}><div className="polaroid-photo"><Image src={src} alt={alt} fill sizes="(max-width: 640px) 45vw, 240px" className="object-cover" /></div><figcaption className="hand-note">{caption}</figcaption></figure>
}

export function Sticker({ children, color = 'yellow', className = '' }: { children: ReactNode; color?: string; className?: string }) {
  return <span className={`sticker sticker-${color} ${className}`}>{children}</span>
}

export function Flower({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 80 80" className={`studio-flower ${className}`} aria-hidden="true"><g fill="currentColor">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="40" cy="18" rx="9" ry="17" transform={`rotate(${i * 45} 40 40)`} />)}<circle cx="40" cy="40" r="12" /></g></svg>
}

export function LabelPointer() {
  return <svg className="label-pointer" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M3 9 33 3 14 33 13 17Z" stroke="#111512" strokeWidth="2.2" strokeLinejoin="miter" /></svg>
}
