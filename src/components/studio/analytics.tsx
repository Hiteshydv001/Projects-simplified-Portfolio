'use client'

import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconContext, ArrowUpRight, ArrowDownRight, ArrowClockwise, ChartLine, Table, Users, Eye, Pulse, TrendUp, type Icon } from '@phosphor-icons/react'
import { analyticsRanges, type AnalyticsData, type AnalyticsPoint, type AnalyticsRange } from '@/lib/analytics/data'
import { useMotionSettings } from '@/components/layout/motion-provider'
import { StudioHeading } from './primitives'
import GitHubActivity from '@/components/blocks/homepage/GitHubActivity'

type Metric = 'visitors' | 'pageViews'

const number = (value: number) => value.toLocaleString('en-US')
const compact = (value: number) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
const periodLabels: Record<AnalyticsRange, string> = { '24h': 'Last 24 hours', '7d': 'Last 7 days', '30d': 'Last 30 days' }
const rangeLabels: Record<AnalyticsRange, string> = { '24h': '24h', '7d': '7 days', '30d': '30 days' }
const SERIES: Record<Metric, { label: string; color: string }> = {
  visitors: { label: 'Visitors', color: 'var(--an-s1)' },
  pageViews: { label: 'Page views', color: 'var(--an-s2)' },
}

function pointLabel(time: string, range: AnalyticsRange) {
  return new Intl.DateTimeFormat('en-US', range === '24h'
    ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }
    : { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(time))
}

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Delta({ value }: { value: number | null }) {
  if (value === null) return <span className="an-delta is-flat">No baseline yet</span>
  const down = value < 0
  const Arrow = down ? ArrowDownRight : ArrowUpRight
  return <span className={`an-delta ${down ? 'is-down' : 'is-up'}`}>
    <Arrow size={12} weight="bold" aria-hidden="true" />{down ? '−' : '+'}{Math.abs(value).toLocaleString('en-US', { maximumFractionDigits: 1 })}%
    <span className="sr-only">{down ? 'decrease' : 'increase'}</span><em>vs previous</em>
  </span>
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 120, h = 34, max = Math.max(1, ...values)
  const x = (i: number) => (i / Math.max(1, values.length - 1)) * (w - 4) + 2
  const y = (v: number) => h - 3 - (v / max) * (h - 8)
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const last = values.length - 1
  return <svg className="an-spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
    <path d={`${d} L${x(last)},${h} L${x(0)},${h} Z`} fill={color} opacity=".08" />
    <path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={x(last)} cy={y(values[last] ?? 0)} r="2.5" fill={color} />
  </svg>
}

function Kpi({ label, Icon: KpiIcon, value, sub, children, loading }: { label: string; Icon: Icon; value: string; sub?: React.ReactNode; children?: React.ReactNode; loading: boolean }) {
  return <section className="an-kpi" aria-label={label} aria-busy={loading}>
    <div className="an-kpi-head"><span className="an-kpi-icon" aria-hidden="true"><KpiIcon size={15} /></span>{label}</div>
    {loading ? <span className="an-skeleton an-skeleton-num" /> : <strong className="an-kpi-value">{value}</strong>}
    <div className="an-kpi-foot">{loading ? <span className="an-skeleton an-skeleton-line" /> : sub}{!loading && children}</div>
  </section>
}

/* ------------------------------------------------------------------ */
/*  Main chart                                                         */
/* ------------------------------------------------------------------ */

