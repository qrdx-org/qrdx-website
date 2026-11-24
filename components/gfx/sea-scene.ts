/**
 * Drives sea.wgsl: the pointer's turn, the scroll, and real chain events. `block(hash)` drops a
 * ripple where the block's hash points; `finalized()` sends a swell in from the horizon.
 */

import { effect, frame, frameLoop, surface } from 'vgpu'
import type { Effect, Frame, FrameLoopHandle, Gpu, Surface } from 'vgpu'
import seaShader from './sea.wgsl'
import { onThemeChange, prefersReducedMotion, sharedGpu, tokenRgb } from '@/lib/gpu'

const RIPPLES = 8
/** sea.wgsl's FOCAL, and its eye's travel with the scroll. */
const FOCAL = 1.7
const TRAVEL = 1.4

/**
 * Where a block's ripple falls, chosen by its hash (the same block, the same place): x across the
 * view and z (distance) on the sea, at a depth where its ring reads. On a wide screen it falls on
 * the side away from the headline.
 */
export function rippleAt(hash: string, aspect: number, eyeZ: number): [number, number] {
  const hex = hash.replace(/^0x/, '').padEnd(8, '0')
  const u = parseInt(hex.slice(0, 4), 16) / 0xffff
  const v = parseInt(hex.slice(4, 8), 16) / 0xffff
  const z = 1.3 + v * 1.9
  const half = (aspect * z) / FOCAL
  const x = aspect > 1.05 ? (-0.3 + u * 1.2) * half : (u - 0.5) * 1.5 * half
  return [x, eyeZ + z]
}

export interface SeaOptions {
  canvas: HTMLCanvasElement
  /** How strongly the sea shows: 1 on the home hero, lower behind page titles. */
  intensity: number
  /** Called once the first frame is on the canvas (or never, when WebGPU is unavailable). */
  onReady: () => void
  onFail: () => void
}

export function startSea({ canvas, intensity, onReady, onFail }: SeaOptions) {
  let disposed = false
  let gpu: Gpu | null = null
  let out: Surface | null = null
  let fx: Effect | null = null
  let loop: FrameLoopHandle | null = null
  let ready = false
  const still = prefersReducedMotion()

  const t0 = performance.now()
  const now = () => (performance.now() - t0) / 1000
  // Reduced motion: one moment, held.
  const time = () => (still ? 14 : 14 + now())
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let scroll = 0
  // Each block's ripple: where it fell (x, _, z) and its age in seconds (99: none yet).
  const ripples: [number, number, number, number][] = Array.from({ length: RIPPLES }, () => [0, 0, 0, 99])
  const fell: number[] = Array(RIPPLES).fill(-99)
  let next = 0
  let waveAt = -99
  // Frame times, to step down resolution once on a slow GPU.
  let slowFrames = 0
  let frames = 0
  let last = 0
  let lowRes = false

  function colors() {
    if (!fx) return
    const dark = document.documentElement.classList.contains('dark')
    fx.set({ params: { bg: tokenRgb('--background'), fg: tokenRgb('--foreground'), dark: dark ? 1 : 0 } })
  }

  function render(currentFrame: Frame) {
    if (!fx || !out) return
    const t = time()
    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    for (let i = 0; i < RIPPLES; i++) ripples[i][3] = still ? 99 : t - fell[i]
    fx.set({
      params: {
        resolution: out.size,
        time: t,
        scroll,
        pointer: still ? [0, 0] : [pointer.x, pointer.y],
        waveAge: still ? 99 : t - waveAt,
        fade: 1 - scroll * 0.75,
        ripples,
      },
    })
    currentFrame.pass(out, fx)
  }

  function tick(currentFrame: Frame) {
    render(currentFrame)
    if (!ready) {
      ready = true
      onReady()
    }
    const ms = performance.now()
    if (last && !lowRes && frames < 240) {
      frames++
      if (ms - last > 26) slowFrames++
      if (frames === 120 && slowFrames > 60) downshift()
    }
    last = ms
  }

  function downshift() {
    if (!gpu || !out) return
    lowRes = true
    out.dispose()
    out = surface(gpu, canvas, { dpr: 1, alphaMode: 'opaque', label: 'sea' })
  }

  function play() {
    if (!gpu || loop || disposed) return
    if (still) {
      frame(gpu, render)
      if (!ready) {
        ready = true
        onReady()
      }
      return
    }
    last = 0
    loop = frameLoop(gpu, tick, { fps: 60 })
  }

  function pause() {
    loop?.stop()
    loop = null
  }

  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  const onScroll = () => {
    // How far this canvas has scrolled up past the top of the window, as a share of its height.
    const r = canvas.getBoundingClientRect()
    scroll = Math.min(1, Math.max(0, -r.top / (r.height || 1)))
    if (still && gpu) frame(gpu, render)
  }
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()))
  let stopTheme = () => {}

  void (async () => {
    try {
      gpu = await sharedGpu()
      if (disposed) return
      if (!gpu) return onFail()
      void gpu.lost.then(() => {
        if (disposed) return
        pause()
        onFail()
      })
      // The dots are drawn per device pixel, so they stay round and crisp.
      out = surface(gpu, canvas, { dpr: [1, 2], alphaMode: 'opaque', label: 'sea' })
      fx = effect(gpu, seaShader, {
        label: 'sea',
        set: {
          params: {
            resolution: out.size,
            pointer: [0, 0],
            time: time(),
            scroll: 0,
            dark: 1,
            intensity,
            bg: [0, 0, 0],
            waveAge: 99,
            fg: [1, 1, 1],
            fade: 1,
            ripples,
          },
        },
      })
      await fx.compile(out)
      if (disposed) return
      colors()
      stopTheme = onThemeChange(() => {
        colors()
        if (still && gpu) frame(gpu, render)
      })
      window.addEventListener('pointermove', onPointer, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      io.observe(canvas)
      play()
    } catch (e) {
      console.warn('QRDX graphics: the sea is showing its still frame.', e)
      if (!disposed) onFail()
    }
  })()

  return {
    /** A new block from the stream: a ripple runs out from where its hash points. */
    block(hash: string) {
      if (!fx || !out || still) return
      const i = next++ % RIPPLES
      const [x, z] = rippleAt(hash, out.size[0] / Math.max(out.size[1], 1), scroll * TRAVEL)
      ripples[i] = [x, 0, z, 0]
      fell[i] = time()
    },
    /** An epoch was finalized: a swell runs in from the horizon. */
    finalized() {
      if (!fx || still) return
      waveAt = time()
    },
    dispose() {
      disposed = true
      pause()
      io.disconnect()
      stopTheme()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      // After a lost device these can throw; there is nothing left to free then.
      for (const free of [() => fx?.dispose(), () => out?.dispose()]) {
        try {
          free()
        } catch {}
      }
    },
  }
}
