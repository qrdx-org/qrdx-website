/**
 * Drives keyfield.wgsl: a slow camera sway over the key's columns, the columns rising when the
 * figure scrolls into view, and a read head walking the bytes. `setKey(hex)` uploads the key.
 */

import { draw, frame, frameLoop, storage, surface } from 'vgpu'
import type { Draw, Frame, FrameLoopHandle, Gpu, StorageBuffer, Surface } from 'vgpu'
import { orbitRig, perspective, rigPose, viewMatrices } from 'vgpu/scene'
import keyShader from './keyfield.wgsl'
import { onThemeChange, prefersReducedMotion, sharedGpu, tokenRgb } from '@/lib/gpu'

const BYTES = 1952

// The key's buffer belongs to the shared device (vgpu has no way to free one), so every mount
// of the figure reuses the same one.
const buffers = new WeakMap<Gpu, StorageBuffer>()
function keyBuffer(gpu: Gpu): StorageBuffer {
  let b = buffers.get(gpu)
  if (!b) buffers.set(gpu, (b = storage(gpu, BYTES * 4, 'read')))
  return b
}

const rig = orbitRig({ yaw: -0.38, pitch: 0.78, distance: 70, target: [0, 0.6, 0] })
const pose = { position: new Float32Array(3), quaternion: new Float32Array(4) }
const projection = new Float32Array(16)
const cam = { view: new Float32Array(16), viewProjection: new Float32Array(16) }

/** The camera `t` seconds in, swaying slowly around the field, framed for a w x h target. */
export function keyCamera(t: number, w: number, h: number, still = false) {
  rig.yaw = -0.38 + (still ? 0 : Math.sin(t * 0.12) * 0.22)
  rig.distance = w < h * 1.2 ? 118 : 90
  perspective({ fov: 30, near: 1, far: 200 }, w / Math.max(h, 1), projection)
  viewMatrices(rigPose(rig, pose), projection, cam)
  return { viewProjection: cam.viewProjection, eye: pose.position, fog: rig.distance - 8 }
}

export interface KeyFieldOptions {
  canvas: HTMLCanvasElement
  onReady: () => void
  onFail: () => void
}

export function startKeyField({ canvas, onReady, onFail }: KeyFieldOptions) {
  let disposed = false
  let gpu: Gpu | null = null
  let out: Surface | null = null
  let cols: Draw | null = null
  let buf: StorageBuffer | null = null
  let loop: FrameLoopHandle | null = null
  let ready = false
  let count = 0
  let pending = null as { bytes: Uint32Array<ArrayBuffer>; n: number } | null
  const still = prefersReducedMotion()

  const t0 = performance.now()
  // The columns rise from when the key is both read and on screen.
  let riseFrom: number | null = null
  let seen = false

  function colors() {
    if (!cols || !out) return
    const dark = document.documentElement.classList.contains('dark')
    const bg = tokenRgb('--card')
    out.clearColor = [...bg, 1]
    cols.set({ scene: { bg, line: tokenRgb('--foreground'), signal: tokenRgb('--signal'), dark: dark ? 1 : 0 } })
  }

  function render(currentFrame: Frame) {
    if (!cols || !out) return
    const t = (performance.now() - t0) / 1000
    if (riseFrom === null && seen && count) riseFrom = t
    const rise = still ? 1 : riseFrom === null ? 0 : Math.min(1, (t - riseFrom) / 2.6)
    const { viewProjection, eye, fog } = keyCamera(t, out.size[0], out.size[1], still)
    cols.set({
      camera: { viewProjection },
      scene: { time: t, rise, count, scan: still ? -100 : ((t * 160) % (BYTES + 400)) - 200, eye, fog },
    })
    currentFrame.pass(out, cols)
    if (!ready) {
      ready = true
      onReady()
    }
  }

  function play() {
    if (!gpu || loop || disposed || !cols) return
    if (still) return frame(gpu, render)
    loop = frameLoop(gpu, render, { fps: 60 })
  }

  function pause() {
    loop?.stop()
    loop = null
  }

  function upload(bytes: Uint32Array<ArrayBuffer>, n: number) {
    if (!buf) {
      pending = { bytes, n }
      return
    }
    buf.write(bytes)
    count = n
    if (still && gpu) frame(gpu, render)
  }

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      seen = true
      play()
    } else pause()
  })
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
      out = surface(gpu, canvas, { dpr: [1, 2], alphaMode: 'opaque', depth: true, msaa: true, label: 'key' })
      buf = keyBuffer(gpu)
      cols = draw(gpu, {
        shader: keyShader,
        label: 'key-columns',
        instances: BYTES,
        vertices: 36,
        cull: 'none',
        set: {
          key: buf,
          camera: { viewProjection: new Float32Array(16) },
          scene: { bg: [0, 0, 0], time: 0, line: [1, 1, 1], rise: 0, signal: [0, 1, 1], dark: 1, count: 0, scan: -100, eye: [0, 0, 0], fog: 50 },
        },
      })
      await cols.compile(out)
      if (disposed) return
      colors()
      if (pending) upload(pending.bytes, pending.n)
      stopTheme = onThemeChange(() => {
        colors()
        if (still && gpu) frame(gpu, render)
      })
      io.observe(canvas)
    } catch (e) {
      console.warn('QRDX graphics: key field is showing its still frame.', e)
      if (!disposed) onFail()
    }
  })()

  return {
    setKey(hex: string) {
      const n = Math.min(BYTES, hex.length >> 1)
      const bytes = new Uint32Array(BYTES)
      for (let i = 0; i < n; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
      upload(bytes, n)
    },
    dispose() {
      disposed = true
      pause()
      io.disconnect()
      stopTheme()
      // After a lost device these can throw; there is nothing left to free then.
      for (const free of [() => cols?.dispose(), () => out?.dispose()]) {
        try {
          free()
        } catch {}
      }
    },
  }
}
