'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { cn } from '@/lib/utils/utils'

interface VisitorData {
  totalCount: number
  uniqueVisitors: number
  todayCount: number
  todayUniqueCount: number
}

export function VisitorCounter() {
  const [data, setData] = useState<VisitorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Check if we've already counted this session
        const hasCountedSession = sessionStorage.getItem('visitor_counted')
        
        const res = await fetch(`/api/visitor?count=${!hasCountedSession}`)
        if (!res.ok) throw new Error('Failed to fetch visitor data')
        const visitorData = await res.json()
        setData(visitorData)
        
        // Mark session as counted
        if (!hasCountedSession) {
          sessionStorage.setItem('visitor_counted', 'true')
        }
      } catch (err) {
        console.error('Error fetching visitor data:', err)
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

  if (error || !data) {
    return null
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  const getSuffix = (num: number) => {
    if (num % 100 >= 11 && num % 100 <= 13) return 'th'
    switch (num % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-3 rounded-full border border-border/40 bg-background/60 px-4 py-2.5 backdrop-blur-md shadow-lg hover:border-border/60 transition-colors"
    >
      <Eye className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground">
        You are the{' '}
        <span className="text-primary font-bold">
          {formatNumber(data.totalCount)}{getSuffix(data.totalCount)}
        </span>{' '}
        visitor
      </span>
    </motion.div>
  )
}

export function VisitorStats() {
  const [data, setData] = useState<VisitorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const res = await fetch('/api/visitor')
        if (!res.ok) throw new Error('Failed to fetch visitor data')
        const visitorData = await res.json()
        setData(visitorData)
      } catch (err) {
        console.error('Error fetching visitor data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorData()
  }, [])

  if (loading || !data) {
    return null
  }

  const stats = [
    {
      label: 'Total Visitors',
      value: data.totalCount.toLocaleString('en-US'),
      icon: '👥',
    },
    {
      label: 'Unique Visitors',
      value: data.uniqueVisitors.toLocaleString('en-US'),
      icon: '🔍',
    },
    {
      label: 'Today',
      value: data.todayCount.toLocaleString('en-US'),
      icon: '📅',
    },
    {
      label: 'Unique Today',
      value: data.todayUniqueCount.toLocaleString('en-US'),
      icon: '✨',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="rounded-lg border border-border/40 bg-background/60 p-4 backdrop-blur-sm"
        >
          <p className="text-lg font-semibold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.icon} {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
