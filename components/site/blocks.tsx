'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { fmtPrice, useTestnet, type ChainStats } from '@/lib/live'
import { apps } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Pages spread this on motion elements. Content is there when the page is: no scroll-triggered
 * entrances, so it is a no-op kept for those call sites.
 */
export const fadeUp = {}

/** The site's measure: everything lines up on this column. */
export const WRAP = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground', className)}>{children}</p>
}

export function PageHero({ eyebrow, title, children, actions }: { eyebrow?: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="border-b">
      <div className={cn(WRAP, 'pb-14 pt-28 sm:pb-20 sm:pt-36')}>
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{children}</div>}
        {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}

/** A titled band: the title on the left, the introduction beside it, the content full width below. */
export function Section({ title, intro, children, className, id }: { title?: ReactNode; intro?: ReactNode; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn(WRAP, 'py-16 sm:py-24', className)}>
      {(title || intro) && (
        <div className="mb-10 grid gap-4 sm:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
          {title && <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">{title}</h2>}
          {intro && <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground lg:justify-self-end">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

/** A point under a rule. The icon is a small marker beside the title, not a badge. */
export function Feature({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: ReactNode }) {
  return (
    <div className="border-t border-foreground/15 pb-2 pt-5">
      <h3 className="flex items-center gap-2 font-medium tracking-tight">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        {title}
      </h3>
      <div className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' }) {
  const external = href.startsWith('http')
  const cls = cn(
    'group inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors',
    variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-foreground/15 hover:border-foreground/40 hover:bg-accent'
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
    <div className={cn('border-l-2 py-1 pl-5', tone === 'warn' ? 'border-warn' : 'border-primary')}>
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
  const tiles = [
    { label: 'Block height', value: num(s.height) },
    { label: 'Block interval', value: num(s.blockInterval, (x) => `${Math.round(x * 1000)} ms`) },
    { label: 'Finalized epoch', value: num(s.finalizedEpoch) },
    { label: 'Validators', value: num(s.validators) },
    { label: 'Trades, 24 h', value: num(s.trades24h) },
    { label: 'Native tokens', value: num(s.tokens) },
  ]
  return (
    // The 1px gaps over the border colour are the rules between cells, at every column count.
    <div className="grid grid-cols-2 gap-px border-y bg-border sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map((t, i) => (
        // No left padding in each row's first cell, so the numbers line up with the text above.
        <div key={t.label} className={cn('bg-background py-5 pr-4', i % 2 ? 'pl-4' : 'pl-0', i % 3 ? 'sm:pl-4' : 'sm:pl-0', i ? 'lg:pl-4' : 'lg:pl-0')}>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{t.label}</div>
          <div className="num mt-2 text-2xl font-medium tracking-tight">{t.value}</div>
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
              className="group grid grid-cols-[1fr_auto_5rem] items-center gap-4 border-b py-3 text-sm transition-colors hover:bg-accent/50 sm:grid-cols-[1fr_auto_6rem_1.25rem]"
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
