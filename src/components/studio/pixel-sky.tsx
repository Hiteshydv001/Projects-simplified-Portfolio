'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useMotionSettings } from '@/components/layout/motion-provider'

/*
 * Hand-built, procedurally generated pixel-art wallpaper for the hero.
 *  Day:   dithered sky, big billowing cumulus, a flock of birds that scatters from the cursor,
 *         a plane drawing a contrail, and a field of sunflowers on a bed of foliage.
 *         The sunflowers turn their heads to follow your cursor, the way they follow the sun.
 *  Night: deep sky, twinkling stars, a pixel moon, shooting stars and fireflies.
 * Everything renders to a low-resolution canvas that is scaled up crisp.
 */

type Mode = 'day' | 'night'

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16)
const bayer = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)]

const THEMES = {
  day: {
    sky: ['#0a5fc4', '#1170d6', '#1d82e6', '#2e95f0', '#47a8f6', '#68bbf9', '#8fcdfb', '#b8e0fd'],
    cloud: ['#ffffff', '#f1f8ff', '#dcecfb', '#bcd9f4', '#97c2ea'],
    petal: ['#8f3c00', '#c86200', '#ec8b00', '#f8ad08', '#ffcb1f', '#ffe45a', '#fff3a6'],
    disk: ['#1f0d03', '#3a1906', '#58280b', '#7a3a10', '#9c5216', '#6b5a16'],
    leaf: ['#123f17', '#1d5a1f', '#2b7628', '#3f9333', '#5bae40', '#86c955'],
    stem: ['#1d5a1f', '#2f7a2a', '#4f9e3a'],
    bird: '#12233a',
    seed: '#ffffff',
  },
  night: {
    sky: ['#02040b', '#040915', '#060e20', '#0a142d', '#0f1c3c', '#15254b', '#1c305c', '#253c6d'],
    cloud: ['#56698f', '#47597d', '#384868', '#2b3854', '#212b42'],
    petal: ['#24180a', '#38270e', '#4d3712', '#634818', '#7a5a20', '#8f6c2a', '#a6823a'],
    disk: ['#070402', '#0f0804', '#170d06', '#201308', '#2a190b', '#1d1c0c'],
    leaf: ['#040e0a', '#07160f', '#0b1f15', '#10291b', '#163422', '#1d402a'],
    stem: ['#07160f', '#0d2318', '#143021'],
    bird: '#000000',
    seed: '#ffe9a3',
  },
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const
}