function TrafficChart({ points, range, show }: { points: AnalyticsPoint[]; range: AnalyticsRange; show: Record<Metric, boolean> }) {
  const id = useId().replace(/:/g, '')
  const { reduced } = useMotionSettings()
  const systemReduced = useReducedMotion()
  const [selected, setSelected] = useState<number | null>(null)
  const width = 860, height = 320
  const plot = { left: 44, top: 18, width: 790, height: 250 }
  const bottom = plot.top + plot.height
  const metrics = (['pageViews', 'visitors'] as Metric[]).filter(metric => show[metric])
  const largest = Math.max(1, ...points.flatMap(point => metrics.map(metric => point[metric])))
  const magnitude = 10 ** Math.floor(Math.log10(largest / 4))
  const step = Math.max(1, ([1, 2, 2.5, 5, 10].find(value => value * magnitude >= largest / 4) || 10) * magnitude)
  const ceiling = step * 4
  const x = (index: number) => plot.left + index / Math.max(1, points.length - 1) * plot.width
  const y = (value: number) => bottom - value / ceiling * plot.height
  const path = (metric: Metric) => points.map((point, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(point[metric]).toFixed(1)}`).join(' ')
  const active = selected === null ? null : points[selected]
  const labelEvery = range === '7d' ? 1 : range === '24h' ? 4 : 5
  const draw = reduced || systemReduced ? 0 : .7

  return <div className="an-plot">
    {active && <div className="an-tooltip" style={{ left: `clamp(80px, ${x(selected!) / width * 100}%, calc(100% - 80px))` }}>
      <span className="an-tooltip-time">{pointLabel(active.time, range)} UTC</span>
      {(['visitors', 'pageViews'] as Metric[]).filter(metric => show[metric]).map(metric => <span key={metric} className="an-tooltip-row"><i style={{ background: SERIES[metric].color }} />{SERIES[metric].label}<b>{number(active[metric])}</b></span>)}
    </div>}
    <svg viewBox={`0 0 ${width} ${height}`} className="an-chart" role="img" aria-label={`Visitors and page views, ${periodLabels[range].toLowerCase()}. Switch to the table view for exact values.`}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect()
        const location = (event.clientX - rect.left) / rect.width * width
        setSelected(Math.max(0, Math.min(points.length - 1, Math.round((location - plot.left) / plot.width * (points.length - 1)))))
      }} onPointerLeave={() => setSelected(null)}>
      <defs>
        <clipPath id={`${id}-reveal`}><motion.rect x={plot.left - 4} y="0" height={height} initial={{ width: draw ? 0 : plot.width + 8 }} animate={{ width: plot.width + 8 }} transition={{ duration: draw, ease: 'easeOut' }} /></clipPath>
      </defs>
      {[0, 1, 2, 3, 4].map(tick => <g key={tick} className="an-grid"><line x1={plot.left} x2={plot.left + plot.width} y1={y(tick * step)} y2={y(tick * step)} data-base={tick === 0 ? 'true' : undefined} /><text x={plot.left - 10} y={y(tick * step) + 4} textAnchor="end">{compact(tick * step)}</text></g>)}
      {points.map((point, index) => (index % labelEvery === 0 || index === points.length - 1) && <text key={point.time} className="an-axis-label" x={x(index)} y={bottom + 24} textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}>{pointLabel(point.time, range)}</text>)}
      <g clipPath={`url(#${id}-reveal)`}>
        {metrics.map(metric => <path key={metric} className="an-line" d={path(metric)} stroke={SERIES[metric].color} />)}
      </g>
      {active && <g className="an-crosshair"><line x1={x(selected!)} x2={x(selected!)} y1={plot.top} y2={bottom} />{metrics.map(metric => <circle key={metric} cx={x(selected!)} cy={y(active[metric])} r="5" fill={SERIES[metric].color} />)}</g>}
    </svg>
    <p className="sr-only" role="status">{active ? `${pointLabel(active.time, range)} UTC: ${number(active.visitors)} visitors and ${number(active.pageViews)} page views.` : ''}</p>
  </div>
}

function TrafficTable({ points, range }: { points: AnalyticsPoint[]; range: AnalyticsRange }) {
  const rows = [...points].reverse()
  return <div className="an-table-wrap">
    <table className="an-table">
      <thead><tr><th scope="col">{range === '24h' ? 'Hour (UTC)' : 'Day (UTC)'}</th><th scope="col">Visitors</th><th scope="col">Page views</th></tr></thead>
      <tbody>{rows.map(point => <tr key={point.time}><td>{pointLabel(point.time, range)}</td><td>{number(point.visitors)}</td><td>{number(point.pageViews)}</td></tr>)}</tbody>
    </table>
  </div>
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function StudioAnalytics() {
  const [range, setRange] = useState<AnalyticsRange>('7d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [show, setShow] = useState<Record<Metric, boolean>>({ visitors: true, pageViews: true })
  const [view, setView] = useState<'chart' | 'table'>('chart')

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

  // Keep at least one series on.
  const toggle = (metric: Metric) => setShow(current => !current[metric] || current[metric === 'visitors' ? 'pageViews' : 'visitors'] ? { ...current, [metric]: !current[metric] } : current)

  const traffic = !loading && !error && data?.available ? data : null
  const points = traffic?.points ?? []
  const perVisitor = traffic && traffic.totals.visitors ? traffic.totals.pageViews / traffic.totals.visitors : null
  const peak = points.reduce<AnalyticsPoint | null>((best, point) => !best || point.pageViews > best.pageViews ? point : best, null)
  const updated = traffic ? new Date(traffic.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) : null

  return <IconContext.Provider value={{ weight: 'duotone' }}>
    <div className="xp-page an-page">
      <header className="an-head">
        <StudioHeading note="a little transparency, in numbers">Analytics</StudioHeading>
        <div className="an-status">
          <span className={`an-live ${traffic ? 'is-live' : ''}`}><i aria-hidden="true" />{traffic ? 'Live' : loading ? 'Connecting' : 'Offline'}</span>
          {updated && <span className="an-updated">Updated {updated} UTC</span>}
          <button type="button" className="an-icon-btn" onClick={() => setRefresh(current => current + 1)} disabled={loading} aria-label="Refresh analytics"><ArrowClockwise size={16} weight="bold" className={loading ? 'an-spin' : ''} /></button>
        </div>
      </header>

      <div className="an-controls">
        <div className="an-segment" role="group" aria-label="Time range">
          {analyticsRanges.map(period => <button key={period} type="button" aria-pressed={period === range} className={period === range ? 'is-active' : ''} onClick={() => setRange(period)}>{rangeLabels[period]}</button>)}
        </div>
        <div className="an-legend" role="group" aria-label="Series">
          {(['visitors', 'pageViews'] as Metric[]).map(metric => <button key={metric} type="button" aria-pressed={show[metric]} className={show[metric] ? 'is-on' : ''} onClick={() => toggle(metric)}>
            <i style={{ background: SERIES[metric].color }} aria-hidden="true" />{SERIES[metric].label}
          </button>)}
        </div>
      </div>

      <div className="an-kpis">
        <Kpi label="Visitors" Icon={Users} loading={loading} value={traffic ? number(traffic.totals.visitors) : '—'} sub={traffic && <Delta value={traffic.change.visitors} />}>
          {traffic && <Sparkline values={points.map(point => point.visitors)} color={SERIES.visitors.color} />}
        </Kpi>
        <Kpi label="Page views" Icon={Eye} loading={loading} value={traffic ? number(traffic.totals.pageViews) : '—'} sub={traffic && <Delta value={traffic.change.pageViews} />}>
          {traffic && <Sparkline values={points.map(point => point.pageViews)} color={SERIES.pageViews.color} />}
        </Kpi>
        <Kpi label="Views per visitor" Icon={Pulse} loading={loading} value={perVisitor !== null ? perVisitor.toFixed(2) : '—'} sub={<span className="an-kpi-note">Pages each visitor opens</span>} />
        <Kpi label={range === '24h' ? 'Busiest hour' : 'Busiest day'} Icon={TrendUp} loading={loading} value={peak && peak.pageViews > 0 ? pointLabel(peak.time, range) : '—'} sub={<span className="an-kpi-note">{peak && peak.pageViews > 0 ? `${number(peak.pageViews)} page views` : 'No traffic yet'}</span>} />
      </div>

      <section className="an-card" aria-labelledby="traffic-title" aria-busy={loading}>
        <div className="an-card-head">
          <div><h2 id="traffic-title">Traffic</h2><p>{periodLabels[range]} · UTC</p></div>
          <div className="an-segment an-segment-sm" role="group" aria-label="View">
            <button type="button" aria-pressed={view === 'chart'} className={view === 'chart' ? 'is-active' : ''} onClick={() => setView('chart')}><ChartLine size={15} aria-hidden="true" />Chart</button>
            <button type="button" aria-pressed={view === 'table'} className={view === 'table' ? 'is-active' : ''} onClick={() => setView('table')}><Table size={15} aria-hidden="true" />Table</button>
          </div>
        </div>
        {traffic ? <>
          {view === 'chart' ? <TrafficChart key={range} points={points} range={range} show={show} /> : <TrafficTable points={points} range={range} />}
          {traffic.totals.pageViews === 0 && <p className="an-zero" role="status">No traffic recorded in this period yet.</p>}
        </> : <div className="an-empty" role="status">
          {loading ? <div className="an-chart-skeleton" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i} />)}</div> : <>
            <span className="xp-tile xp-tone-yellow" aria-hidden="true"><ChartLine size={18} /></span>
            <strong>{error ? 'Couldn’t load traffic' : 'No traffic data yet'}</strong>
            <p>{error ? 'The analytics service didn’t respond. Try again in a moment.' : 'Traffic data isn’t available yet. Check back soon.'}</p>
            <button type="button" className="rk-btn" onClick={() => setRefresh(current => current + 1)}><ArrowClockwise size={14} weight="bold" aria-hidden="true" />Try again</button>
          </>}
        </div>}
        <p className="an-footnote">Visitors are distinct browsers in the selected period; page views include repeat visits. The current hour or day is still in progress, and visitors who opt out of tracking aren’t counted.</p>
      </section>

      <section id="github-contributions" aria-label="GitHub contributions"><GitHubActivity /></section>
    </div>
  </IconContext.Provider>
}
