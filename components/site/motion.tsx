'use client'

import type { PointerEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A headline that arrives word by word (`.rise-word` in globals.css). Parts marked `serif` are
 * set in the italic serif; `nowrap` keeps a part's words on one line.
 */
export function RiseText({ parts, className }: { parts: { text: string; serif?: boolean; nowrap?: boolean }[]; className?: string }) {
  let i = 0
  return (
    <span className={className}>
      {parts.map((p, pi) => {
        const words = p.text.split(' ').filter(Boolean)
        const inner = words.map((w, wi) => (
          <span key={wi}>
            <span className={cn('rise-word', p.serif && 'serif pr-[0.06em]')} style={{ '--i': i++ } as React.CSSProperties}>
              {w}
            </span>
            {wi < words.length - 1 && ' '}
          </span>
        ))
        return (
          <span key={pi}>
            {p.nowrap ? <span className="whitespace-nowrap">{inner}</span> : inner}
            {pi < parts.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

const DIGITS = '0123456789'

/**
 * A live figure whose digits roll to their new value, like a mechanical counter, so a block
 * height ticking four times a second reads as motion rather than flicker.
 */
export function RollingNumber({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn('num inline-block whitespace-nowrap', className)} aria-label={value} role="text">
      {Array.from(value).map((ch, i) => {
        const d = DIGITS.indexOf(ch)
        // Key from the right, so a new leading digit does not reset every column after it.
        const key = value.length - i
        if (d < 0)
          return (
            <span key={`s${key}`} aria-hidden>
              {ch}
            </span>
          )
        // The hidden digit gives the column its width and the line's baseline; the strip of
        // digits rolls over it, clipped to one row (clip-path, which unlike overflow keeps the baseline).
        return (
          <span key={key} aria-hidden className="relative inline-block [clip-path:inset(0)]">
            <span className="invisible">0</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col transition-transform ease-out-expo motion-reduce:transition-none"
              // The last digit of a block height changes four times a second: it switches, the rest roll.
              style={{ transform: `translateY(${-d * 10}%)`, transitionDuration: key === 1 ? '0ms' : '700ms' }}
            >
              {DIGITS.split('').map((n) => (
                <span key={n} className="text-center">
                  {n}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/** Pointer handler for `.spot` surfaces: moves their light to the pointer. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** A numbered section label: the index in signal, a rule drawn across as it scrolls in. */
export function Index({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:mb-10">
      <span className="text-signal">{n}</span>
      <span>{label}</span>
      <span className="rule-draw h-px flex-1 bg-foreground/15" />
    </div>
  )
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('reveal', className)}>{children}</div>
}