function rand(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hash = (a: number, b: number) => {
  let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

/** Paints pixels into a fresh canvas through a per-pixel colour callback. */
function paint(w: number, h: number, fn: (x: number, y: number) => readonly [number, number, number] | null) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')!
  const img = g.createImageData(w, h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const col = fn(x, y)
    if (!col) continue
    const o = (y * w + x) * 4
    img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255
  }
  g.putImageData(img, 0, 0)
  return c
}

/* ------------------------------------------------------------------ */
/*  Sprites                                                            */
/* ------------------------------------------------------------------ */

/** Billowing cumulus: many puffs, five tones, crunchy dithered edges. */
function makeCloud(width: number, seed: number, palette: string[], tall = 0.55) {
  const r = rand(seed)
  const height = Math.round(width * tall)
  const base = height - 2
  const puffs: { x: number; y: number; r: number }[] = []
  const big = 5 + Math.floor(r() * 4)
  for (let i = 0; i < big; i++) {
    const t = (i + 0.5) / big
    const pr = width * (0.1 + r() * 0.12) * (1.15 - Math.abs(t - 0.45) * 1.1)
    puffs.push({ x: width * (0.08 + t * 0.84), y: base - pr * (0.5 + r() * 0.5) - (1 - Math.abs(t - 0.45) * 2) * height * 0.25, r: pr })
  }
  // Secondary puffs piled on top for a cauliflower silhouette
  for (let i = 0; i < big; i++) {
    const p = puffs[Math.floor(r() * big)]
    const a = -Math.PI * (0.15 + r() * 0.7)
    puffs.push({ x: p.x + Math.cos(a) * p.r * 0.7, y: p.y + Math.sin(a) * p.r * 0.7, r: p.r * (0.4 + r() * 0.3) })
  }
  for (let x = width * 0.06; x < width * 0.94; x += width * 0.06) puffs.push({ x, y: base - width * 0.04, r: width * 0.06 })
  const cols = palette.map(hexToRgb)

  const sample = (x: number, y: number) => {
    let h = 0, nx = 0, ny = 0
    if (y > base) return { h, nx, ny }
    for (const p of puffs) {
      const dx = (x - p.x) / p.r, dy = (y - p.y) / p.r
      const v = 1 - Math.hypot(dx, dy)
      if (v > h) { h = v; nx = dx; ny = dy }
    }
    return { h, nx, ny }
  }
  return paint(width, height, (x, y) => {
    const { h, nx, ny } = sample(x + 0.5, y + 0.5)
    if (h <= 0) return null
    const b = bayer(x, y)
    if (h < 0.1 && h / 0.1 < b * (0.6 + hash(x, y) * 0.8)) return null
    const light = -ny * 0.8 - nx * 0.4 + (b - 0.5) * 0.22
    let idx = light > 0.35 ? 0 : light > 0.0 ? 1 : light > -0.35 ? 2 : 3
    const fromBase = base - y
    if (fromBase < 3 + b * 3) idx = 4
    else if (fromBase < 8 + b * 4) idx = Math.max(idx, 3)
    return cols[idx]
  })
}

const YAWS = [-0.62, -0.31, 0, 0.31, 0.62]

/** A sunflower head: Fibonacci seed disk + two layers of shaded petals, turned by `yaw`. */
function makeSunflower(R: number, yaw: number, mode: Mode, seed: number) {
  const th = THEMES[mode]
  const petal = th.petal.map(hexToRgb), disk = th.disk.map(hexToRgb)
  const S = Math.ceil(R * 2 + 4), c = S / 2
  const cosY = Math.cos(yaw), shift = Math.sin(yaw) * R * 0.2
  const rd = R * 0.42
  const layers = [
    { n: 21, off: 0, len: 0.98, back: true },
    { n: 21, off: Math.PI / 21, len: 0.9, back: false },
  ]
  const tip = (layer: number, k: number) => 0.84 + hash(seed + layer * 97, k) * 0.2
  const twoPi = Math.PI * 2
  return paint(S, S, (x, y) => {
    const u = x + 0.5 - c, v = y + 0.5 - c
    const hx = u / cosY, hy = v / 0.94
    const b = bayer(x, y)
    // Disk (domed, so it shifts toward the facing side)
    const dx = hx - shift / cosY, dy = hy
    const dd = Math.hypot(dx, dy)
    if (dd < rd) {
      const q = dd / rd, a = Math.atan2(dy, dx)
      const s1 = Math.sin(a * 13 + q * rd * 1.25), s2 = Math.sin(-a * 21 + q * rd * 1.25)
      const bump = s1 * s2
      const light = -(dx / rd) * 0.45 - (dy / rd) * 0.6
      let lvl = 1.6 + light * 1.6 + bump * 0.9 + (b - 0.5) * 0.8
      if (q > 0.86) lvl = 3.3 + light + (b - 0.5) // warm rim
      if (q < 0.22) return disk[lvl > 2.4 ? 5 : 2] // greenish centre
      return disk[Math.max(0, Math.min(4, Math.round(lvl)))]
    }
    const rho = Math.hypot(hx, hy), theta = Math.atan2(hy, hx)
    if (rho > R * 1.06) return null
    for (let li = 1; li >= 0; li--) {
      const L = layers[li]
      const step = twoPi / L.n
      let k = Math.round((theta - L.off) / step)
      const dth = theta - L.off - k * step
      k = ((k % L.n) + L.n) % L.n
      const len = R * L.len * tip(li, k)
      const r0 = rd * 0.92
      if (rho < r0 || rho > len) continue
      const t = (rho - r0) / (len - r0)
      const hw = R * 0.15 * Math.sin(Math.PI * Math.pow(t, 0.7)) + 0.4
      const e = Math.abs(dth) * rho / hw
      if (e > 1) continue
      // Shade: dark at the base and edges, lit from the upper left, back layer dimmer
      const lightDir = -Math.cos(theta) * 0.35 - Math.sin(theta) * 0.45
      let lvl = 4.2 + lightDir * 1.4 - e * e * 1.8 - (t < 0.18 ? 1.6 : 0) + (b - 0.5) * 0.9
      if (Math.abs(dth) * rho < 0.45 && t > 0.15 && t < 0.8) lvl -= 0.7 // midrib
      if (L.back) lvl -= 1.3
      return petal[Math.max(0, Math.min(6, Math.round(lvl)))]
    }
    return null
  })
}

/** A pointed, shaded leaf lying along +x, drooping slightly. */
function makeLeaf(len: number, mode: Mode, seed: number) {
  const pal = THEMES[mode].leaf.map(hexToRgb)
  const w = Math.ceil(len), h = Math.ceil(len * 0.75)
  const cy = h * 0.35
  const droop = 0.18 + hash(seed, 3) * 0.15
  return paint(w, h, (x, y) => {
    const s = (x + 0.5) / len
    if (s > 1) return null
    const mid = cy + s * s * len * droop
    const half = len * 0.24 * Math.pow(Math.sin(Math.PI * Math.min(1, s * 1.05)), 0.75) * (1 - s * 0.25)
    const d = (y + 0.5 - mid) / Math.max(0.5, half)
    if (Math.abs(d) > 1) return null
    const b = bayer(x, y)
    if (Math.abs(d) > 0.82 && b > 0.6) return null
    let lvl = (d < 0 ? 3.6 : 2.2) - Math.abs(d) * 1.2 + (b - 0.5) * 0.9
    if (Math.abs(y + 0.5 - mid) < 0.6 && s > 0.08 && s < 0.85) lvl = d < 0 ? 4.6 : 1.4 // midrib
    const vein = Math.sin((s * 7 - Math.abs(d) * 1.2) * Math.PI)
    if (vein > 0.92 && Math.abs(d) > 0.2) lvl -= 0.8
    return pal[Math.max(0, Math.min(5, Math.round(lvl)))]
  })
}

const BIRD_FRAMES = [
  ['XX.......XX', '..XX...XX..', '....XXX....', '...........'],
  ['...........', 'XXXX...XXXX', '....XXX....', '...........'],
  ['...........', '....XXX....', '..XX...XX..', '.X.......X.'],
  ['...........', 'XXXX...XXXX', '....XXX....', '...........'],
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Flower = { x: number; baseY: number; headY: number; R: number; layer: 0 | 1 | 2; seed: number; yaw: number; bend: number; phase: number; leaves: { at: number; side: 1 | -1; len: number; seed: number }[] }

export function PixelSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const { reduced } = useMotionSettings()
  const modeRef = useRef<Mode>('day')
  const redrawRef = useRef<() => void>(() => {})
  modeRef.current = resolvedTheme === 'dark' ? 'night' : 'day'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, P = 4
    let skyCache: { mode: Mode; canvas: HTMLCanvasElement } | null = null
    let bushCache: { mode: Mode; canvas: HTMLCanvasElement } | null = null
    const headCache = new Map<string, HTMLCanvasElement>()
    const leafCache = new Map<string, HTMLCanvasElement>()
    const cloudSprites: Partial<Record<Mode, HTMLCanvasElement[]>> = {}

    type Cloud = { x: number; y: number; sprite: number; speed: number; layer: number }
    type Bird = { x: number; y: number; vx: number; vy: number; phase: number }
    type Mote = { x: number; y: number; vx: number; vy: number; phase: number }

    let clouds: Cloud[] = []
    let birds: Bird[] = []
    let flowers: Flower[] = []
    let motes: Mote[] = []
    let stars: { x: number; y: number; p: number; s: number }[] = []
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null
    let nextShoot = performance.now() + 3000
    let plane: { x: number; y: number; vx: number; vy: number } | null = null
    let trail: { x: number; y: number; born: number }[] = []
    let nextPlane = performance.now() + 2500
    const pointer = { x: -999, y: -999, active: false }
    let bushTop = 0

    const head = (R: number, yawIdx: number, mode: Mode, seed: number) => {
      const key = `${R}|${yawIdx}|${mode}|${seed % 3}`
      let s = headCache.get(key)
      if (!s) { s = makeSunflower(R, YAWS[yawIdx], mode, seed % 3); headCache.set(key, s) }
      return s
    }
    const leaf = (len: number, mode: Mode, seed: number) => {
      const key = `${len}|${mode}|${seed % 4}`
      let s = leafCache.get(key)
      if (!s) { s = makeLeaf(len, mode, seed % 4); leafCache.set(key, s) }
      return s
    }

    const buildSky = (mode: Mode) => {
      const c = document.createElement('canvas')
      c.width = W; c.height = H
      const g = c.getContext('2d')!
      const img = g.createImageData(W, H)
      const shades = THEMES[mode].sky.map(hexToRgb)
      const n = shades.length - 1
      for (let y = 0; y < H; y++) {
        const t = Math.pow(y / H, mode === 'day' ? 0.85 : 1.3) * n
        const lo = Math.floor(t), f = t - lo
        for (let x = 0; x < W; x++) {
          const [r, gg, b] = shades[Math.min(n, f > bayer(x, y) ? lo + 1 : lo)]
          const o = (y * W + x) * 4
          img.data[o] = r; img.data[o + 1] = gg; img.data[o + 2] = b; img.data[o + 3] = 255
        }
      }
      g.putImageData(img, 0, 0)
      if (mode === 'night') {
        const mx = Math.round(W * 0.8), my = Math.round(H * 0.18), mr = Math.max(8, Math.round(Math.min(W, H) * 0.07))
        g.fillStyle = 'rgba(180,200,255,0.07)'
        for (let i = 4; i > 0; i--) { g.beginPath(); g.arc(mx, my, mr + i * 5, 0, Math.PI * 2); g.fill() }
        for (let y = -mr; y <= mr; y++) for (let x = -mr; x <= mr; x++) {
          if (Math.hypot(x, y) > mr) continue
          g.fillStyle = x * 0.6 + y * 0.4 > mr * 0.25 + (bayer(x + 99, y + 99) - 0.5) * 3 ? '#c9d2e6' : '#eef2fb'
          g.fillRect(mx + x, my + y, 1, 1)
        }
        g.fillStyle = '#b5bfd6'
        for (const [cx, cy, cr] of [[-0.35, -0.2, 0.18], [0.25, 0.3, 0.14], [0.1, -0.45, 0.1], [-0.1, 0.45, 0.08]]) {
          g.beginPath(); g.arc(mx + cx * mr, my + cy * mr, Math.max(1, cr * mr), 0, Math.PI * 2); g.fill()
        }
      }
      return c
    }

    /** Dense bed of leaves along the bottom edge. */
    const buildBush = (mode: Mode) => {
      const c = document.createElement('canvas')
      c.width = W; c.height = H
      const g = c.getContext('2d')!
      g.imageSmoothingEnabled = false
      const pal = THEMES[mode].leaf
      const r = rand(7)
      const top = (x: number) => bushTop + Math.sin(x * 0.05) * 3 + Math.sin(x * 0.13 + 1) * 2
      for (let x = 0; x < W; x++) {
        const t = Math.round(top(x))
        for (let y = t; y < H; y++) {
          const k = (y - t) / Math.max(1, H - t)
          g.fillStyle = pal[k > 0.55 + bayer(x, y) * 0.3 ? 0 : 1]
          g.fillRect(x, y, 1, 1)
        }
      }
      // Pile of leaves, darker toward the bottom
      const count = Math.round(W * 1.6)
      for (let i = 0; i < count; i++) {
        const x = r() * W
        const y = top(x) - 4 + Math.pow(r(), 0.8) * (H - bushTop + 6)
        const len = 6 + Math.floor(r() * 8)
        const sprite = leaf(len, mode, i)
        g.save()
        g.translate(Math.round(x), Math.round(y))
        g.rotate((r() - 0.5) * 2.6)
        if (r() < 0.5) g.scale(-1, 1)
        g.globalAlpha = 1
        g.drawImage(sprite, 0, -Math.round(sprite.height * 0.35))
        g.restore()
        if (y > bushTop + (H - bushTop) * 0.55 && r() < 0.6) { g.fillStyle = pal[0]; g.globalAlpha = 0.35; g.fillRect(Math.round(x) - 3, Math.round(y), 7, 3); g.globalAlpha = 1 }
      }
      return c
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const cssW = Math.max(1, rect.width), cssH = Math.max(1, rect.height)
      P = cssW < 700 ? 3 : 4
      W = Math.ceil(cssW / P); H = Math.ceil(cssH / P)
      canvas.width = W; canvas.height = H
      ctx.imageSmoothingEnabled = false
      skyCache = null; bushCache = null
      bushTop = Math.round(H * 0.84)
      const k = Math.max(0.55, Math.min(1.25, W / 360))
      const r = rand(42)

      clouds = [
        { x: W * 0.72, y: -H * 0.04, sprite: 0, speed: 0.9, layer: 1 },
        { x: -W * 0.3, y: H * 0.6, sprite: 1, speed: 0.7, layer: 1 },
        { x: W * 0.28, y: H * 0.02, sprite: 4, speed: 0.6, layer: 0 },
        { x: W * 0.5, y: H * 0.36, sprite: 3, speed: 0.5, layer: 0 },
        { x: W * 0.05, y: H * 0.12, sprite: 5, speed: 0.45, layer: 0 },
        { x: W * 0.86, y: H * 0.46, sprite: 2, speed: 0.8, layer: 1 },
        { x: W * 0.62, y: H * 0.66, sprite: 6, speed: 0.4, layer: 0 },
      ]
      birds = Array.from({ length: 10 }, (_, i) => ({
        x: W * 0.12 + (i % 5) * 11 + r() * 6, y: H * 0.2 + Math.floor(i / 5) * 9 + r() * 6,
        vx: 6 + r() * 2, vy: (r() - 0.5) * 2, phase: r() * 4,
      }))

      // Sunflowers: three depth layers. Big ones frame the sides, the middle stays low so text reads.
      flowers = []
      let seed = 1
      const add = (x: number, headY: number, R: number, layer: 0 | 1 | 2) => {
        const rr = Math.max(3, Math.round(R))
        const leaves: Flower['leaves'] = []
        if (layer > 0) {
          const nl = layer === 2 ? 3 : 2
          for (let i = 0; i < nl; i++) leaves.push({ at: 0.35 + i * 0.22 + r() * 0.08, side: (i % 2 ? 1 : -1) as 1 | -1, len: Math.max(8, Math.round(rr * (layer === 2 ? 1.25 : 1.05) * (0.85 + r() * 0.3))), seed: seed * 7 + i })
        }
        flowers.push({ x, baseY: H + 6, headY, R: rr, layer, seed: seed++, yaw: 0, bend: 0, phase: r() * 6, leaves })
      }
      // Back row peeking over the foliage
      for (let x = -4; x < W + 4; x += 7 + r() * 9) {
        const centre = Math.abs(x / W - 0.5) < 0.18
        add(x, bushTop - 2 - r() * (centre ? 3 : 10), (3 + r() * 3) * Math.min(1.2, k), 0)
      }
      // Mid layer
      const mids = Math.round(W / 26)
      for (let i = 0; i < mids; i++) {
        const side = r() < 0.5 ? -1 : 1
        const d = 0.18 + Math.pow(r(), 0.7) * 0.36
        const x = W * (0.5 + side * d)
        add(x, bushTop - (8 + r() * 26) * k * (0.6 + d * 1.4), (8 + r() * 6) * k, 1)
      }
      // Foreground heroes
      const fg: [number, number, number][] = W < 200
        ? [[0.92, 0.66, 22], [0.08, 0.8, 18], [1.02, 0.5, 18]]
        : [[0.82, 0.5, 31], [0.95, 0.3, 26], [0.7, 0.7, 21], [1.02, 0.6, 22], [0.07, 0.74, 27], [0.2, 0.86, 19], [-0.03, 0.52, 20], [0.58, 0.94, 14]]
      for (const [fx, fy, fr] of fg) add(W * fx, H * fy, fr * k, 2)
      flowers.sort((a, b) => a.layer - b.layer || a.R - b.R)

      motes = Array.from({ length: Math.round(W / 14) }, () => ({ x: r() * W, y: bushTop - r() * H * 0.5, vx: (r() - 0.3) * 3, vy: -1 - r() * 2, phase: r() * 6 }))
      stars = Array.from({ length: Math.round((W * H) / 200) }, () => ({ x: Math.floor(r() * W), y: Math.floor(r() * bushTop * 0.85), p: r() * 6, s: 0.5 + r() * 2 }))
    }

    const ensureClouds = (mode: Mode) => {
      if (cloudSprites[mode]) return
      const pal = THEMES[mode].cloud
      cloudSprites[mode] = [
        makeCloud(210, 11, pal, 0.62), makeCloud(190, 23, pal, 0.6), makeCloud(130, 37, pal), makeCloud(96, 41, pal),
        makeCloud(74, 53, pal), makeCloud(58, 61, pal), makeCloud(44, 71, pal),
      ]
    }

    resize()

    const drawBird = (b: Bird, color: string, t: number) => {
      const frame = BIRD_FRAMES[Math.floor(t * 8 + b.phase) % 4]
      ctx.fillStyle = color
      const ox = Math.round(b.x) - 5, oy = Math.round(b.y) - 2
      for (let y = 0; y < 4; y++) for (let x = 0; x < 11; x++) if (frame[y][x] === 'X') ctx.fillRect(ox + x, oy + y, 1, 1)
    }

    const drawStem = (f: Flower, th: typeof THEMES.day, mode: Mode) => {
      const thick = f.layer === 2 ? Math.max(2, Math.round(f.R * 0.13)) : f.layer === 1 ? 2 : 1
      const hx = f.x + f.bend
      const steps = Math.ceil(f.baseY - f.headY)
      for (let i = 0; i <= steps; i++) {
        const q = i / steps // 0 at head, 1 at base
        const y = Math.round(f.headY + i)
        const x = Math.round(hx + (f.x - hx) * (1 - (1 - q) * (1 - q)))
        ctx.fillStyle = th.stem[1]; ctx.fillRect(x - (thick >> 1), y, thick, 1)
        if (thick > 2) { ctx.fillStyle = th.stem[2]; ctx.fillRect(x - (thick >> 1), y, 1, 1); ctx.fillStyle = th.stem[0]; ctx.fillRect(x - (thick >> 1) + thick - 1, y, 1, 1) }
      }
      for (const l of f.leaves) {
        const y = f.headY + (f.baseY - f.headY) * l.at
        const q = l.at
        const x = hx + (f.x - hx) * (1 - (1 - q) * (1 - q))
        const sprite = leaf(l.len, mode, l.seed)
        ctx.save()
        ctx.translate(Math.round(x), Math.round(y))
        ctx.scale(l.side, 1)
        ctx.rotate(-0.35 + Math.sin(performance.now() / 900 + l.seed) * 0.05 * (reduced ? 0 : 1))
        ctx.drawImage(sprite, 0, -Math.round(sprite.height * 0.35))
        ctx.restore()
      }
    }

    let raf = 0, visible = true, prev = performance.now()

    const frame = (now: number) => {
      const mode = modeRef.current
      const th = THEMES[mode]
      const t = now / 1000
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const move = reduced ? 0 : 1
      ensureClouds(mode)
      if (!skyCache || skyCache.mode !== mode) skyCache = { mode, canvas: buildSky(mode) }
      if (!bushCache || bushCache.mode !== mode) bushCache = { mode, canvas: buildBush(mode) }
      ctx.drawImage(skyCache.canvas, 0, 0)

      if (mode === 'night') {
        for (const s of stars) {
          const tw = 0.5 + 0.5 * Math.sin(t * s.s + s.p)
          ctx.fillStyle = tw > 0.8 ? '#ffffff' : tw > 0.4 ? '#9fb3d9' : '#4b5d84'
          ctx.fillRect(s.x, s.y, 1, 1)
          if (tw > 0.97) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(s.x - 1, s.y, 3, 1); ctx.fillRect(s.x, s.y - 1, 1, 3) }
        }
        if (move && !shooting && now > nextShoot) shooting = { x: W * (0.2 + Math.random() * 0.5), y: H * 0.05, vx: 70 + Math.random() * 40, vy: 30 + Math.random() * 20, life: 1 }
        if (shooting) {
          shooting.x += shooting.vx * dt; shooting.y += shooting.vy * dt; shooting.life -= dt * 1.1
          for (let k = 0; k < 12; k++) {
            ctx.globalAlpha = Math.max(0, shooting.life) * (1 - k / 12)
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(Math.round(shooting.x - shooting.vx * 0.018 * k), Math.round(shooting.y - shooting.vy * 0.018 * k), 1, 1)
          }
          ctx.globalAlpha = 1
          if (shooting.life <= 0) { shooting = null; nextShoot = now + 4000 + Math.random() * 6000 }
        }
      }

      const sprites = cloudSprites[mode]!
      const drawClouds = (layer: number) => {
        for (const c of clouds) {
          if (c.layer !== layer) continue
          const sprite = sprites[c.sprite]
          c.x += c.speed * dt * move
          if (c.x > W + 4) c.x = -sprite.width - 4
          ctx.globalAlpha = layer === 0 ? (mode === 'day' ? 0.9 : 0.55) : (mode === 'day' ? 1 : 0.75)
          ctx.drawImage(sprite, Math.round(c.x), Math.round(c.y))
        }
        ctx.globalAlpha = 1
      }
      drawClouds(0)

      // Plane with a dotted contrail that slowly spreads and fades (day)
      if (mode === 'day') {
        if (move && !plane && now > nextPlane) { plane = { x: W * (0.3 + Math.random() * 0.2), y: H * 0.62, vx: 11, vy: -8 }; trail = [] }
        if (plane) {
          plane.x += plane.vx * dt * move; plane.y += plane.vy * dt * move
          if (!trail.length || Math.hypot(plane.x - trail[trail.length - 1].x, plane.y - trail[trail.length - 1].y) > 1.4) trail.push({ x: plane.x, y: plane.y, born: now })
          if (plane.y < -4 || plane.x > W + 4) { plane = null; nextPlane = now + 16000 + Math.random() * 10000 }
        }
        trail = trail.filter(p => now - p.born < 14000)
        for (const p of trail) {
          const age = (now - p.born) / 14000
          const spread = Math.round(age * 3)
          ctx.fillStyle = '#ffffff'
          ctx.globalAlpha = (1 - age) * 0.75
          if (bayer(Math.round(p.x), Math.round(p.y)) < 1 - age * 0.7) ctx.fillRect(Math.round(p.x) - (spread >> 1), Math.round(p.y), 1 + spread, 1)
        }
        ctx.globalAlpha = 1
        if (plane) { ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(plane.x), Math.round(plane.y) - 1, 2, 2) }
      }

      // Birds (day): loose flock that wanders and scatters from the pointer
      if (mode === 'day') {
        let cx = 0, cy = 0
        for (const b of birds) { cx += b.x; cy += b.y }
        cx /= birds.length; cy /= birds.length
        const targetY = H * 0.2 + Math.sin(t * 0.3) * H * 0.04
        for (const b of birds) {
          if (move) {
            let ax = (cx - b.x) * 0.12 + (8 - b.vx) * 0.6
            let ay = (cy - b.y) * 0.12 + (targetY - b.y) * 0.08 - b.vy * 0.3
            for (const o of birds) {
              if (o === b) continue
              const dx = b.x - o.x, dy = b.y - o.y, d = Math.hypot(dx, dy)
              if (d < 9 && d > 0) { ax += (dx / d) * 16; ay += (dy / d) * 16 }
            }
            if (pointer.active) {
              const dx = b.x - pointer.x, dy = b.y - pointer.y, d = Math.hypot(dx, dy)
              if (d < 45 && d > 0) { const f = (45 - d) * 3; ax += (dx / d) * f; ay += (dy / d) * f }
            }
            b.vx += ax * dt; b.vy += ay * dt
            const sp = Math.hypot(b.vx, b.vy), max = 32
            if (sp > max) { b.vx *= max / sp; b.vy *= max / sp }
            b.x += b.vx * dt; b.y += b.vy * dt
          }
          if (b.y < 4) b.vy += 4
        }
        const lead = birds.reduce((m, b) => Math.min(m, b.x), Infinity)
        if (lead > W + 12) for (const b of birds) b.x -= W + 70
        for (const b of birds) drawBird(b, th.bird, t * move)
      }

      drawClouds(1)

      // Wind + pointer response, then the sunflower field back to front
      const wind = (Math.sin(t * 0.7) * 0.7 + Math.sin(t * 1.9) * 0.3) * move
      for (const f of flowers) {
        let target = (Math.sin(t * 1.1 + f.phase) * 0.6 + wind) * (f.layer === 2 ? 1.6 : f.layer === 1 ? 1.1 : 0.6)
        let yawTarget = Math.max(-1, Math.min(1, (W * 0.5 - f.x) / (W * 0.9))) * 0.6 // face the centre by default
        if (pointer.active) {
          yawTarget = Math.max(-1, Math.min(1, (pointer.x - f.x) / (W * 0.25)))
          const dx = f.x + f.bend - pointer.x, dy = f.headY - pointer.y, d = Math.hypot(dx, dy)
          const reach = f.R + 18
          if (d < reach) target += Math.sign(dx || 1) * (reach - d) * 0.25
        }
        f.bend += (target - f.bend) * Math.min(1, dt * 5)
        f.yaw += (yawTarget - f.yaw) * Math.min(1, dt * 2.5)
      }

      const drawHead = (f: Flower) => {
        const idx = Math.max(0, Math.min(4, Math.round(f.yaw * 2 + 2)))
        const sprite = head(f.R, idx, mode, f.seed)
        ctx.drawImage(sprite, Math.round(f.x + f.bend - sprite.width / 2), Math.round(f.headY - sprite.height / 2))
      }

      for (const f of flowers) if (f.layer === 0) { drawStem(f, th, mode); drawHead(f) }
      ctx.drawImage(bushCache.canvas, 0, 0)
      for (const f of flowers) if (f.layer > 0) { drawStem(f, th, mode); drawHead(f) }

      // Floating seeds by day, fireflies by night
      for (const m of motes) {
        if (move) {
          m.x += (m.vx + Math.sin(t * 1.5 + m.phase) * 3) * dt
          m.y += (m.vy + Math.cos(t * 1.1 + m.phase) * 2) * dt * (mode === 'night' ? 0.4 : 1)
        }
        if (m.y < H * 0.2 || m.x > W + 2 || m.x < -2) { m.y = bushTop - Math.random() * 10; m.x = Math.random() * W }
        if (mode === 'night') {
          const glow = 0.5 + 0.5 * Math.sin(t * 2.4 + m.phase * 3)
          if (glow < 0.25) continue
          ctx.globalAlpha = glow * 0.35
          ctx.fillStyle = '#ffe27a'
          ctx.fillRect(Math.round(m.x) - 1, Math.round(m.y) - 1, 3, 3)
          ctx.globalAlpha = glow
          ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1)
          ctx.globalAlpha = 1
        } else {
          ctx.fillStyle = th.seed
          ctx.globalAlpha = 0.8
          ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1)
          ctx.globalAlpha = 1
        }
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame)
    }

    const start = () => { cancelAnimationFrame(raf); prev = performance.now(); raf = requestAnimationFrame(frame) }
    redrawRef.current = start

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left, y = e.clientY - rect.top
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      pointer.x = x / P; pointer.y = y / P
    }
    const onLeave = () => { pointer.active = false }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    const ro = new ResizeObserver(() => { resize(); start() })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start(); else cancelAnimationFrame(raf)
    })
    io.observe(canvas)
    start()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  useEffect(() => { redrawRef.current() }, [resolvedTheme])

  return <canvas ref={canvasRef} className="hero-sky" aria-hidden="true" />
}
