/**
 * Drives lattice.wgsl: the camera's slow flight, the pointer's parallax, the scroll push, and
 * real chain events. `block(hash)` lights the node the block's hash points at; `finalized()`
 * sends a wave from just ahead of the camera.
 */

import { effect, frame, frameLoop, surface } from 'vgpu'
import type { Effect, Frame, FrameLoopHandle, Gpu, Surface } from 'vgpu'
import latticeShader from './lattice.wgsl'
import { onThemeChange, prefersReducedMotion, sharedGpu, tokenRgb } from '@/lib/gpu'

type Vec3 = [number, number, number]

const YAW = 0.62
const PITCH = 0.3
const SPEED = 0.3
const START: Vec3 = [0.37, 0.21, 0.0]
const BLOCKS = 6

/** lattice.wgsl's BASIS: world position to lattice coordinates. */
const toLattice = ([x, y, z]: Vec3): Vec3 => [x + 0.2 * y + 0.1 * z, y + 0.14 * z, z]

/** The camera's axes for a yaw and pitch, the same rotation the shader builds. */
function axes(yaw: number, pitch: number) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  // rotY(yaw) * rotX(pitch) applied to x, y and z.
  const right: Vec3 = [cy, 0, -sy]
  const up: Vec3 = [sy * sp, cp, cy * sp]
  const forward: Vec3 = [sy * cp, -sp, cy * cp]
  return { right, up, forward }
}

const add = (a: Vec3, b: Vec3, k = 1): Vec3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]
const AXES = axes(YAW, PITCH)

/** Where the camera is at `t` seconds into the flight, pushed ahead by the page's scroll (0 to 1). */
export const cameraAt = (t: number, scroll = 0): Vec3 => add(add(START, AXES.forward, t * SPEED), AXES.forward, scroll * 2.4)

/** The camera's position and angles with the pointer's parallax (-1 to 1 on each axis). */
export function view(t: number, scroll: number, px: number, py: number) {
  return {
    camPos: add(add(cameraAt(t, scroll), AXES.right, px * 0.25), AXES.up, py * 0.15),
    yaw: YAW + px * 0.07,
    pitch: PITCH - py * 0.05,
  }
}

/**
 * The lattice cell a block lights: ahead of the camera, placed by the block's hash. Wide screens
 * keep the headline's side (the left) quiet, phones the top.
 */
export function blockCell(hash: string, t: number, scroll: number, tall: boolean): Vec3 {
  const [a, b, c] = seed(hash)
  const side = tall ? (a - 0.5) * 1.8 : 0.35 + a * 1.9
  const lift = tall ? -0.3 - b * 1.1 : (b - 0.5) * 1.6
  let p = add(cameraAt(t + 1.5, scroll), AXES.forward, 3.6 + c * 3.4)
  p = add(add(p, AXES.right, side), AXES.up, lift)
  return toLattice(p).map(Math.round) as Vec3
}

/** Where a finality wave starts: just ahead of the camera, off to the right. */
export const waveCenter = (t: number, scroll: number): Vec3 => toLattice(add(add(cameraAt(t, scroll), AXES.forward, 5), AXES.right, 1.2))

/** Three numbers from 0 to 1 taken from a block hash, so the same block always lands on the same node. */
function seed(hash: string): Vec3 {
  const h = hash.replace(/^0x/, '')
  const part = (i: number) => parseInt(h.slice(i * 8, i * 8 + 8) || '0', 16) / 0xffffffff
  return [part(0), part(1), part(2)]
}

export interface LatticeOptions {
  canvas: HTMLCanvasElement
  /** How strongly the lattice shows: 1 on the home hero, lower behind page titles. */
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
  // Reduced motion: one moment of the flight, held.
  const time = () => (still ? 14 : now())
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let scroll = 0
  // Each block's lattice cell and its age in seconds (99: none yet).
  const blocks: [number, number, number, number][] = Array.from({ length: BLOCKS }, () => [0, 0, 0, 99])
  const blockAt: number[] = Array(BLOCKS).fill(-99)
  let nextBlock = 0
  let wave: { center: Vec3; at: number } = { center: [0, 0, 0], at: -99 }
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
    for (let i = 0; i < BLOCKS; i++) blocks[i][3] = still ? 99 : t - blockAt[i]
    fx.set({
      params: {
        resolution: out.size,
        time: t,
        ...view(t, scroll, pointer.x, pointer.y),
        waveCenter: wave.center,
        waveAge: still ? 99 : t - wave.at,
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
            camPos: START,
            time: 0,
            bg: [0, 0, 0],
            yaw: YAW,
            line: [1, 1, 1],
            pitch: PITCH,
            signal: [0, 1, 1],
            dark: 1,
            waveCenter: [0, 0, 0],
            waveAge: 99,
            intensity,
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
    /** A new block from the stream: light the node its hash lands on, ahead of the camera. */
    block(hash: string) {
      if (!fx || still) return
      const t = time()
      const cell = blockCell(hash, t, scroll, canvas.clientWidth < canvas.clientHeight * 0.95)
      const i = nextBlock++ % BLOCKS
      blocks[i] = [...cell, 0]
      blockAt[i] = t
    },
    /** An epoch was finalized: a wave runs out through the lattice. */
    finalized() {
      if (!fx || still) return
      const t = time()
      wave = { center: waveCenter(t, scroll), at: t }
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
