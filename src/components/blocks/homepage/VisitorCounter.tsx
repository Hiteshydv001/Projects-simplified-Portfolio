'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import type { AnalyticsData } from '@/lib/analytics/data'

export function VisitorCounter() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const res = await fetch('/api/analytics?range=24h', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch visitor data')
        const visitorData = await res.json()
        setData(visitorData)

      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    const timer = window.setTimeout(fetchVisitorData, 2000)
    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return null
  }

  if (error || !data?.available) {
    return null
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-3 rounded-full border border-border/40 bg-background/60 px-4 py-2.5 backdrop-blur-md shadow-lg hover:border-border/60 transition-colors"
    >
      <Eye className="w-4 h-4 text-primary" />
      <Link href="/analytics" className="text-sm font-medium text-foreground">
        <span className="text-primary font-bold">
          {formatNumber(data.totals.pageViews)}
        </span>{' '}
        page views in the last 24 hours ↗
      </Link>
    </motion.div>
  )
}
