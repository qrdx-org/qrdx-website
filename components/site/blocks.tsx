'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Lattice } from '@/components/gfx/Lattice'
import { Index, RollingNumber, spotlight } from '@/components/site/motion'
import { fmtPrice, useTestnet, type ChainStats } from '@/lib/live'
import { apps } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Pages spread this on motion elements. Entrances are CSS (`.reveal`, `.rise-in` in globals.css),
 * so it is a no-op kept for those call sites.
 */
export const fadeUp = {}

/** The site's measure: everything lines up on this column. */
export const WRAP = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground', className)}>{children}</p>
}

/** A page's title beside a quieter lattice than the home page's. */
export function PageHero({ eyebrow, title, children, actions }: { eyebrow?: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="relative isolate border-b">
      <Lattice intensity={0.6} className="absolute inset-0 -z-10" />
      <div className={cn(WRAP, 'pb-14 pt-28 sm:pb-20 sm:pt-40')}>
        {eyebrow && (
          <Eyebrow className="rise-in mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-signal" />
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="rise-in max-w-4xl text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[4.25rem]" style={{ '--d': '80ms' } as React.CSSProperties}>
          {title}
        </h1>
        {children && (
          <div className="rise-in mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground" style={{ '--d': '200ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
        {actions && (
          <div className="rise-in mt-9 flex flex-wrap gap-3" style={{ '--d': '300ms' } as React.CSSProperties}>
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * A titled band: the title on the left, the introduction beside it, the content full width below.
 * With `index` ("01") and `label`, a numbered rule draws in above it.
 */
export function Section({
  title,
  intro,
  children,
  className,
  id,
  index,
  label,
}: {
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  id?: string
  index?: string
  label?: string
}) {
  return (
    <section id={id} className={cn(WRAP, 'py-16 sm:py-28', className)}>
      {index && label && <Index n={index} label={label} />}
      {(title || intro) && (
        <div className="reveal mb-10 grid gap-4 sm:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
          {title && <h2 className="text-balance text-[2rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[2.9rem]">{title}</h2>}
          {intro && <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">{intro}</p>}
        </div>
      )}
      <div className="reveal">{children}</div>
    </section>
  )
}

/** A point under a rule. The icon is a small marker beside the title, not a badge. */
export function Feature({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: ReactNode }) {
  return (
    <div className="group relative border-t border-foreground/15 pb-2 pt-5">
      <span className="absolute -top-px left-0 h-px w-0 bg-signal transition-[width] duration-700 ease-out-expo group-hover:w-full" />
      <h3 className="flex items-center gap-2 font-medium tracking-tight">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-signal" />
        {title}
      </h3>
      <div className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' }) {
  const external = href.startsWith('http')
  const cls = cn(
    'group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-[background-color,border-color,box-shadow] duration-300',
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:shadow-[0_0_0_4px_hsl(var(--signal)/0.18)] dark:hover:shadow-[0_0_32px_-4px_hsl(var(--signal)/0.7)]'
      : 'border border-foreground/15 bg-background/40 backdrop-blur-sm hover:border-foreground/40 hover:bg-accent'
  )
  const icon = external ? (
    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
  ) : (
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} {icon}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children} {icon}
    </Link>
  )
}

export function Note({ title, children, tone = 'info' }: { title: string; children: ReactNode; tone?: 'info' | 'warn' }) {
  return (
    <div className={cn('border-l-2 py-1 pl-5', tone === 'warn' ? 'border-warn' : 'border-signal')}>
      <p className={cn('text-sm font-medium', tone === 'warn' && 'text-warn')}>{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export const num = (v: number | null, f: (x: number) => string = (x) => x.toLocaleString('en-US')) => (v === null ? '—' : f(v))

/** Testnet, live: read from the node and the trade API in the visitor's browser. */
export function LiveTiles({ stats }: { stats?: ChainStats }) {
  const own = useTestnet()
  const s = stats ?? own
  return (
    <StatGrid
      tiles={[
        { label: 'Block height', value: num(s.height) },
        { label: 'Block interval', value: num(s.blockInterval, (x) => `${Math.round(x * 1000)} ms`) },
        { label: 'Finalized epoch', value: num(s.finalizedEpoch) },
        { label: 'Validators', value: num(s.validators) },
        { label: 'Trades, 24 h', value: num(s.trades24h) },
        { label: 'Native tokens', value: num(s.tokens) },
      ]}
    />
  )
}

/** Six figures in a ruled row: two columns on a phone, three on a tablet, six on a desktop. */
export function StatGrid({ tiles }: { tiles: { label: string; value: ReactNode }[] }) {
  return (
    // The 1px gaps over the border colour are the rules between cells, at every column count.
    <div className="grid grid-cols-2 gap-px border-y bg-border sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map((t, i) => (
        // No left padding in each row's first cell, so the numbers line up with the text above.
        <div key={t.label} className={cn('bg-background py-6 pr-4', i % 2 ? 'pl-4' : 'pl-0', i % 3 ? 'sm:pl-4' : 'sm:pl-0', i ? 'lg:pl-4' : 'lg:pl-0')}>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{t.label}</div>
          <div className="num mt-2.5 text-[1.7rem] font-medium tracking-[-0.03em]">{typeof t.value === 'string' && /\d/.test(t.value) ? <RollingNumber value={t.value} /> : t.value}</div>
        </div>
      ))}
    </div>
  )
}

/** Markets as trade.qrdx.org lists them, busiest first; each row opens its page there. */
export function LiveMarkets({ kind, limit = 8, stats }: { kind?: 'spot' | 'perp'; limit?: number; stats?: ChainStats }) {
  const own = useTestnet()
  const s = stats ?? own
  const rows = (s.markets ?? [])
    .filter((m) => !kind || m.type === kind)
    .sort((a, b) => Number(b.volume24h ?? 0) - Number(a.volume24h ?? 0) || (b.type === 'spot' ? 1 : 0) - (a.type === 'spot' ? 1 : 0))
    .slice(0, limit)
  return (
    <div className="border-t border-foreground/15">
      <div className="grid grid-cols-[1fr_auto_5rem] gap-4 border-b py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground sm:grid-cols-[1fr_auto_6rem_1.25rem]">
        <span>Market</span>
        <span className="text-right">Price</span>
        <span className="text-right">24 h</span>
        <span className="hidden sm:block" />
      </div>
      {s.markets === null ? (
        <p className="py-8 text-sm text-muted-foreground">Reading the chain…</p>
      ) : rows.length === 0 ? (
        <p className="py-8 text-sm text-muted-foreground">No markets.</p>
      ) : (
        rows.map((m) => {
          const ch = m.change24h !== null ? Number(m.change24h) : null
          return (
            <a
              key={m.id}
              href={`${apps.trade}${m.path}`}
              target="_blank"
              rel="noopener noreferrer"
              onPointerMove={spotlight}
              className="spot group grid grid-cols-[1fr_auto_5rem] items-center gap-4 border-b py-3 text-sm sm:grid-cols-[1fr_auto_6rem_1.25rem]"
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="truncate font-medium">{m.name}</span>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">{m.type === 'perp' ? 'perp' : 'spot'}</span>
              </span>
              <span className="num text-right">{fmtPrice(m.price)}</span>
              <span className={cn('num text-right', ch === null ? 'text-muted-foreground' : ch >= 0 ? 'text-bid' : 'text-ask')}>{ch === null ? '—' : `${ch > 0 ? '+' : ''}${ch.toFixed(2)}%`}</span>
              <ArrowUpRight className="hidden h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
            </a>
          )
        })
      )}
    </div>
  )
}
