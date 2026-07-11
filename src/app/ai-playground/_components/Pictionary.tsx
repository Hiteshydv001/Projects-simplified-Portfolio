'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Palette,
  RotateCcw,
  Trash2,
  Brain,
  Type
} from 'lucide-react'
import { Button } from '@/components/ui/primitives/button'
import Text from '@/components/ui/text/text'
import TextHeading from '@/components/ui/text-heading/text-heading'
import { useToast } from '@/components/ui/toast/use-toast'
import { guessDrawing } from './gemini-actions'

interface Point {
  x: number
  y: number
}

interface Stroke {
  points: Point[]
  color: string
  width: number
  opacity: number
}

const COLORS = [
  '#000000', '#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#6366F1', '#EC4899', '#FFFFFF'
]

const WIDTHS = [2, 5, 10, 20]

export default function Pictionary() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [width, setWidth] = useState(5)
  const [opacity, setOpacity] = useState(1)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const strokesRef = useRef<Stroke[]>([])
  const currentStrokeRef = useRef<Point[]>([])
  const lastPointRef = useRef<Point | null>(null)
  const dprRef = useRef(1)
  const [aiResult, setAiResult] = useState<{ description: string, guesses: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    strokesRef.current = strokes
    if (isClient && canvasRef.current) {
      renderCanvas()
    }
  }, [strokes, isClient])

  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    const canvas = canvasRef.current
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      dprRef.current = dpr
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      renderCanvas()
    }

    resizeCanvas()
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [isClient])

  const renderCanvas = (activeStroke?: Stroke) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = dprRef.current || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.globalAlpha = 1

    const allStrokes = activeStroke ? [...strokesRef.current, activeStroke] : strokesRef.current
    allStrokes.forEach(stroke => {
      ctx.beginPath()
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.globalAlpha = stroke.opacity
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      stroke.points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    })
    ctx.globalAlpha = 1
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    const pos = getPos(e)
    currentStrokeRef.current = [pos]
    lastPointRef.current = pos
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getPos(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) {
      lastPointRef.current = pos
      currentStrokeRef.current = [pos]
      return
    }

    currentStrokeRef.current = [...currentStrokeRef.current, pos]
    lastPointRef.current = pos
    renderCanvas({ points: currentStrokeRef.current, color, width, opacity })
  }

  const stopDrawing = (e?: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    if (e) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setIsDrawing(false)
    if (currentStrokeRef.current.length > 0) {
      const finishedStroke: Stroke = {
        points: [...currentStrokeRef.current],
        color,
        width,
        opacity,
      }
      setStrokes(prev => [...prev, finishedStroke])
    }
    currentStrokeRef.current = []
    lastPointRef.current = null
  }

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect()

    const { clientX, clientY } = e

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const clearCanvas = () => {
    currentStrokeRef.current = []
    strokesRef.current = []
    lastPointRef.current = null
    setIsDrawing(false)
    setStrokes([])
    setAiResult(null)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const dpr = dprRef.current || 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)
    }
  }

  const undo = () => {
    setStrokes(prev => prev.slice(0, -1))
  }

  const handleGuess = async () => {
    if (strokes.length === 0) {
      toast({
        title: "Nothing to analyze",
        description: "Draw something first.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const canvas = canvasRef.current
      if (!canvas) return
      
      // Create a temporary canvas with white background for Gemini
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tCtx = tempCanvas.getContext('2d')
      if (!tCtx) return
      
      tCtx.fillStyle = '#FFFFFF'
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
      tCtx.drawImage(canvas, 0, 0)
      
      const dataUrl = tempCanvas.toDataURL('image/png')
      const result = await guessDrawing(dataUrl)
      setAiResult(result)
    } catch (error) {
      console.error(error)
      toast({
        title: "Gemini failed",
        description: "Check your API key and model access, then try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isClient) return null

  return (
    <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[200px_minmax(0,1fr)] 2xl:grid-cols-[200px_minmax(0,1fr)_200px]">
      {/* Tools Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="surface-card flex h-fit flex-col gap-5 rounded-2xl p-5"
      >
        <div className="space-y-4">
          <Text variant="caption" className="text-accent font-semibold uppercase tracking-wider">Colors</Text>
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-accent scale-110 shadow-lg' : 'border-border/20'} ${c === '#FFFFFF' ? 'ring-1 ring-border/30' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="caption" className="text-accent font-semibold uppercase tracking-wider">Thickness</Text>
          <div className="flex gap-2 justify-between">
            {WIDTHS.map(w => (
              <button
                key={w}
                onClick={() => setWidth(w)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border border-border/20 transition-all ${width === w ? 'bg-accent text-white border-accent' : 'bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'}`}
              >
                <div style={{ width: Math.max(2, w/2), height: Math.max(2, w/2) }} className="bg-current rounded-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Text variant="caption" className="text-accent font-semibold uppercase tracking-wider">Actions</Text>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              className="h-10 rounded-full border-border/20 bg-white/70 text-foreground dark:bg-white/5 dark:text-white/80 hover:bg-white/90 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCanvas}
              className="h-10 rounded-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Canvas Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex min-w-0 flex-col gap-4"
      >
        <div className="group relative aspect-[16/10] min-h-[280px] w-full overflow-hidden rounded-2xl border border-border/20 bg-white/85 p-3 shadow-2xl backdrop-blur-sm sm:min-h-[320px]">
          <div className="relative w-full h-full rounded-xl border border-border/10 bg-white dark:bg-white shadow-inner">
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              onPointerCancel={stopDrawing}
              className="w-full h-full rounded-xl cursor-crosshair touch-none"
            />
          </div>
          {!strokes.length && !loading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="text-center">
                <Palette className="w-12 h-12 mx-auto mb-2" />
                <Text>Start drawing here...</Text>
              </div>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <Text className="text-white font-medium">AI is thinking...</Text>
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={handleGuess}
          disabled={loading || strokes.length === 0}
          className="w-full h-10 rounded-full bg-accent hover:bg-accent/90 text-white text-sm font-semibold shadow-lg shadow-accent/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? "Guessing..." : "Analyze with Gemini"}
          <Brain className="ml-3 w-6 h-6" />
        </Button>
      </motion.div>

      {/* AI Guesses Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="surface-card flex min-h-[260px] flex-col gap-5 rounded-2xl p-5 xl:col-span-2 2xl:col-auto 2xl:min-h-[400px]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/10 pb-4">
          <TextHeading as="h3" weight="bold">AI Guesses</TextHeading>
          <div className="p-2 rounded-lg bg-white text-black border border-border/20">
            <Brain className="w-5 h-5" />
          </div>
        </div>
        <Text size="sm" className="-mt-2 text-foreground/80">
          Draw and click analyze to see AI predictions.
        </Text>

        <AnimatePresence mode="wait">
          {aiResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Text variant="caption" className="text-accent uppercase font-bold text-[10px] tracking-widest">Description</Text>
                <Text className="leading-relaxed text-sm text-foreground/80">"{aiResult.description}"</Text>
              </div>

              <div className="space-y-4">
                <Text variant="caption" className="text-accent uppercase font-bold text-[10px] tracking-widest">Top Guesses</Text>
                <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
                  {aiResult.guesses.map((guess, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i}
                      className="group rounded-xl border border-border/10 bg-white/70 p-3 transition-all hover:border-accent/30 hover:bg-accent/10 dark:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <Text className="line-clamp-3 pr-2 text-sm font-semibold leading-relaxed group-hover:text-accent transition-colors">
                          {guess}
                        </Text>
                        <span className="text-[10px] bg-accent/20 text-accent px-2 py-1 rounded-full uppercase font-bold">
                          #{(100 - i * 15)}% Match
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-4 text-foreground/70"
            >
              <div className="p-4 rounded-full border-2 border-dashed border-foreground/40">
                <Type className="w-10 h-10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
