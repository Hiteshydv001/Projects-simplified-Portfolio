'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useMotionSettings } from '@/components/layout/motion-provider'

/* ------------------------------------------------------------------ */
/*  Procedural planet texture (built once, sampled every frame)        */
/* ------------------------------------------------------------------ */

const TEX_W = 512
const TEX_H = 256

function hash3(x: number, y: number, z: number) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

function valueNoise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi, yf = y - yi, zf = z - zi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz)
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  )
}

function fbm(x: number, y: number, z: number) {
  let sum = 0, amp = 0.5, freq = 1
  for (let i = 0; i < 5; i++) {
    sum += amp * valueNoise(x * freq, y * freq, z * freq)
    amp *= 0.5
    freq *= 2.03
  }
  return sum
}

/** 0 = ocean, 1 = land, 2 = ice. Plus a "relief" channel for texture. */
function buildPlanet() {
  const kind = new Uint8Array(TEX_W * TEX_H)
  const relief = new Float32Array(TEX_W * TEX_H)
  const lights = new Uint8Array(TEX_W * TEX_H)
  for (let j = 0; j < TEX_H; j++) {
    const lat = (0.5 - (j + 0.5) / TEX_H) * Math.PI
    for (let i = 0; i < TEX_W; i++) {
      const lon = ((i + 0.5) / TEX_W) * Math.PI * 2 - Math.PI
      const px = Math.cos(lat) * Math.cos(lon), py = Math.sin(lat), pz = Math.cos(lat) * Math.sin(lon)
      // Domain warp gives continents ragged, believable coastlines.
      const wx = fbm(px * 1.3 + 11, py * 1.3, pz * 1.3) - 0.5
      const n = fbm(px * 1.7 + wx * 1.4 + 3.1, py * 1.7 + wx, pz * 1.7 - wx * 0.8)
      const idx = j * TEX_W + i
      const absLat = Math.abs(lat)
      relief[idx] = n
      if (absLat > 1.4 + (n - 0.5) * 0.3) kind[idx] = 2
      else if (n > 0.53) {
        kind[idx] = 1
        // Cities hug coastlines and temperate latitudes.
        const coast = 1 - Math.min(1, (n - 0.53) / 0.08)
        const temperate = 1 - Math.min(1, Math.abs(absLat - 0.6) / 0.6)
        if (hash3(i, j, 7) < 0.05 + coast * temperate * 0.35) lights[idx] = 1
      }
    }
  }
  return { kind, relief, lights }
}

let planetCache: ReturnType<typeof buildPlanet> | null = null

/* ------------------------------------------------------------------ */
/*  Palettes                                                           */
/* ------------------------------------------------------------------ */

type Palette = {
  ocean: number[]; land: number[]; ice: number[]; atmo: number[]
  city: number; star: number[]; sat: { outline: string; panel: string; cell: string; cellLit: string; top: string; left: string; right: string; beacon: string; glint: string }; ping: string
}

const rgba = (hex: string, a = 255) => {
  const n = parseInt(hex.slice(1), 16)
  // ImageData on little-endian = ABGR packing
  return ((a << 24) | ((n & 0xff) << 16) | (((n >> 8) & 0xff) << 8) | ((n >> 16) & 0xff)) >>> 0
}

const PALETTES: Record<'dark' | 'light', Palette> = {
  dark: {
    ocean: ['#0a2552', '#12479a', '#2470cc', '#5aa8ee', '#b4defc'].map(c => rgba(c)),
    land: ['#0f3a40', '#17605e', '#1f8f86', '#46c2b0', '#a7ecd9'].map(c => rgba(c)),
    ice: ['#4a6a8a', '#9fc4e0', '#e6f4ff', '#ffffff', '#ffffff'].map(c => rgba(c)),
    atmo: ['#1f63c4', '#4aa6f0', '#a6dcff'].map(c => rgba(c, 255)),
    city: rgba('#edb62a'),
    star: ['#3a4a5e', '#7d93ad', '#dbe9ff'].map(c => rgba(c)),
    sat: { outline: '#0c2350', panel: '#1d4f9e', cell: '#7cc4fb', cellLit: '#e6f6ff', top: '#ffffff', left: '#e4ecf6', right: '#a9dafe', beacon: '#ff4d6d', glint: '#a6dcff' },
    ping: '#edb62a',
  },
  light: {
    ocean: ['#9cc3ea', '#5f9ddc', '#2f74c4', '#1a55a3', '#0d3a7a'].map(c => rgba(c)),
    land: ['#8fd3e2', '#4fb8d3', '#1f93b5', '#137590', '#0b4f63'].map(c => rgba(c)),
    ice: ['#c9dbea', '#a2bfd8', '#7f9fbd', '#5e809f', '#4a6a8a'].map(c => rgba(c)),
    atmo: ['#b8d8f5', '#7fb6ea', '#3f8ad8'].map(c => rgba(c, 255)),
    city: rgba('#d18f00'),
    star: ['#d5dde6', '#aab7c6', '#6f8094'].map(c => rgba(c)),
    sat: { outline: '#0b1f40', panel: '#1f5fbf', cell: '#8fd0ff', cellLit: '#ffffff', top: '#ffffff', left: '#e3ebf5', right: '#9fd3ff', beacon: '#eb1765', glint: '#32c1e5' },
    ping: '#eb1765',
  },
}

