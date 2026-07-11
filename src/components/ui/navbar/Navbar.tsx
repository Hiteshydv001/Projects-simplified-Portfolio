'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type NavItem = { href: string; label: string; desktopLabel?: string }

const primaryLinks: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/paper-implementations', label: 'Paper_Implementations', desktopLabel: 'Papers' },
  { href: '/articles', label: 'Articles' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/ai-playground', label: 'AI_Playground', desktopLabel: 'Playground' },
]

const moreLinks: NavItem[] = [
  { href: '/leave_note_for_me', label: 'Leave_Note', desktopLabel: 'Leave a note' },
  { href: '/resume', label: 'Resume' },
]

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return <Link href={item.href} onClick={onClick} className={cn('block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary', monoFont.className)}>{item.desktopLabel ?? item.label}</Link>
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const [morePosition, setMorePosition] = useState({ top: 0, right: 0 })
  const allLinks = [...primaryLinks, ...moreLinks]

  const toggleMore = () => {
    const button = moreButtonRef.current
    if (button) {
      const rect = button.getBoundingClientRect()
      setMorePosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    }
    setIsMoreOpen(open => !open)
  }

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.mobile-menu-container')) setIsMenuOpen(false)
      if (isMoreOpen && !target.closest('.desktop-more-menu')) setIsMoreOpen(false)
    }
    document.addEventListener('click', closeMenus)
    return () => document.removeEventListener('click', closeMenus)
  }, [isMenuOpen, isMoreOpen])

  return (
    <nav className={cn(monoFont.className, 'relative z-50')}>
      <div className="hidden items-center justify-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1">
        {primaryLinks.map(item => (
          <motion.div key={item.href} whileHover={{ y: -1 }} className="relative after:absolute after:bottom-[2px] after:left-2 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-[calc(100%-1rem)]">
            <NavLink item={item} />
          </motion.div>
        ))}
        <div className="desktop-more-menu relative ml-1 border-l border-border/70 pl-1">
          <button ref={moreButtonRef} onClick={toggleMore} className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary" aria-expanded={isMoreOpen}>
            More <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isMoreOpen && 'rotate-180')} />
          </button>
          {typeof document !== 'undefined' && createPortal(<AnimatePresence>
            {isMoreOpen && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ top: morePosition.top, right: morePosition.right }} className="surface-card fixed z-[120] w-44 rounded-xl p-1.5">
              {moreLinks.map(item => <NavLink key={item.href} item={item} onClick={() => setIsMoreOpen(false)} />)}
            </motion.div>}
          </AnimatePresence>, document.body)}
        </div>
      </div>

      <div className="mobile-menu-container -ml-2 lg:hidden">
        <button onClick={(event) => { event.stopPropagation(); setIsMenuOpen(open => !open) }} className={cn('relative z-[60] flex h-9 w-9 items-center justify-center text-muted-foreground transition-all hover:text-primary', isMenuOpen && 'rounded-lg bg-primary/10 text-primary')} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
          <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</motion.div>
        </button>
        <AnimatePresence>
          {isMenuOpen && <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="surface-card absolute left-[-8px] top-12 z-[60] w-56 overflow-hidden rounded-xl p-1.5">
              {allLinks.map((item, index) => <motion.div key={item.href} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}><Link href={item.href} onClick={() => setIsMenuOpen(false)} className={cn(monoFont.className, 'block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary')}>{item.label}</Link></motion.div>)}
            </motion.div>
          </>}
        </AnimatePresence>
      </div>
    </nav>
  )
}
