import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb/mongoose'
import AnalyticsVisit from '@/lib/mongodb/models/AnalyticsVisit'
import { analyticsRanges, analyticsVisitorIdPattern, analyticsWindow, emptyAnalytics, type AnalyticsRange } from '@/lib/analytics/data'
import { guardWrite, readJson, stringField, RequestError, requestFailure } from '@/lib/security/request'

export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store' }

type AggregateTotals = { _id: string; visitors: number; pageViews: number }
type AggregateBucket = { _id: string; visitors: number; pageViews: number }
type AggregateResult = { totals: AggregateTotals[]; points: AggregateBucket[] }

export async function GET(request: Request) {
  try {
    const range = new URL(request.url).searchParams.get('range') || '7d'
    if (!analyticsRanges.includes(range as AnalyticsRange)) throw new RequestError('Choose 24h, 7d, or 30d.')
    const selected = range as AnalyticsRange
    const now = new Date()
    const data = emptyAnalytics(selected, !!process.env.MONGODB_URI, now)
    if (!data.available) return NextResponse.json(data, { headers })
    await dbConnect()
    const { start, end, previousStart } = analyticsWindow(selected, now)
    const bucketFormat = selected === '24h' ? '%Y-%m-%dT%H:00:00.000Z' : '%Y-%m-%dT00:00:00.000Z'
    const [result] = await AnalyticsVisit.aggregate<AggregateResult>([
      { $match: { hour: { $gte: previousStart, $lt: end } } },
      { $facet: {
        totals: [
          { $group: { _id: { period: { $cond: [{ $gte: ['$hour', start] }, 'current', 'previous'] }, visitor: '$visitorHash' }, pageViews: { $sum: '$views' } } },
          { $group: { _id: '$_id.period', visitors: { $sum: 1 }, pageViews: { $sum: '$pageViews' } } },
        ],
        points: [
          { $match: { hour: { $gte: start } } },
          { $group: { _id: { time: { $dateToString: { date: '$hour', format: bucketFormat, timezone: 'UTC' } }, visitor: '$visitorHash' }, pageViews: { $sum: '$views' } } },
          { $group: { _id: '$_id.time', visitors: { $sum: 1 }, pageViews: { $sum: '$pageViews' } } },
        ],
      } },
    ]).option({ maxTimeMS: 8000 })
    const current = result?.totals.find(item => item._id === 'current')
    const previous = result?.totals.find(item => item._id === 'previous')
    data.totals = { visitors: current?.visitors || 0, pageViews: current?.pageViews || 0 }
    for (const metric of ['visitors', 'pageViews'] as const) {
      const baseline = previous?.[metric] || 0
      data.change[metric] = baseline ? Math.round((data.totals[metric] - baseline) / baseline * 1000) / 10 : null
    }
    const buckets = new Map(result?.points.map(point => [point._id, point]) || [])
    data.points = data.points.map(point => {
      const bucket = buckets.get(point.time)
      return { time: point.time, visitors: bucket?.visitors || 0, pageViews: bucket?.pageViews || 0 }
    })
    return NextResponse.json(data, { headers })
  } catch (error) { return requestFailure(error, 'Traffic data is temporarily unavailable. Please try again.') }
}

export async function POST(request: Request) {
  try {
    guardWrite(request, 'analytics', 60, 3000)
    const payload = await readJson(request, 512)
    const visitorId = stringField(payload.visitorId, 'visitor ID', 36)
    if (!analyticsVisitorIdPattern.test(visitorId)) throw new RequestError('Invalid visitor ID.')
    if (!process.env.MONGODB_URI) return NextResponse.json({ tracked: false }, { headers })
    await dbConnect()
    const visitorHash = createHash('sha256').update(visitorId.toLowerCase()).digest('hex')
    const hour = new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000)
    // Atomic increments avoid losing simultaneous page views. Retry a concurrent first upsert.
    try {
      await AnalyticsVisit.updateOne({ visitorHash, hour }, { $inc: { views: 1 } }, { upsert: true })
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
        await AnalyticsVisit.updateOne({ visitorHash, hour }, { $inc: { views: 1 } })
      } else throw error
    }
    return NextResponse.json({ tracked: true }, { headers })
  } catch (error) { return requestFailure(error, 'Traffic tracking is temporarily unavailable.') }
}