/* 4x4 Bayer matrix, normalised to (0,1). */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16)

/* ------------------------------------------------------------------ */
/*  Canvas globe                                                       */
/* ------------------------------------------------------------------ */

type Ping = { lat: number; lon: number; born: number }

function PixelGlobe({ reduced, theme }: { reduced: boolean; theme: 'dark' | 'light' }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fxRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)
  const redrawRef = useRef<() => void>(() => {})
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current, fx = fxRef.current
    if (!canvas || !wrap || !fx) return
    // Planet is dithered at CSS resolution; satellites, pings and meteors draw crisp on an overlay at device resolution.
    const pctx = canvas.getContext('2d')
    const ctx = fx.getContext('2d')
    if (!pctx || !ctx) return
    const planet = planetCache ?? (planetCache = buildPlanet())

    const CELL = 4 // css px per dither cell
    const DOT = 3 // drawn square inside each cell
    const TILT = 0.12

    let w = 0, h = 0, cols = 0, rows = 0, R = 0, cx = 0, cy = 0
    let img: ImageData | null = null, buf32: Uint32Array | null = null
    let stars: { x: number; y: number; p: number; s: number }[] = []

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width)); h = Math.max(1, Math.round(rect.height))
      canvas.width = w; canvas.height = h
      cols = Math.ceil(w / CELL); rows = Math.ceil(h / CELL)
      R = Math.max(w * 0.56, h * 1.05)
      cx = w / 2
      cy = h * 0.3 + R
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      fx.width = Math.round(w * dpr); fx.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      img = pctx.createImageData(w, h)
      buf32 = new Uint32Array(img.data.buffer)
      stars = Array.from({ length: Math.round((w * h) / 2600) }, () => ({
        x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows),
        p: Math.random() * Math.PI * 2, s: 0.6 + Math.random() * 1.8,
      }))
    }
    resize()

    // Interaction state
    let rot = 0.4, vel = 0, dragging = false, lastX = 0, lastT = 0
    const light = { x: -0.55, y: 0.65, tx: -0.55, ty: 0.65 }
    const pings: Ping[] = []
    let meteor: { x: number; y: number; vx: number; vy: number; life: number } | null = null
    let nextMeteor = performance.now() + 2500

    const fillCell = (cxl: number, cyl: number, color: number, size = DOT) => {
      if (!buf32) return
      const x0 = cxl * CELL, y0 = cyl * CELL
      for (let yy = 0; yy < size; yy++) {
        const y = y0 + yy
        if (y >= h) break
        const row = y * w
        for (let xx = 0; xx < size; xx++) {
          const x = x0 + xx
          if (x < w) buf32[row + x] = color
        }
      }
    }

    /** Screen → (lat, lon) on the globe, or null if off-planet. */
    const pick = (sx: number, sy: number) => {
      const dx = (sx - cx) / R, dy = -(sy - cy) / R
      const d2 = dx * dx + dy * dy
      if (d2 >= 1) return null
      const z = Math.sqrt(1 - d2)
      const ct = Math.cos(TILT), st = Math.sin(TILT)
      const y1 = dy * ct - z * st, z1 = dy * st + z * ct
      const cr = Math.cos(rot), sr = Math.sin(rot)
      const x2 = dx * cr + z1 * sr, z2 = -dx * sr + z1 * cr
      return { lat: Math.asin(Math.max(-1, Math.min(1, y1))), lon: Math.atan2(z2, x2) }
    }

    /** (lat, lon) → screen, with visibility. */
    const project = (lat: number, lon: number) => {
      const x2 = Math.cos(lat) * Math.cos(lon), y1 = Math.sin(lat), z2 = Math.cos(lat) * Math.sin(lon)
      const cr = Math.cos(rot), sr = Math.sin(rot)
      const dx = x2 * cr - z2 * sr, z1 = x2 * sr + z2 * cr
      const ct = Math.cos(TILT), st = Math.sin(TILT)
      const dy = y1 * ct + z1 * st, z = -y1 * st + z1 * ct
      return { x: cx + dx * R, y: cy - dy * R, z }
    }

    /** Isometric satellite: outlined cube body, gridded solar wings, dish + blinking beacon. */
    const drawSatellite = (x: number, y: number, angle: number, pal: Palette, scale: number, time: number) => {
      const c = pal.sat
      ctx.save()
      ctx.translate(Math.round(x), Math.round(y))
      ctx.rotate(angle)
      ctx.scale(scale, scale)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.strokeStyle = c.outline
      ctx.lineWidth = 0.9

      const roundRect = (rx: number, ry: number, rw: number, rh: number, r: number) => {
        ctx.beginPath()
        ctx.moveTo(rx + r, ry)
        ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r)
        ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r)
        ctx.arcTo(rx, ry + rh, rx, ry, r)
        ctx.arcTo(rx, ry, rx + rw, ry, r)
        ctx.closePath()
      }

      // Struts
      ctx.beginPath(); ctx.moveTo(-14, 0.6); ctx.lineTo(14, 0.6); ctx.lineWidth = 1.4; ctx.stroke(); ctx.lineWidth = 0.9

      // Solar wings, skewed for depth, with a travelling glint across the cells
      const glintPos = ((time * 0.35) % 2.2) - 0.6
      for (const side of [-1, 1]) {
        ctx.save()
        ctx.translate(side * 15, 0.6)
        ctx.transform(1, side * -0.32, side * 0.18, 1, 0, 0)
        roundRect(-5.5, -6, 11, 12, 1.2)
        ctx.fillStyle = c.panel; ctx.fill()
        ctx.lineWidth = 1.6; ctx.stroke(); ctx.lineWidth = 0.9
        for (let gx = 0; gx < 3; gx++) for (let gy = 0; gy < 3; gy++) {
          const cellX = -4.3 + gx * 3.05, cellY = -4.8 + gy * 3.25
          const diag = (gx + gy) / 4
          const lit = Math.abs(diag - glintPos) < 0.18
          ctx.fillStyle = lit ? c.cellLit : c.cell
          ctx.fillRect(cellX, cellY, 2.55, 2.75)
        }
        ctx.restore()
      }

      // Dish on a mast
      ctx.lineWidth = 1.3
      ctx.beginPath(); ctx.moveTo(-1.4, -4.2); ctx.lineTo(-4.2, -9.6); ctx.stroke()
      ctx.lineWidth = 0.9
      ctx.save()
      ctx.translate(-5, -11.2)
      ctx.rotate(-0.6)
      // Bowl: half-ellipse with a shaded inner rim
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 3.8, 0, 0, Math.PI); ctx.closePath()
      ctx.fillStyle = c.top; ctx.fill(); ctx.lineWidth = 1.2; ctx.stroke()
      ctx.beginPath(); ctx.ellipse(0, 0, 5, 1.3, 0, 0, Math.PI * 2)
      ctx.fillStyle = c.left; ctx.fill(); ctx.stroke()
      ctx.lineWidth = 0.9
      // Feed horn + beacon
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -4.2); ctx.stroke()
      const beacon = (time * 0.8) % 1 < 0.14
      ctx.beginPath(); ctx.arc(0, -4.7, 1, 0, Math.PI * 2)
      ctx.fillStyle = beacon ? c.beacon : c.outline; ctx.fill()
      if (beacon) { ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(0, -4.7, 2.6, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1 }
      ctx.restore()

      // Isometric cube body
      const k = 5.6, hk = k * 0.866
      const T = [0, -k + 0.6], R = [hk, -k / 2 + 0.6], C = [0, 0.6], L = [-hk, -k / 2 + 0.6]
      const B = [0, k + 0.6], BR = [hk, k / 2 + 0.6], BL = [-hk, k / 2 + 0.6]
      const face = (pts: number[][], fill: string) => {
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
        ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke()
      }
      face([L, C, B, BL], c.left)
      face([C, R, BR, B], c.right)
      face([T, R, C, L], c.top)
      // Port windows on the shaded face
      ctx.fillStyle = c.outline
      ctx.save(); ctx.transform(1, -0.5, 0, 1, 0, 0)
      ctx.fillRect(1.4, 3.2, 1.4, 1.4); ctx.fillRect(3.4, 6.1, 1.4, 1.4); ctx.fillRect(1.4, 6.9, 1.1, 1.1)
      ctx.restore()

      ctx.restore()
    }

    let raf = 0, visible = true, prev = performance.now()

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const pal = PALETTES[themeRef.current]
      if (!buf32 || !img) return

      // Physics: auto-spin + drag inertia
      if (!dragging) {
        vel += (0.07 - vel) * Math.min(1, dt * 1.2)
        if (!reduced) rot += vel * dt
      }
      light.x += (light.tx - light.x) * Math.min(1, dt * 3)
      light.y += (light.ty - light.y) * Math.min(1, dt * 3)
      const lz = 0.75
      const ll = Math.hypot(light.x, light.y, lz)
      const Lx = light.x / ll, Ly = light.y / ll, Lz = lz / ll

      buf32.fill(0)
      const t = now / 1000

      // Stars (behind the planet)
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * s.s + s.p)
        const idx = tw > 0.85 ? 2 : tw > 0.45 ? 1 : 0
        fillCell(s.x, s.y, pal.star[idx], tw > 0.92 ? DOT : 2)
      }

      // Planet
      const ct = Math.cos(TILT), st = Math.sin(TILT)
      const cr = Math.cos(rot), sr = Math.sin(rot)
      const ATMO = 1.07
      const topRow = Math.max(0, Math.floor((cy - R * ATMO) / CELL))
      for (let j = topRow; j < rows; j++) {
        const sy = j * CELL + CELL / 2
        const dy = -(sy - cy) / R
        for (let i = 0; i < cols; i++) {
          const sx = i * CELL + CELL / 2
          const dx = (sx - cx) / R
          const d2 = dx * dx + dy * dy
          if (d2 > ATMO * ATMO) continue
          const bayer = BAYER[(j & 3) * 4 + (i & 3)]

          if (d2 >= 1) {
            // Atmospheric halo, lit on the sun-facing limb
            const d = Math.sqrt(d2)
            const k = 1 - (d - 1) / (ATMO - 1)
            const facing = 0.45 + 0.55 * Math.max(0, (dx * Lx + dy * Ly) / d)
            const g = k * k * facing
            if (g > bayer) fillCell(i, j, pal.atmo[g > 0.7 ? 2 : g > 0.4 ? 1 : 0], g > 0.6 ? DOT : 2)
            continue
          }

          const z = Math.sqrt(1 - d2)
          const y1 = dy * ct - z * st, z1 = dy * st + z * ct
          const x2 = dx * cr + z1 * sr, z2 = -dx * sr + z1 * cr
          const lat = Math.asin(y1 < -1 ? -1 : y1 > 1 ? 1 : y1)
          const lon = Math.atan2(z2, x2)
          let u = Math.floor(((lon + Math.PI) / (Math.PI * 2)) * TEX_W)
          if (u >= TEX_W) u -= TEX_W
          const v = Math.min(TEX_H - 1, Math.floor((0.5 - lat / Math.PI) * TEX_H))
          const tIdx = v * TEX_W + u
          const kind = planet.kind[tIdx]

          const lambert = Math.max(0, dx * Lx + dy * Ly + z * Lz)
          const rim = Math.pow(1 - z, 4) * 0.4
          let intensity = 0.05 + lambert * 0.7 + rim
          // Ocean specular glint
          if (kind === 0) {
            const hx = Lx, hy = Ly, hz = Lz + 1, hl = Math.hypot(hx, hy, hz)
            const spec = Math.pow(Math.max(0, (dx * hx + dy * hy + z * hz) / hl), 40)
            intensity += spec * 0.75
          } else {
            intensity = intensity * 0.82 + (planet.relief[tIdx] - 0.58) * 0.6
          }
          if (intensity > 1) intensity = 1

          // Night-side city lights
          if (kind === 1 && lambert < 0.12 && planet.lights[tIdx]) {
            const flicker = 0.75 + 0.25 * Math.sin(t * 3 + tIdx)
            if (flicker > bayer * 0.6) { fillCell(i, j, pal.city, 2); continue }
          }

          if (intensity <= bayer * 0.92) continue
          const ramp = kind === 1 ? pal.land : kind === 2 ? pal.ice : pal.ocean
          const level = Math.min(4, Math.floor(intensity * 4.99))
          fillCell(i, j, ramp[level])
        }
      }

      pctx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Pings (click markers) — expanding dithered rings that ride the surface
      for (let p = pings.length - 1; p >= 0; p--) {
        const age = (now - pings[p].born) / 1000
        if (age > 6) { pings.splice(p, 1); continue }
        const pt = project(pings[p].lat, pings[p].lon)
        if (pt.z <= 0.05) continue
        ctx.fillStyle = pal.ping
        ctx.globalAlpha = Math.min(1, 6 - age)
        ctx.fillRect(Math.round(pt.x / CELL) * CELL - 4, Math.round(pt.y / CELL) * CELL - 4, CELL * 2, CELL * 2)
        for (let ring = 0; ring < 2; ring++) {
          const phase = ((age + ring * 0.6) % 1.2) / 1.2
          const rad = 8 + phase * 46
          ctx.globalAlpha = (1 - phase) * Math.min(1, 6 - age)
          const steps = Math.ceil(rad * 0.9)
          for (let s = 0; s < steps; s++) {
            const a = (s / steps) * Math.PI * 2
            ctx.fillRect(Math.round((pt.x + Math.cos(a) * rad) / 3) * 3, Math.round((pt.y + Math.sin(a) * rad * Math.max(0.35, pt.z)) / 3) * 3, 3, 3)
          }
        }
        ctx.globalAlpha = 1
      }

      // Satellites on inclined orbits, hidden when behind the planet
      const sats = [
        { rx: 0.42, ry: 0.2, lift: 0.1, speed: 0.12, phase: 0.5, scale: 1.7 },
        { rx: 0.3, ry: 0.12, lift: 0.04, speed: -0.08, phase: 2.4, scale: 1.05 },
      ]
      const crest = cy - R
      for (const s of sats) {
        const a = s.phase + t * s.speed * (reduced ? 0 : 1)
        const px = cx + Math.cos(a) * w * s.rx
        const py = crest + h * s.lift - Math.sin(a) * h * s.ry
        const front = Math.sin(a) < 0
        const insideDisk = Math.hypot(px - cx, py - cy) < R
        if (!front && insideDisk) continue
        drawSatellite(px, py, -0.5 + Math.cos(a) * 0.18 + Math.sin(t * 0.9 + s.phase) * 0.04, pal, s.scale, t + s.phase)
      }

      // Occasional shooting star
      if (!reduced && !meteor && now > nextMeteor) {
        const fromLeft = Math.random() < 0.5
        meteor = { x: fromLeft ? w * 0.1 : w * 0.9, y: h * 0.05, vx: (fromLeft ? 1 : -1) * (260 + Math.random() * 160), vy: 90 + Math.random() * 60, life: 1 }
      }
      if (meteor) {
        meteor.x += meteor.vx * dt; meteor.y += meteor.vy * dt; meteor.life -= dt * 0.9
        const len = 14
        for (let k = 0; k < len; k++) {
          const f = k / len
          ctx.globalAlpha = Math.max(0, meteor.life) * (1 - f)
          ctx.fillStyle = pal.sat.glint
          const mx = meteor.x - meteor.vx * 0.012 * k, my = meteor.y - meteor.vy * 0.012 * k
          ctx.fillRect(Math.round(mx / 3) * 3, Math.round(my / 3) * 3, k === 0 ? 3 : 2, k === 0 ? 3 : 2)
        }
        ctx.globalAlpha = 1
        const md = Math.hypot((meteor.x - cx) / R, (meteor.y - cy) / R)
        if (meteor.life <= 0 || md < 1.02) { meteor = null; nextMeteor = now + 5000 + Math.random() * 7000 }
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame)
    }

    const start = () => { cancelAnimationFrame(raf); prev = performance.now(); raf = requestAnimationFrame(frame) }

    // Pointer: hover moves the sun, drag spins the planet, click drops a ping
    let downX = 0, downY = 0
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: PointerEvent) => {
      const p = local(e)
      light.tx = ((p.x - cx) / (w / 2)) * 1.1
      light.ty = 0.9 - (p.y / h) * 0.9
      if (dragging) {
        const nowT = performance.now()
        const dRot = -((p.x - lastX) / R) * 1.4
        rot += dRot
        vel = dRot / Math.max(0.016, (nowT - lastT) / 1000)
        lastX = p.x; lastT = nowT
        if (reduced) start()
      } else if (reduced) start()
    }
    const onDown = (e: PointerEvent) => {
      const p = local(e)
      downX = p.x; downY = p.y
      if (Math.hypot((p.x - cx) / R, (p.y - cy) / R) > 1) return
      dragging = true; lastX = p.x; lastT = performance.now()
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onUp = (e: PointerEvent) => {
      const p = local(e)
      if (dragging) { dragging = false; canvas.style.cursor = ''; vel = Math.max(-3, Math.min(3, vel)) }
      if (Math.hypot(p.x - downX, p.y - downY) < 5) {
        const hit = pick(p.x, p.y)
        if (hit) { pings.push({ ...hit, born: performance.now() }); if (pings.length > 6) pings.shift(); if (reduced) start() }
      }
    }
    const onLeave = () => { light.tx = -0.55; light.ty = 0.65 }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    const ro = new ResizeObserver(() => { resize(); start() })
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start(); else cancelAnimationFrame(raf)
    }, { rootMargin: '100px' })
    io.observe(wrap)

    redrawRef.current = start
    start()
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  // Re-render a static frame when the theme flips under reduced motion.
  useEffect(() => { redrawRef.current() }, [theme])

  return (
    <div ref={wrapRef} className="horizon-globe">
      <canvas ref={canvasRef} aria-label="A slowly turning pixel planet. Drag to spin it, click to drop a marker." role="img" />
      <canvas ref={fxRef} className="horizon-fx" aria-hidden="true" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Bits around the globe                                              */
/* ------------------------------------------------------------------ */

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function VisitorPill() {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [total, setTotal] = useState<number | null>(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch('/api/visitor', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d && typeof d.totalCount === 'number' && d.totalCount > 0) setTotal(d.totalCount) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!inView || total === null) return
    const controls = animate(Math.max(0, total - 240), total, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: v => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, total])

  return (
    <a ref={ref} href="mailto:hiteshofficial0001@gmail.com" className="horizon-pill">
      <span className="horizon-pill-wave" aria-hidden="true">👋</span>
      <span>Say hi, {total === null ? 'traveler' : <>visitor <strong>{shown.toLocaleString('en-US')}</strong></>}</span>
    </a>
  )
}

