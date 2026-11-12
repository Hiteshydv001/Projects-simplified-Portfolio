'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

const GitHubCalendar = dynamic(() => import('react-github-calendar').then(module => module.GitHubCalendar), { ssr: false, loading: () => <p role="status" className="py-12">Loading contributions…</p> })
const theme = { light: ['#eeeeee','#a4e4f1','#74d4e9','#32c1e5','#147b96'], dark: ['#232b29','#175167','#1b7993','#32c1e5','#a4e4f1'] }
export default function GitHubActivity() {
  const { resolvedTheme } = useTheme()
  const section = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!section.current) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { rootMargin: '300px' })
    observer.observe(section.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={section} className="an-card an-github">
    <div className="an-card-head"><div><h2>GitHub contributions</h2><p>A little every day</p></div><a href="https://github.com/Hiteshydv001" target="_blank" rel="noopener noreferrer" className="rk-btn an-github-link">@Hiteshydv001 ↗</a></div>
    <div className="an-github-body">{visible ? <GitHubCalendar username="Hiteshydv001" theme={theme} colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'} blockSize={11} blockMargin={4} fontSize={12} /> : <p className="py-12" role="status">Contribution calendar</p>}</div>
  </div>
}
