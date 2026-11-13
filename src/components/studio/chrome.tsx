'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Compass, Home, Asterisk, PanelsTopLeft, Blocks, Notebook, Award, ChartNoAxesCombined, Heart, ArrowUpRight, Mail, Sun, Moon, Pause, Play, Search, X, BookOpen, Code2, Lightbulb, Briefcase, FlaskConical, History, FileText, KeyRound } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/primitives/dialog'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { StudioHeading } from './primitives'
import { Reveal } from './motion'
import { StudioTool } from './tools'
import { Icebreaker } from './icebreaker'
import { BookingDialog, BOOKING_URL } from './booking'
import { FooterHorizon } from './footer-horizon'
import { usePortfolioAssistant } from './assistant-pet'
import { IconContext, CalendarDots, EnvelopeSimple, ChatCircleDots, GithubLogo, LinkedinLogo, XLogo, ArrowUp } from '@phosphor-icons/react'

const mainLinks = [
  { href: '/', label: 'Home', Icon: Home }, { href: '/about', label: 'About', Icon: Asterisk },
  { href: '/case-study', label: 'Projects', Icon: PanelsTopLeft }, { href: '/certificates', label: 'Certifications', Icon: Award },
  { href: '/play-ground', label: 'R&D Lab', Icon: Blocks },
  { href: '/articles', label: 'Articles', Icon: Notebook }, { href: '/analytics', label: 'Analytics', Icon: ChartNoAxesCombined },
]
const allLinks = [
  { href: '/', label: 'Home', description: 'An introduction', Icon: Home, keywords: 'portfolio start' },
  { href: '/about', label: 'About', description: 'The person behind the work', Icon: Asterisk, keywords: 'bio hitesh skills' },
  { href: '/case-study', label: 'Projects', description: 'Projects & the process', Icon: PanelsTopLeft, keywords: 'projects work builds case studies' },
  { href: '/research', label: 'Research', description: 'Papers & explorations', Icon: BookOpen, keywords: 'publications science' },
  { href: '/paper-implementations', label: 'Paper implementations', description: 'Research, translated into code', Icon: Code2, keywords: 'papers code machine learning ml' },
  { href: '/patents', label: 'Patents', description: 'Ideas & inventions', Icon: Lightbulb, keywords: 'innovation' },
  { href: '/experience', label: 'Experience', description: 'Where I’ve worked', Icon: Briefcase, keywords: 'jobs career internship' },
  { href: '/certificates', label: 'Certifications', description: 'Credentials & learning', Icon: Award, keywords: 'certificates courses awards' },
  { href: '/play-ground', label: 'R&D Lab', description: 'Prototypes, papers & inventions', Icon: Blocks, keywords: 'experiments demos games playground research lab prototypes' },
  { href: '/ai-playground', label: 'AI lab', description: 'Interactive AI experiments', Icon: FlaskConical, keywords: 'machine learning ml attention embeddings' },
  { href: '/articles', label: 'Articles', description: 'Notes & things I’ve learned', Icon: Notebook, keywords: 'articles writing posts blog notebook' },
  { href: '/analytics', label: 'Analytics', description: 'Visitors & page views', Icon: ChartNoAxesCombined, keywords: 'traffic stats' },
  { href: '/portfolio', label: 'Past portfolios', description: 'Earlier versions of this site', Icon: History, keywords: 'archive websites' },
  { href: '/resume', label: 'Resume', description: 'My background at a glance', Icon: FileText, keywords: 'cv curriculum vitae' },
  { href: '/contact', label: 'Contact', description: 'Let’s start a conversation', Icon: Mail, keywords: 'email talk hire connect' },
]

type NavigationLink = { label: string; href: string }

