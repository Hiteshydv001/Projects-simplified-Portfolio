'use client'

import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, ChartNoAxesCombined, RefreshCw, Settings2 } from 'lucide-react'
import { analyticsRanges, type AnalyticsData, type AnalyticsPoint, type AnalyticsRange } from '@/lib/analytics/data'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { SelectionFrame } from './primitives'
import { Reveal } from './motion'
import GitHubActivity from '@/components/blocks/homepage/GitHubActivity'

const number = (value: number) => value.toLocaleString('en-US')
const periodLabels = { '24h': 'last 24 hours', '7d': 'last 7 days', '30d': 'last 30 days' }
function pointLabel(time: string, range: AnalyticsRange) {
  return new Intl.DateTimeFormat('en-US', range === '24h'
    ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }
    : { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(time))
}

function TrafficChart({ points, range, visitors, pageViews }: { points: AnalyticsPoint[]; range: AnalyticsRange; visitors: boolean; pageViews: boolean }) {
  const id = useId().replace(/:/g, '')
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const [selected, setSelected] = useState<number | null>(null)
  const width = 820, height = 350
  const plot = { left: 58, top: 28, width: 738, height: 260 }
  const bottom = plot.top + plot.height
  const largest = Math.max(1, ...points.flatMap(point => [visitors ? point.visitors : 0, pageViews ? point.pageViews : 0]))
  const magnitude = 10 ** Math.floor(Math.log10(largest / 3))
  const step = Math.max(1, ([1, 2, 5, 10].find(value => value * magnitude >= largest / 3) || 10) * magnitude)
  const ceiling = step * 3
  const x = (index: number) => plot.left + index / Math.max(1, points.length - 1) * plot.width
  const y = (value: number) => bottom - value / ceiling * plot.height
  const path = (metric: 'visitors' | 'pageViews') => points.map((point, index) => `${index ? 'L' : 'M'}${x(index)},${y(point[metric])}`).join(' ')
  const area = (metric: 'visitors' | 'pageViews') => `${path(metric)} L${x(points.length - 1)},${bottom} L${plot.left},${bottom} Z`
  const active = selected === null ? null : points[selected]
  const labelEvery = range === '7d' ? 1 : range === '24h' ? 4 : 5
  const draw = reduced || systemReduced ? 0 : .65

  return <div className="analytics-plot">
    {active && <div className="analytics-tooltip" style={{ left: `clamp(95px, ${x(selected!) / width * 100}%, calc(100% - 95px))` }}>
      <strong>{pointLabel(active.time, range)} UTC</strong>
      {visitors && <span><i className="analytics-dot visitors-dot" />Visitors <b>{number(active.visitors)}</b></span>}
      {pageViews && <span><i className="analytics-dot views-dot" />Page views <b>{number(active.pageViews)}</b></span>}
    </div>}
    <svg viewBox={`0 0 ${width} ${height}`} className="analytics-chart" role="img" aria-label={`Visitors and page views over the ${periodLabels[range]}. Use the chart slider below for exact values.`}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect()
        const location = (event.clientX - rect.left) / rect.width * width
        setSelected(Math.max(0, Math.min(points.length - 1, Math.round((location - plot.left) / plot.width * (points.length - 1)))))
      }} onPointerLeave={() => setSelected(null)}>
      <defs>
        <linearGradient id={`${id}-visitors`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--studio-green)" stopOpacity=".2" /><stop offset="100%" stopColor="var(--studio-green)" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-views`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--studio-pink)" stopOpacity=".16" /><stop offset="100%" stopColor="var(--studio-pink)" stopOpacity="0" /></linearGradient>
        <clipPath id={`${id}-reveal`}><motion.rect x={plot.left - 3} y="0" height={height} initial={{ width: draw ? 0 : plot.width + 6 }} animate={{ width: plot.width + 6 }} transition={{ duration: draw, ease: 'easeOut' }} /></clipPath>
      </defs>
      {[0, 1, 2, 3].map(tick => <g key={tick} className="analytics-axis"><line x1={plot.left} x2={plot.left + plot.width} y1={y(tick * step)} y2={y(tick * step)} /><text x={plot.left - 13} y={y(tick * step) + 4} textAnchor="end">{new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(tick * step)}</text></g>)}
      <g clipPath={`url(#${id}-reveal)`}>
        {pageViews && <><path d={area('pageViews')} fill={`url(#${id}-views)`} /><path className="analytics-line" d={path('pageViews')} stroke="var(--studio-pink)" /></>}
        {visitors && <><path d={area('visitors')} fill={`url(#${id}-visitors)`} /><path className="analytics-line" d={path('visitors')} stroke="var(--studio-green)" /></>}
      </g>
      {points.map((point, index) => (index % labelEvery === 0 || index === points.length - 1) && <text key={point.time} className="analytics-axis-label" x={x(index)} y={bottom + 25} textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}>{pointLabel(point.time, range)}</text>)}
      {active && <g className="analytics-crosshair"><line x1={x(selected!)} x2={x(selected!)} y1={plot.top} y2={bottom} />{visitors && <circle cx={x(selected!)} cy={y(active.visitors)} r="5" fill="var(--studio-green)" />}{pageViews && <circle cx={x(selected!)} cy={y(active.pageViews)} r="5" fill="var(--studio-pink)" />}</g>}
    </svg>
    <label className="analytics-chart-reader"><span>Explore the chart</span><input type="range" min="0" max={points.length - 1} value={selected ?? points.length - 1} onChange={event => setSelected(Number(event.target.value))} aria-label="Explore traffic by time" aria-valuetext={`${pointLabel(points[selected ?? points.length - 1].time, range)} UTC: ${number(points[selected ?? points.length - 1].visitors)} visitors, ${number(points[selected ?? points.length - 1].pageViews)} page views`} /></label>
    <p className="sr-only" role="status">{active ? `${pointLabel(active.time, range)} UTC: ${number(active.visitors)} visitors and ${number(active.pageViews)} page views.` : ''}</p>
  </div>
}

