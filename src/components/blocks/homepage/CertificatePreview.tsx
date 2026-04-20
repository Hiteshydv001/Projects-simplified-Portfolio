'use client'

import Link from 'next/link'
import Image from 'next/image'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { technicalCertificates } from '@/app/certificates/_data/technical-certificates'
import { nonTechnicalCertificates } from '@/app/certificates/_data/non-technical-certificates'
import { ArrowRight } from 'lucide-react'

export function CertificatePreview() {
  const recentTechnical = technicalCertificates.slice(0, 3)
  const recentNonTechnical = nonTechnicalCertificates.slice(0, 2)
  const displayCertificates = [...recentTechnical, ...recentNonTechnical]

  return (
    <section className="py-6">
      <TextHeading as="h2" className="text-xl sm:text-2xl md:text-3xl mb-6">
        Certifications
      </TextHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {displayCertificates.map((cert) => (
          <Link
            key={cert.id}
            href={`/certificates/${cert.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border/20 bg-transparent transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:border-accent/30 hover:shadow-lg"
          >
            {/* Certificate Image */}
            <div className="relative h-28 sm:h-32 overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
              {/* Category Badge */}
              {'category' in cert ? (
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-accent border border-accent/20">
                  {cert.category}
                </span>
              ) : (
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-accent border border-accent/20">
                  Volunteer
                </span>
              )}

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold line-clamp-2 leading-tight text-foreground group-hover:text-accent transition-colors">
                {cert.title}
              </h3>

              {/* Date */}
              <p className="text-[10px] text-muted-foreground">{cert.issueDate}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="flex items-center text-accent">
        <Link href="/certificates" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
          View all {technicalCertificates.length + nonTechnicalCertificates.length} certificates
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
