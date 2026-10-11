import type { ReactNode, RefObject } from 'react'

export function FloatingHero({ children }: { children: ReactNode }) {
  return <FloatingSection className="studio-hero" label="Hello, I'm Hitesh">{children}</FloatingSection>
}

export function FloatingSection({ children, className, label, sectionRef }: { children: ReactNode; className: string; label: string; sectionRef?: RefObject<HTMLElement | null> }) {
  return <section ref={sectionRef} className={className} aria-label={label} data-floating="false">{children}</section>
}

// Preserve the composition without continuous animation or pointer-driven layout reads.
export function Floating({ children }: { children: ReactNode; depth?: number; amplitude?: number; duration?: number; phase?: number }) {
  return <div className="floating-parallax"><div className="floating-piece">{children}</div></div>
}