export function StudioAnalytics() {
  const [range, setRange] = useState<AnalyticsRange>('7d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [visible, setVisible] = useState({ visitors: true, pageViews: true })

  useEffect(() => {
    const update = () => setRefresh(current => current + 1)
    window.addEventListener('studio-traffic-updated', update)
    return () => window.removeEventListener('studio-traffic-updated', update)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    let active = true
    setLoading(true); setError(false); setData(null)
    async function load() {
      try {
        const response = await fetch(`/api/analytics?range=${range}`, { cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('Unavailable')
        const result: AnalyticsData = await response.json()
        if (active) setData(result)
      } catch { if (active) setError(true) }
      finally { window.clearTimeout(timeout); if (active) setLoading(false) }
    }
    void load()
    return () => { active = false; window.clearTimeout(timeout); controller.abort() }
  }, [range, refresh])

  function toggleSeries(metric: 'visitors' | 'pageViews') {
    setVisible(current => !current[metric] || current[metric === 'visitors' ? 'pageViews' : 'visitors'] ? { ...current, [metric]: !current[metric] } : current)
  }

  const traffic = !loading && !error && data?.available ? data : null
  return <div className="analytics-page">
    <Reveal><div className="analytics-heading"><SelectionFrame color="ink" className="analytics-title"><h1><span>/</span>analytics</h1></SelectionFrame><p>A little transparency, in numbers.</p></div></Reveal>
    <Reveal delay={.08}>
      <div className="analytics-summary" aria-busy={loading}>
        {(['visitors', 'pageViews'] as const).map(metric => {
          const change = traffic ? traffic.change[metric] : null
          return <section className="analytics-stat" key={metric} aria-label={metric === 'visitors' ? 'Visitors' : 'Page views'}>
            <h2>{metric === 'visitors' ? 'Visitors' : 'Page Views'}</h2>
            <strong className={loading ? 'analytics-loading-value' : ''}>{traffic ? number(traffic.totals[metric]) : '—'}</strong>
            {change !== null ? <p className={`analytics-change ${change < 0 ? 'is-negative' : ''}`}>{change < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}{Math.abs(change).toLocaleString('en-US', { maximumFractionDigits: 1 })}% <span>vs previous period</span></p> : <p className="analytics-baseline">{loading ? 'Loading traffic…' : traffic ? 'No previous-period baseline yet' : 'Waiting for traffic data'}</p>}
          </section>
        })}
      </div>
    </Reveal>
    <Reveal delay={.15}>
      <section id="traffic" className="analytics-panel" aria-labelledby="traffic-chart-title" aria-busy={loading}>
        <div className="analytics-panel-top"><h2 id="traffic-chart-title"><Settings2 size={17} aria-hidden="true" /><span>~/analytics.tsx</span></h2><div className="analytics-periods" role="group" aria-label="Time range">{analyticsRanges.map(period => <button type="button" key={period} aria-pressed={period === range} onClick={() => setRange(period)}>{period.toUpperCase()}</button>)}</div></div>
        <div className="analytics-chart-toolbar"><span>{periodLabels[range]} · UTC</span><div className="analytics-legend"><button type="button" aria-pressed={visible.visitors} onClick={() => toggleSeries('visitors')}><i className="analytics-dot visitors-dot" />Visitors</button><button type="button" aria-pressed={visible.pageViews} onClick={() => toggleSeries('pageViews')}><i className="analytics-dot views-dot" />Page Views</button></div></div>
        {traffic ? <><TrafficChart key={range} points={traffic.points} range={range} visitors={visible.visitors} pageViews={visible.pageViews} />{traffic.totals.pageViews === 0 && <p className="analytics-zero" role="status">No traffic recorded in this period yet.</p>}</> : <div className="analytics-empty" role="status"><ChartNoAxesCombined size={34} strokeWidth={1.3} /><h3>{loading ? 'Reading the traffic…' : error ? 'Couldn’t load traffic.' : 'The story starts here.'}</h3><p>{loading ? 'Gathering visitors and page views.' : error ? 'Try refreshing in a moment.' : 'Traffic data isn’t available yet. Check back soon.'}</p></div>}
        <div className="analytics-panel-bottom"><span>{traffic ? `Updated ${new Date(traffic.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC` : 'Public traffic overview'}<span className="analytics-live-dot" data-live={!!traffic} /></span><button type="button" onClick={() => setRefresh(current => current + 1)} disabled={loading} aria-label="Refresh analytics"><RefreshCw size={14} />Refresh</button></div>
      </section>
    </Reveal>
    <p className="analytics-footnote">Visitors are distinct browsers within the selected period. Page views include repeat visits. Current hours and days are still in progress; privacy opt-outs aren’t tracked.</p>
    <section id="github-contributions" aria-label="GitHub contributions"><GitHubActivity /></section>
  </div>
}
