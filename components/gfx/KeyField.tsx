'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { startKeyField } from './keyfield-scene'

/**
 * A validator's public key as a field of columns (keyfield.wgsl), with `children` laid over it.
 * Without WebGPU it renders nothing, and the key's bytes stand on their own.
 */
export function KeyField({ publicKey, className, children }: { publicKey: string | null; className?: string; children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scene = useRef<ReturnType<typeof startKeyField> | null>(null)
  const [state, setState] = useState<'loading' | 'live' | 'still'>('loading')
  const key = useRef(publicKey)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let live = true
    let s: ReturnType<typeof startKeyField> | null = null
    import('./keyfield-scene').then(
      ({ startKeyField }) => {
        if (!live) return
        s = startKeyField({ canvas, onReady: () => live && setState('live'), onFail: () => live && setState('still') })
        scene.current = s
        if (key.current) s.setKey(key.current)
      },
      (e) => {
        console.warn('QRDX graphics: could not load the key field.', e)
        if (live) setState('still')
      }
    )
    return () => {
      live = false
      s?.dispose()
      scene.current = null
    }
  }, [])

  useEffect(() => {
    key.current = publicKey
    if (publicKey) scene.current?.setKey(publicKey)
  }, [publicKey])

  if (state === 'still') return null
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <canvas ref={canvasRef} aria-hidden className={cn('absolute inset-0 h-full w-full transition-opacity duration-1000', state === 'live' ? 'opacity-100' : 'opacity-0')} />
      {children}
    </div>
  )
}