export function StudioNavbar({ sections }: { sections: Record<string, NavigationLink[]> }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState<string | null>(null)
  const [articleLinks, setArticleLinks] = useState<NavigationLink[] | null>(null)
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [docked, setDocked] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const results = useRef<HTMLElement>(null)
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelDropdownClose = () => {
    if (dropdownCloseTimer.current !== null) {
      clearTimeout(dropdownCloseTimer.current)
      dropdownCloseTimer.current = null
    }
  }
  const scheduleDropdownClose = () => {
    cancelDropdownClose()
    dropdownCloseTimer.current = setTimeout(() => {
      setExploreOpen(null)
      dropdownCloseTimer.current = null
    }, 200)
  }
  const searchId = useId()
  const exploreId = useId()
  const { resolvedTheme, setTheme } = useTheme()
  const { reduced, toggle } = useMotionSettings()
  const isDark = mounted && resolvedTheme === 'dark'
  const themeLabel = `Switch to ${isDark ? 'light' : 'dark'} theme`
  const active = (href: string) => href === '/' ? pathname === '/' || pathname === '/homepage' : href === '/case-study' ? pathname.startsWith('/case-study') || pathname.startsWith('/projects') : pathname.startsWith(href)
  const terms = query.trim().toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  const filteredLinks = allLinks.filter(page => {
    const words = `${page.label} ${page.description} ${page.keywords} ${page.href}`.toLowerCase().split(/[^\p{L}\p{N}]+/u)
    return terms.every(term => words.some(word => word.startsWith(term)))
  })
  const changeOpen = (value: boolean) => { setOpen(value); setExploreOpen(null); if (!value) setQuery('') }
  useEffect(() => { setExploreOpen(null) }, [pathname])
  useEffect(() => () => {
    if (dropdownCloseTimer.current !== null) clearTimeout(dropdownCloseTimer.current)
  }, [])
  useEffect(() => {
    const closeOnScroll = (event: Event) => {
      // Keep long menus usable while closing them when the page scrolls.
      if (event.target instanceof Element && event.target.closest('.studio-page-dropdown')) return
      setExploreOpen(null)
    }
    window.addEventListener('scroll', closeOnScroll, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', closeOnScroll, true)
  }, [])
  useEffect(() => {
    if (exploreOpen !== '/articles' || articleLinks !== null) return
    const controller = new AbortController()
    void fetch('/api/articles', { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Articles unavailable')
      const articles: { title: string; slug: string }[] = await response.json()
      if (!Array.isArray(articles)) throw new Error('Articles unavailable')
      if (!controller.signal.aborted) setArticleLinks(articles.map(item => ({ label: item.title, href: `/articles/${encodeURIComponent(item.slug)}` })))
    }).catch(() => { if (!controller.signal.aborted) setArticleLinks([]) })
    return () => controller.abort()
  }, [exploreOpen, articleLinks])
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    // Dock the floating pill to the top edge once the page starts scrolling.
    const update = () => setDocked(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setExploreOpen(null)
        setOpen(current => !current)
        setQuery('')
      }
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [])
  return <>
    <header className={`studio-nav${docked ? ' is-docked' : ''}`}>
      <Link href="/" className="studio-nav-brand" aria-label="Hitesh Kumar home"><span className="studio-brand-mark studio-original-brand" aria-hidden="true"><Image src="/favicon.ico" alt="" width={34} height={34} unoptimized /></span><span>hitesh<span className="studio-brand-domain">.ml</span></span></Link>
      <div className="studio-navigation">
        <nav className="studio-primary-nav" aria-label="Primary navigation">{mainLinks.map(({ href, label, Icon }, index) => {
          const expanded = exploreOpen === href && !open
          const links = href === '/articles' ? [...(articleLinks || []), ...(sections[href] || [])] : sections[href] || []
          const panelId = `${exploreId}-${index}`
          return <div className="studio-nav-item" key={href} data-expanded={expanded} onPointerEnter={cancelDropdownClose} onPointerMove={event => { if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0) && !open) { cancelDropdownClose(); setExploreOpen(href) } }} onPointerLeave={scheduleDropdownClose} onFocus={event => { if (!open && event.target.matches(':focus-visible')) { cancelDropdownClose(); setExploreOpen(href) } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExploreOpen(null) }} onKeyDown={event => {
            if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); event.currentTarget.querySelector<HTMLAnchorElement>('a')?.focus(); setExploreOpen(null) }
            if (event.key === 'ArrowDown' && event.target === event.currentTarget.firstElementChild) { event.preventDefault(); const item = event.currentTarget; setExploreOpen(href); requestAnimationFrame(() => item.querySelector<HTMLAnchorElement>('.studio-page-dropdown a')?.focus()) }
          }}>
            <Link href={href} aria-label={label} aria-controls={panelId} aria-expanded={expanded} aria-current={active(href) ? 'page' : undefined} onClick={() => setExploreOpen(null)} className={active(href) ? 'is-active' : ''}><Icon size={16} strokeWidth={1.7} aria-hidden="true" /><span>{label}</span></Link>
            <nav id={panelId} className="studio-page-dropdown" hidden={!expanded} aria-label={`${label} pages`}>
              {href === '/articles' && articleLinks === null && <p role="status">Loading articles…</p>}
              {links.map(item => <Link key={item.href} href={item.href} prefetch={false} onClick={() => setExploreOpen(null)}><span>{item.label}</span><ArrowUpRight size={13} aria-hidden="true" /></Link>)}
            </nav>
          </div>
        })}</nav>
      </div>
      <div className="studio-nav-end">
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogTrigger asChild><button type="button" className="studio-menu" aria-label="Search all pages" title="Search pages (Ctrl / ⌘ K)"><Search size={18} strokeWidth={1.8} aria-hidden="true" /><kbd aria-hidden="true">Ctrl K</kbd></button></DialogTrigger>
        <DialogContent className="studio-menu-dialog" onOpenAutoFocus={event => { event.preventDefault(); searchInput.current?.focus() }}>
          <div className="studio-search-heading"><span className="studio-search-badge" aria-hidden="true"><Compass size={20} strokeWidth={1.9} /></span><div><DialogTitle>Search portfolio</DialogTitle><DialogDescription>Find a page. Pick up where your curiosity takes you.</DialogDescription></div></div>
          <div className="studio-search-field">
            <Search size={20} strokeWidth={1.8} aria-hidden="true" />
            <input ref={searchInput} id={searchId} type="search" className="studio-menu-search" placeholder="Search pages, projects, AI lab…" aria-label="Search portfolio pages" aria-controls={`${searchId}-results`} autoComplete="off" spellCheck={false} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => {
              if (!event.nativeEvent.isComposing && (event.key === 'ArrowDown' || event.key === 'Enter')) {
                const first = results.current?.querySelector<HTMLAnchorElement>('a')
                if (first) { event.preventDefault(); if (event.key === 'Enter') first.click(); else first.focus() }
              }
            }} />
            {query ? <button type="button" className="studio-search-clear" aria-label="Clear search" onClick={() => { setQuery(''); searchInput.current?.focus() }}><X size={16} aria-hidden="true" /></button> : <span className="studio-search-shortcut" aria-hidden="true"><kbd>Ctrl</kbd><kbd>K</kbd></span>}
          </div>
          <p className="studio-search-count" role="status">{query.trim() ? `${filteredLinks.length} ${filteredLinks.length === 1 ? 'page' : 'pages'} found` : 'Explore all pages'}</p>
          <nav ref={results} id={`${searchId}-results`} aria-label="Search results" className="studio-menu-grid" onKeyDown={event => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
            const links = Array.from(results.current?.querySelectorAll<HTMLAnchorElement>('a') || [])
            const index = links.findIndex(link => link === document.activeElement)
            if (index < 0) return
            event.preventDefault()
            if (event.key === 'ArrowUp' && index === 0) searchInput.current?.focus()
            else links[Math.max(0, Math.min(links.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)))]?.focus()
          }}>{filteredLinks.map(({ href, label, description, Icon }) => <Link key={href} href={href} onClick={() => changeOpen(false)} aria-current={active(href) ? 'page' : undefined}><span className="studio-search-page-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.7} /></span><span className="studio-search-page-copy"><strong>{label}</strong><small>{description}</small></span><ArrowUpRight className="studio-search-page-arrow" size={15} aria-hidden="true" /></Link>)}{!filteredLinks.length && <div className="studio-search-empty"><Search size={28} aria-hidden="true" /><strong>No pages found</strong><p>Try “projects”, “certificates”, or “AI”.</p><button type="button" onClick={() => { setQuery(''); searchInput.current?.focus() }}>Clear search</button></div>}</nav>
          <div className="menu-preferences"><button onClick={toggle} aria-pressed={reduced}>{reduced ? <Play size={16} /> : <Pause size={16} />} {reduced ? 'Enable motion' : 'Reduce motion'}</button><a href="/api/resume?download=1" download>Download resume <ArrowUpRight size={16} /></a></div>
        </DialogContent>
      </Dialog>
        <a className="nav-utility nav-email" href="mailto:hiteshofficial0001@gmail.com" aria-label="Email Hitesh">
          <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
          <span className="nav-control-tooltip" aria-hidden="true">Email me</span>
        </a>
        <Link className="nav-utility" href="/members" prefetch={false} aria-label="Members area: sign in with NexusID">
          <KeyRound size={17} strokeWidth={1.8} aria-hidden="true" />
          <span className="nav-control-tooltip" aria-hidden="true">Members sign-in</span>
        </Link>
        <button type="button" className="nav-utility theme-control" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} aria-label={themeLabel}>
          {isDark ? <Sun size={17} strokeWidth={1.8} aria-hidden="true" /> : <Moon size={17} strokeWidth={1.8} aria-hidden="true" />}
          <span className="nav-control-tooltip" aria-hidden="true">{themeLabel}</span>
        </button>
        <BookingDialog><a className="nav-contact" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a 30-minute call">
          <span className="nav-contact-mark" aria-hidden="true"><Heart size={13} strokeWidth={1.8} /></span>
          <span className="nav-contact-label">Let’s talk</span>
          <ArrowUpRight className="nav-contact-arrow" size={14} strokeWidth={1.8} aria-hidden="true" />
        </a></BookingDialog>
      </div>
    </header>
  </>
}

