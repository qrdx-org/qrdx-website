'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { marketName, useTestnet, type ChainStats } from '@/lib/live'
import { cn } from '@/lib/utils'

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export function PageHero({ eyebrow, title, children, actions }: { eyebrow?: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="hero-glow border-b">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-32 text-center sm:pt-36">
        {eyebrow && <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}
        </motion.h1>
        {children && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {children}
          </motion.div>
        )}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
    </section>
  )
}

export function Section({ title, intro, children, className, id }: { title?: ReactNode; intro?: ReactNode; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-4 py-16 sm:py-20', className)}>
      {(title || intro) && (
        <motion.div {...fadeUp} className="mx-auto mb-10 max-w-2xl text-center">
          {title && <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
          {intro && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p>}
        </motion.div>
      )}
      {children}
    </section>
  )
}

export function Feature({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: ReactNode }) {
  return (
    <motion.div {...fadeUp} className="rounded-xl border bg-card p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </motion.div>
  )
}

export function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' }) {
  const external = href.startsWith('http')
  const cls = cn(
    'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all',
    variant === 'primary' ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border bg-card hover:bg-accent'
  )
  const icon = external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />
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
    <div className={cn('rounded-xl border p-5', tone === 'warn' ? 'border-warn/40 bg-warn/5' : 'border-primary/30 bg-primary/5')}>
      <p className={cn('text-sm font-semibold', tone === 'warn' ? 'text-warn' : 'text-primary')}>{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

const n = (v: number | null, f: (x: number) => string = (x) => x.toLocaleString()) => (v === null ? '—' : f(v))

/** Testnet, live: read from the node and the trade API in the visitor's browser. */
export function LiveTiles({ stats }: { stats?: ChainStats & { live: boolean } }) {
  const own = useTestnet()
  const s = stats ?? own
  const trades = s.markets ? s.markets.reduce((t, m) => t + (m.trades_24h ?? 0), 0) : null
  const tiles = [
    { label: 'Block height', value: n(s.height) },
    { label: 'Block interval', value: n(s.blockInterval, (x) => `${x.toFixed(1)} s`) },
    { label: 'Validators', value: n(s.validators) },
    { label: 'Markets', value: n(s.markets ? s.markets.length : null) },
    { label: 'Trades, 24 h', value: n(trades) },
    { label: 'Native tokens', value: n(s.tokens) },
  ]
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <span className={cn('h-1.5 w-1.5 rounded-full', s.live ? 'pulse-dot bg-bid text-bid' : 'bg-muted-foreground')} />
          QRDX testnet, live
        </span>
        <span>read from test.qrdx.org{s.chainId ? ` · chain ${s.chainId}` : ''}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t, i) => (
          <div key={t.label} className={cn('px-4 py-4', i > 0 && 'border-t sm:border-t-0', i % 2 === 1 && 'border-l', 'lg:border-l lg:first:border-l-0')}>
            <div className="text-xs text-muted-foreground">{t.label}</div>
            <div className="num mt-1 text-xl font-semibold tracking-tight">{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The busiest markets right now. */
export function LiveMarkets({ kind, limit = 8, stats }: { kind?: 'spot' | 'perp'; limit?: number; stats?: ChainStats }) {
  const own = useTestnet()
  const s = stats ?? own
  const rows = (s.markets ?? [])
    .filter((m) => !kind || m.type === kind)
    .sort((a, b) => (b.trades_24h ?? 0) - (a.trades_24h ?? 0) || (b.last_price ? 1 : 0) - (a.last_price ? 1 : 0))
    .slice(0, limit)
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="num w-full text-sm">
        <thead className="border-b text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium">Market</th>
            <th className="px-4 py-2.5 text-right font-medium">Last</th>
            <th className="px-4 py-2.5 text-right font-medium">24 h</th>
            <th className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">Trades, 24 h</th>
          </tr>
        </thead>
        <tbody>
          {s.markets === null ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                Reading the chain…
              </td>
            </tr>
          ) : (
            rows.map((m) => {
              const ch = m.change_pct_24h ? Number(m.change_pct_24h) : null
              const last = m.type === 'perp' ? m.mark_price ?? m.last_price : m.last_price
              return (
                <tr key={m.market} className="border-b last:border-b-0">
                  <td className="px-4 py-2.5">
                    <span className="font-medium">{marketName(m)}</span>
                    <span className="ml-2 rounded border px-1 py-px text-[10px] uppercase text-muted-foreground">{m.type}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">{last && Number(last) > 0 ? Number(last).toPrecision(6) : '—'}</td>
                  <td className={cn('px-4 py-2.5 text-right', ch === null ? 'text-muted-foreground' : ch >= 0 ? 'text-bid' : 'text-ask')}>{ch === null ? '—' : `${ch > 0 ? '+' : ''}${ch.toFixed(2)}%`}</td>
                  <td className="hidden px-4 py-2.5 text-right text-muted-foreground sm:table-cell">{m.trades_24h}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
