'use client'

/**
 * One WebGPU device for the whole tab, shared by every canvas on the site (components/gfx).
 * It lives as long as the page does. Null where the browser has no WebGPU, or no adapter: the
 * graphics then show their still frames instead. If the device is lost (a driver reset), the
 * graphics fall back to their stills and the next one to mount asks for a new device.
 */

import type { Gpu } from 'vgpu'

let device: Promise<Gpu | null> | null = null

export function sharedGpu(): Promise<Gpu | null> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) return Promise.resolve(null)
  device ??= import('vgpu')
    .then(({ init }) => init())
    .then((gpu) => {
      void gpu.lost.then(() => {
        device = null
      })
      return gpu
    })
    .catch(() => null)
  return device
}

/** True when the visitor asked for less motion: graphics render one still frame. */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** A theme colour token (`--background`, an "h s% l%" triple) as sRGB floats from 0 to 1. */
export function tokenRgb(name: string, el: Element = document.documentElement): [number, number, number] {
  const [h, s, l] = getComputedStyle(el)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .map((v) => parseFloat(v))
  const sat = (s || 0) / 100
  const lig = (l || 0) / 100
  const k = (n: number) => (n + (h || 0) / 30) % 12
  const a = sat * Math.min(lig, 1 - lig)
  const f = (n: number) => lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)]
}

/** Calls `cb` whenever the light/dark theme flips (next-themes toggles a class on <html>). */
export function onThemeChange(cb: () => void): () => void {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => mo.disconnect()
}
