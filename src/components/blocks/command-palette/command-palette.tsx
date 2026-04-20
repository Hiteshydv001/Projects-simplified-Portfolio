'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  FileText,
  Briefcase,
  Code,
  Github,
  Mail,
  Share2,
  Moon,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

const baseActions = [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the homepage',
    shortcut: 'H',
    icon: Home,
  },
  {
    id: 'about',
    label: 'Go to About',
    description: 'View portfolio and experience',
    shortcut: 'A',
    icon: Briefcase,
  },
  {
    id: 'articles',
    label: 'Go to Articles',
    description: 'Browse all blog posts',
    shortcut: 'B',
    icon: BookOpen,
  },
  {
    id: 'projects',
    label: 'Go to Projects',
    description: 'View all projects and portfolio work',
    shortcut: 'P',
    icon: Layers,
  },
  {
    id: 'papers',
    label: 'Go to Papers',
    description: 'View research papers',
    shortcut: 'R',
    icon: FileText,
  },
  {
    id: 'resume',
    label: 'Go to Resume',
    description: 'Download CV and view resume',
    shortcut: 'C',
    icon: Award,
  },
  {
    id: 'theme',
    label: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    shortcut: 'T',
    icon: Moon,
  },
  {
    id: 'github',
    label: 'View GitHub Profile',
    description: 'Open GitHub repository in a new tab',
    shortcut: 'G',
    icon: Github,
  },
  {
    id: 'email',
    label: 'Copy Email',
    description: 'Copy email address to clipboard',
    shortcut: 'E',
    icon: Mail,
  },
  {
    id: 'share',
    label: 'Share Page',
    description: 'Share the current page',
    shortcut: 'S',
    icon: Share2,
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const actions = useMemo(() => baseActions, [])

  const handleSelect = useCallback((actionId: string) => {
    switch (actionId) {
      case 'home':
        router.push('/')
        break
      case 'about':
        router.push('/about')
        break
      case 'articles':
        router.push('/articles')
        break
      case 'projects':
        router.push('/projects')
        break
      case 'papers':
        router.push('/paper-implementations')
        break
      case 'resume':
        router.push('/resume')
        break
      case 'theme':
        setTheme(theme === 'dark' ? 'light' : 'dark')
        break
      case 'github':
        if (typeof window !== 'undefined') {
          window.open('https://github.com/Hiteshydv001', '_blank')
        }
        break
      case 'email':
        if (typeof navigator !== 'undefined') {
          navigator.clipboard.writeText('hiteshofficial0001@gmail.com')
        }
        break
      case 'share':
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({
            title: 'Check out my portfolio',
            url: window.location.href,
          })
        }
        break
      default:
        break
    }

    setOpen(false)
    setSearch('')
  }, [router, setTheme, theme])

  // Open command palette with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((open) => !open)
      }

      // Handle individual shortcuts
      if (open) return

      const action = actions.find((a) => a.shortcut?.toLowerCase() === e.key.toLowerCase())
      if (action && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleSelect(action.id)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, actions, handleSelect])

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(search.toLowerCase()) ||
    action.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Command Palette Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-background/60 transition-colors backdrop-blur-sm"
      >
        <Code className="w-3 h-3" />
        <span>Search...</span>
        <kbd className="ml-auto hidden lg:inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Command Menu */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl rounded-xl border border-border/40 bg-background/90 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md overflow-hidden pointer-events-auto"
              >
                <Command
                  shouldFilter={false}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      setOpen(false)
                    }
                  }}
                  className="[&_[cmdk-input]]:h-12 [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:border-b [&_[cmdk-input]]:border-border/40 [&_[cmdk-input]]:text-foreground [&_[cmdk-input]]:placeholder:text-muted-foreground"
                >
                  <div className="flex items-center border-b border-border/40 px-4">
                    <Code className="w-4 h-4 text-primary mr-2" />
                    <Command.Input
                      autoFocus
                      placeholder="Type a command or search..."
                      value={search}
                      onValueChange={setSearch}
                      className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <Command.List className="max-h-[300px] overflow-y-auto scrollbar-hide">
                  {filteredActions.length === 0 ? (
                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </Command.Empty>
                  ) : (
                    <>
                      <Command.Group
                        heading="Navigation"
                        className="overflow-hidden p-1 text-muted-foreground"
                      >
                        {filteredActions
                          .filter((a) => ['home', 'about', 'articles', 'projects', 'papers', 'resume'].includes(a.id))
                          .map((action) => {
                            const Icon = action.icon
                            return (
                              <Command.Item
                                key={action.id}
                                value={`${action.label} ${action.description}`}
                                onSelect={() => handleSelect(action.id)}
                                className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/20 aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent/10 hover:text-primary transition-colors"
                              >
                                <Icon className="mr-2 h-4 w-4 text-primary" />
                                <div className="flex-1">
                                  <div className="text-foreground font-medium">{action.label}</div>
                                  <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                                <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                                  <span className="text-xs">⌘</span>
                                  {action.shortcut}
                                </kbd>
                              </Command.Item>
                            )
                          })}
                      </Command.Group>

                      <Command.Group
                        heading="Features"
                        className="overflow-hidden p-1 text-muted-foreground"
                      >
                        {filteredActions
                          .filter((a) => ['theme', 'github', 'email', 'share'].includes(a.id))
                          .map((action) => {
                            const Icon = action.icon
                            return (
                              <Command.Item
                                key={action.id}
                                value={`${action.label} ${action.description}`}
                                onSelect={() => handleSelect(action.id)}
                                className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/20 aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent/10 hover:text-primary transition-colors"
                              >
                                <Icon className="mr-2 h-4 w-4 text-primary" />
                                <div className="flex-1">
                                  <div className="text-foreground font-medium">{action.label}</div>
                                  <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                                <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                                  <span className="text-xs">⌘</span>
                                  {action.shortcut}
                                </kbd>
                              </Command.Item>
                            )
                          })}
                      </Command.Group>
                    </>
                  )}
                  </Command.List>
                </Command>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
