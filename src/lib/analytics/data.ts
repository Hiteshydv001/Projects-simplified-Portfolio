export const analyticsRanges = ['24h', '7d', '30d'] as const
export type AnalyticsRange = typeof analyticsRanges[number]
export const analyticsVisitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export type AnalyticsPoint = { time: string; visitors: number; pageViews: number }
export type AnalyticsData = {
  available: boolean
  range: AnalyticsRange
  updatedAt: string
  points: AnalyticsPoint[]
  totals: { visitors: number; pageViews: number }
  change: { visitors: number | null; pageViews: number | null }
}

export function analyticsWindow(range: AnalyticsRange, now = new Date()) {
  const hourly = range === '24h'
  const count = hourly ? 24 : range === '7d' ? 7 : 30
  const step = (hourly ? 1 : 24) * 60 * 60 * 1000
  const end = new Date(Math.floor(now.getTime() / step) * step + step)
  const start = new Date(end.getTime() - count * step)
  return { start, end, previousStart: new Date(start.getTime() - count * step), step, count }
}

export function emptyAnalytics(range: AnalyticsRange, available: boolean, now = new Date()): AnalyticsData {
  const { start, step, count } = analyticsWindow(range, now)
  return {
    available, range, updatedAt: now.toISOString(), totals: { visitors: 0, pageViews: 0 },
    change: { visitors: null, pageViews: null },
    points: Array.from({ length: count }, (_, index) => ({ time: new Date(start.getTime() + index * step).toISOString(), visitors: 0, pageViews: 0 })),
  }
}
