'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Tilt } from './motion'

export function ArchiveCard({ href, title, description, image, alt, meta, contain = false, tags = [] }: { href: string; title: string; description?: string; image: string; alt: string; meta: string; contain?: boolean; tags?: string[] }) {
  return <Tilt strength={2}><Link className="folder-card" href={href}><div className="folder-cover"><span className="project-date">{meta}</span><div className="folder-image"><Image src={image} alt={alt} fill className={contain ? 'object-contain p-3' : 'object-cover'} sizes="(max-width: 560px) 90vw, 45vw" /></div></div><h2>{title} <ArrowUpRight size={22} className="inline-block align-middle" /></h2>{description && <p>{description}</p>}{tags.length > 0 && <div className="project-tags">{tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>}</Link></Tilt>
}
