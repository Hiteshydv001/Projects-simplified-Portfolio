import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import dbConnect from '@/lib/mongodb/mongoose'
import Visitor from '@/lib/mongodb/models/Visitor'

function getClientIP(req: NextRequest): string {
  // Check multiple sources for IP address in order of reliability
  // This handles different proxy setups (CloudFlare, Vercel, nginx, etc.)
  
  // CloudFlare
  const cfIP = req.headers.get('cf-connecting-ip')
  if (cfIP && cfIP !== 'unknown') return cfIP

  // Vercel / Standard proxies
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    const ips = forwarded.split(',')
    const validIP = ips[0]?.trim()
    if (validIP && validIP !== 'unknown') return validIP
  }

  // Real IP header (nginx, some proxies)
  const realIP = req.headers.get('x-real-ip')
  if (realIP && realIP !== 'unknown') return realIP

  // Custom header
  const clientIP = req.headers.get('x-client-ip')
  if (clientIP && clientIP !== 'unknown') return clientIP

  // Socket address (last resort, doesn't work in all environments)
  return 'unknown'
}

function generateVisitorHash(req: NextRequest): string {
  // Hash IP + User-Agent to identify unique visitors
  const ip = getClientIP(req)
  const userAgent = req.headers.get('user-agent') || 'unknown'
  
  const combined = `${ip}:${userAgent}`
  return crypto.createHash('sha256').update(combined).digest('hex')
}

function getTodayDateString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const visitorHash = generateVisitorHash(req)
    const today = getTodayDateString()
    const shouldCount = req.nextUrl.searchParams.get('count') === 'true'

    // Find or create visitor record
    let visitor = await Visitor.findOne()

    if (!visitor) {
      if (shouldCount) {
        visitor = await Visitor.create({
          totalCount: 1,
          uniqueVisitors: 1,
          visitors: [
            {
              hash: visitorHash,
              firstVisit: new Date(),
              lastVisit: new Date(),
              visitCount: 1,
            },
          ],
          dailyStats: [
            {
              date: today,
              count: 1,
              uniqueCount: 1,
            },
          ],
        })
      } else {
        // Initialize with zero counts if not counting
        visitor = await Visitor.create({
          totalCount: 0,
          uniqueVisitors: 0,
          visitors: [],
          dailyStats: [],
        })
      }
    } else if (shouldCount) {
      // Check if visitor hash exists
      const existingVisitor = visitor.visitors.find(
        (v: any) => v.hash === visitorHash
      )

      const existingDailyStats = visitor.dailyStats.find(
        (stat: any) => stat.date === today
      )

      let isNewUnique = false

      if (!existingVisitor) {
        // New unique visitor
        visitor.visitors.push({
          hash: visitorHash,
          firstVisit: new Date(),
          lastVisit: new Date(),
          visitCount: 1,
        })
        visitor.uniqueVisitors += 1
        isNewUnique = true
      } else {
        // Returning visitor - update last visit and count
        existingVisitor.lastVisit = new Date()
        existingVisitor.visitCount += 1
      }

      // Increment total count
      visitor.totalCount += 1

      if (!existingDailyStats) {
        // New day
        visitor.dailyStats.push({
          date: today,
          count: 1,
          uniqueCount: isNewUnique ? 1 : 0,
        })
      } else {
        // Update today's stats
        existingDailyStats.count += 1
        if (isNewUnique) {
          existingDailyStats.uniqueCount += 1
        }
      }

      visitor.updatedAt = new Date()
      await visitor.save()
    }

    return NextResponse.json({
      totalCount: visitor.totalCount,
      uniqueVisitors: visitor.uniqueVisitors,
      todayCount: visitor.dailyStats.find(
        (stat: any) => stat.date === today
      )?.count || 0,
      todayUniqueCount: visitor.dailyStats.find(
        (stat: any) => stat.date === today
      )?.uniqueCount || 0,
    })
  } catch (error) {
    console.error('Visitor API Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to track visitor',
        totalCount: 0,
        uniqueVisitors: 0,
      },
      { status: 500 }
    )
  }
}