export function StudioFooter() {
  const pathname = usePathname()
  const isContact = pathname === '/contact'
  const openAssistant = usePortfolioAssistant()
  return <IconContext.Provider value={{ weight: 'duotone' }}><footer className={`studio-footer ${isContact ? 'compact-footer' : ''}`}>
    {!isContact && <Reveal className="studio-footer-main">
      <div className="footer-talk">
        <p className="hand-note footer-hello">say hello</p>
        <StudioHeading as="h2">Let’s talk</StudioHeading>
        <p className="footer-lede">A project, a question, or a wonderfully weird idea. I’m listening.</p>
        <span className="footer-status"><i aria-hidden="true" />Open to AI/ML roles &amp; thoughtful collaborations</span>
        <div className="footer-ctas">
          <BookingDialog><a className="studio-button xp-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><span className="button-icon"><CalendarDots size={18} aria-hidden="true" /></span><span>Book a 30-min call</span></a></BookingDialog>
          <a className="rk-btn" href="mailto:hiteshofficial0001@gmail.com"><EnvelopeSimple size={16} aria-hidden="true" />Email me</a>
          <button type="button" className="rk-btn" onClick={event => openAssistant(event.currentTarget)}><ChatCircleDots size={16} aria-hidden="true" />Ask my AI</button>
        </div>
        <p className="hand-note footer-invitation">or break the ice →</p>
      </div>
      <Icebreaker />
    </Reveal>}
    <div className="studio-footer-bottom">
      <Link href="/" className="footer-signature"><Image src="/favicon.ico" alt="" width={30} height={30} unoptimized /><span><strong>hitesh<em>.ml</em></strong><small>AI/ML Engineer · Chandigarh, India</small></span></Link>
      <nav className="footer-socials" aria-label="Social links">
        <a href="https://github.com/Hiteshydv001" target="_blank" rel="noopener noreferrer"><GithubLogo size={16} aria-hidden="true" />GitHub</a>
        <a href="https://www.linkedin.com/in/hitesh-kumar-ai" target="_blank" rel="noopener noreferrer"><LinkedinLogo size={16} aria-hidden="true" />LinkedIn</a>
        <a href="https://x.com/tensor_nets" target="_blank" rel="noopener noreferrer"><XLogo size={16} aria-hidden="true" />X</a>
        <a href="mailto:hiteshofficial0001@gmail.com"><EnvelopeSimple size={16} aria-hidden="true" />Email</a>
      </nav>
      <a href="#top" className="footer-top" aria-label="Back to top"><ArrowUp size={16} aria-hidden="true" /><span>Top</span></a>
    </div>
    {isContact && <div className="studio-footer-tools"><StudioTool type="booking" /><StudioTool type="assistant" /></div>}
    <FooterHorizon />
  </footer></IconContext.Provider>
}
