'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import { SelectionFrame, Sticker } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'

export function CertificateDetail({ slug }: { slug: string }) {
  const certificate = technicalCertificates.find(item => item.slug === slug) || nonTechnicalCertificates.find(item => item.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  useEffect(() => setActiveImage(0), [slug])
  if (!certificate) return <div className="studio-page"><h1 className="case-title">Certificate not found.</h1><Link className="small-link" href="/certificates">All certificates</Link></div>
  const images = [certificate.image, ...(certificate.badgeImage && certificate.badgeImage !== certificate.image ? [certificate.badgeImage] : [])]
  const technical = 'category' in certificate
  const expiry = technical ? certificate.expiryDate : undefined
  const expired = expiry ? new Date(expiry) < new Date() : false
  return <article className="studio-page"><Link href="/certificates" className="small-link mb-10"><ArrowLeft size={15} />Certificates</Link><Reveal className="case-header"><div><span className="project-date">{technical ? certificate.category : 'Recognition'}</span><h1 className="case-title">{certificate.title}</h1><p>{technical ? certificate.issuer : certificate.organization}</p>{!technical && <p className="mt-3 text-muted-foreground">{certificate.role}</p>}<div className="project-tags">{certificate.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div><aside className="case-notes"><Sticker color="cyan"><strong>Issued</strong>{certificate.issueDate}</Sticker><Sticker color="yellow"><strong>{technical ? 'Category' : 'Location'}</strong>{technical ? certificate.category : certificate.location}</Sticker>{expiry && <Sticker color="pink"><strong>{expired ? 'Expired' : 'Valid until'}</strong>{expiry}</Sticker>}{technical && certificate.credentialId && <Sticker color="green"><strong>Credential ID</strong><span className="break-all">{certificate.credentialId}</span></Sticker>}</aside></Reveal><Reveal><SelectionFrame color="ink" className="certificate-display"><Image src={images[activeImage] || images[0]} alt={activeImage === 0 ? certificate.title : `${certificate.title} supporting credential`} width={1200} height={900} sizes="(max-width: 560px) 90vw, 1000px" className="w-full h-auto object-contain" /></SelectionFrame>{images.length > 1 && <div className="certificate-thumbnails">{images.map((src, index) => <button key={src} onClick={() => setActiveImage(index)} aria-pressed={activeImage === index} aria-label={index === 0 ? 'Show certificate' : 'Show supporting credential'}><Image src={src} alt="" width={150} height={100} className="object-contain" /></button>)}</div>}</Reveal>{!technical && <Reveal className="case-body"><section><Sticker color="green">The experience</Sticker><h2>A little context.</h2><p>{certificate.description}</p></section></Reveal>}{technical && certificate.credentialUrl && <div className="mt-10"><a className="action-primary" href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">Verify credential <ArrowUpRight size={16} /></a></div>}<div className="mt-12"><Link className="small-link" href="/certificates">Explore all certificates <ArrowUpRight size={16} /></Link></div></article>
}
