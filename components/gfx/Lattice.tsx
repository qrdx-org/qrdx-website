'use client'

import { useEffect, useRef, useState } from 'react'
import { useTestnet } from '@/lib/live'
import { cn } from '@/lib/utils'
import type { startLattice } from './lattice-scene'

/**
 * The liquid lattice (lattice.wgsl) behind a hero. Its still frame shows first and stays where the
 * browser has no WebGPU; the live canvas fades in over it once it has drawn. New testnet blocks
 * and finalized epochs, from the shared stream, swell and colour it.
 */
export function Lattice({ intensity = 1, className }: { intensity?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scene = useRef<ReturnType<typeof startLattice> | null>(null)
  const [state, setState] = useState<'loading' | 'live' | 'still'>('loading')
  const { blocks, finalizedEpoch } = useTestnet()
  const head = blocks[0]?.hash

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let live = true
    let s: ReturnType<typeof startLattice> | null = null
    import('./lattice-scene').then(
      ({ startLattice }) => {
        if (!live) return
        s = startLattice({ canvas, intensity, onReady: () => live && setState('live'), onFail: () => live && setState('still') })
        scene.current = s
      },
      (e) => {
        console.warn('QRDX graphics: could not load the lattice.', e)
        if (live) setState('still')
      }
    )
    return () => {
      live = false
      s?.dispose()
      scene.current = null
    }
  }, [intensity])

  useEffect(() => {
    if (head) scene.current?.block(head)
  }, [head])

  const epoch = useRef<number | null>(null)
  useEffect(() => {
    if (finalizedEpoch === null) return
    if (epoch.current !== null && finalizedEpoch > epoch.current) scene.current?.finalized()
    epoch.current = finalizedEpoch
  }, [finalizedEpoch])

  return (
    <div aria-hidden className={cn('pointer-events-none overflow-hidden [container-type:size]', className)}>
      <div className="lattice-still absolute inset-0 bg-cover bg-center" style={{ opacity: intensity }} />
      <canvas ref={canvasRef} className={cn('absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out', state === 'live' ? 'opacity-100' : 'opacity-0')} />
    </div>
  )
}