const QUOTE = ['The', 'soul', 'becomes', 'dyed', 'with', 'the', 'color', 'of', 'its', 'thoughts.']

export function FooterHorizon() {
  const { reduced } = useMotionSettings()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const time = useLocalTime()
  const theme: 'dark' | 'light' = mounted && resolvedTheme === 'light' ? 'light' : 'dark'

  return (
    <section className="footer-horizon" data-globe-theme={theme} aria-label="Sign-off">
      <blockquote className="horizon-quote">
        <p>
          {QUOTE.map((word, i) => (
            <Fragment key={i}>
            <motion.span
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {i === 4 ? <br /> : ' '}
            </Fragment>
          ))}
        </p>
        <motion.footer initial={{ opacity: 0, letterSpacing: '0.6em' }} whileInView={{ opacity: 1, letterSpacing: '0.22em' }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.7 }}>
          Marcus Aurelius
        </motion.footer>
      </blockquote>

      <motion.div className="horizon-meta" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.9 }}>
        <span className="horizon-status"><i aria-hidden="true" />Building something new</span>
        <span className="horizon-dot" aria-hidden="true">·</span>
        <span>{time ? `${time} in New Delhi` : 'New Delhi, IN'}</span>
      </motion.div>
      <motion.p className="horizon-made" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.1 }}>
        Made with &lt;3 and lots of coffee. © {new Date().getFullYear()} Hitesh Kumar
      </motion.p>

      <div className="horizon-stage">
        <PixelGlobe reduced={reduced} theme={theme} />
        <VisitorPill />
        <span className="horizon-hint" aria-hidden="true">drag to spin · click to ping</span>
      </div>
    </section>
  )
}
