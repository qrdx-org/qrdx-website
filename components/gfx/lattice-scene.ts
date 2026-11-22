/**
 * Drives lattice.wgsl: the form's slow turn, the pointer's tilt, the scroll, and real chain
 * events. `block(hash)` swells the node the block's hash points at; `finalized()` sends a band of
 * colour out through the form.
 */

import { effect, frame, frameLoop, surface } from 'vgpu'
import type { Effect, Frame, FrameLoopHandle, Gpu, Surface } from 'vgpu'
import latticeShader from './lattice.wgsl'
import { onThemeChange, prefersReducedMotion, sharedGpu, tokenRgb } from '@/lib/gpu'

type Vec3 = [number, number, number]

/** Radians the form turns each second. */
const SPIN = 0.07
const BLOCKS = 6
/** lattice.wgsl's CELLS and RADIUS. */
const CELLS = 1.7
const RADIUS = 1.45

/** lattice.wgsl's UNBASIS: lattice coordinates to the form's space. */
const fromLattice = ([x, y, z]: Vec3): Vec3 => [x - 0.2 * y - 0.072 * z, y - 0.14 * z, z]

/** The nodes deep enough inside the form to be fully formed: the ones a block can light. */
const NODES: Vec3[] = (() => {
  const out: Vec3[] = []
  for (let x = -3; x <= 3; x++)
    for (let y = -3; y <= 3; y++)
      for (let z = -3; z <= 3; z++) {
        const [a, b, c] = fromLattice([x, y, z])
        if (Math.hypot(a, b, c) / CELLS < RADIUS * 0.5) out.push([x, y, z])
      }
  return out
})()

/** The node a block lights, chosen by its hash, so the same block always lands on the same node. */
export function nodeFor(hash: string): Vec3 {
  const part = parseInt(hash.replace(/^0x/, '').slice(0, 8) || '0', 16) / 0x100000000
  return NODES[Math.floor(part * NODES.length)]
}

export interface LatticeOptions {
  canvas: HTMLCanvasElement
  /** How strongly the form shows: 1 on the home hero, lower behind page titles. */
  intensity: number
  /** Called once the first frame is on the canvas (or never, when WebGPU is unavailable). */
  onReady: () => void
  onFail: () => void
}

export function startLattice({ canvas, intensity, onReady, onFail }: LatticeOptions) {
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
  const time = () => (still ? 14 : now())
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let scroll = 0
  // Each block's lattice node and its age in seconds (99: none yet).
  const blocks: [number, number, number, number][] = Array.from({ length: BLOCKS }, () => [0, 0, 0, 99])
  const arrived: number[] = Array(BLOCKS).fill(-99)
  let nextBlock = 0
  let waveAt = -99
  // Frame times, to step down resolution once on a slow GPU.
  let slowFrames = 0
  let frames = 0
  let last = 0
  let lowRes = false

  function colors() {
    if (!fx) return
    const dark = document.documentElement.classList.contains('dark')
    fx.set({ params: { bg: tokenRgb('--background'), line: tokenRgb('--foreground'), signal: tokenRgb('--signal'), dark: dark ? 1 : 0 } })
  }

  function render(currentFrame: Frame) {
    if (!fx || !out) return
    const t = time()
    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    for (let i = 0; i < BLOCKS; i++) blocks[i][3] = still ? 99 : t - arrived[i]
    fx.set({
      params: {
        resolution: out.size,
        time: t,
        spin: t * SPIN + scroll * 1.1,
        scroll,
        pointer: still ? [0, 0] : [pointer.x, pointer.y],
        waveAge: still ? 99 : t - waveAt,
        fade: 1 - scroll * 0.75,
        blocks,
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
    out = surface(gpu, canvas, { dpr: 0.6, alphaMode: 'opaque', label: 'lattice' })
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
      const big = Math.max(window.innerWidth, window.innerHeight) > 1600
      out = surface(gpu, canvas, { dpr: [1, big ? 1.25 : 1.5], alphaMode: 'opaque', label: 'lattice' })
      fx = effect(gpu, latticeShader, {
        label: 'lattice',
        set: {
          params: {
            resolution: out.size,
            pointer: [0, 0],
            time: 0,
            spin: 0,
            scroll: 0,
            dark: 1,
            bg: [0, 0, 0],
            waveAge: 99,
            line: [1, 1, 1],
            intensity,
            signal: [0, 1, 1],
            fade: 1,
            blocks,
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
      console.warn('QRDX graphics: lattice is showing its still frame.', e)
      if (!disposed) onFail()
    }
  })()

  return {
    /** A new block from the stream: the node its hash points at swells and lights up. */
    block(hash: string) {
      if (!fx || still) return
      const i = nextBlock++ % BLOCKS
      blocks[i] = [...nodeFor(hash), 0]
      arrived[i] = time()
    },
    /** An epoch was finalized: a band of colour runs out through the form. */
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
