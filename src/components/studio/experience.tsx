'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { experiences } from '@/app/experience/_data/experiences'
import { StudioHeading, Sticker, StudioButton } from './primitives'
import { Reveal } from './motion'

export function StudioExperience() {
  return <div className="studio-page"><Reveal><StudioHeading note="learning. building. doing it again.">Experience</StudioHeading></Reveal><div className="experience-archive">{experiences.map(experience => <Reveal key={experience.slug} className="experience-entry"><div className="experience-marker"><Image src={experience.image} alt={experience.company} width={55} height={55} className="object-contain" /></div><div><div className="experience-meta"><span>{experience.period}</span>{experience.period.toLowerCase().includes('present') && <Sticker color="green">Currently here</Sticker>}</div><h2><Link href={`/experience/${experience.slug}`}>{experience.company} <ArrowUpRight className="inline-block" size={25} /></Link></h2><h3>{experience.title}</h3><p className="experience-location">{experience.location}</p><ul>{experience.description.map(line => <li key={line}>{line}</li>)}</ul><div className="project-tags">{experience.technologies.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div><Link className="small-link mt-6" href={`/experience/${experience.slug}`}>Read the chapter <ArrowUpRight size={14} /></Link></div></Reveal>)}</div><div className="mt-14"><StudioButton href="/api/resume?download=1">Download resume</StudioButton></div></div>
}
