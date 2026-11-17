'use client'

import Link from 'next/link'
import { Eyebrow, WRAP } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

const WHERE = [
  { href: '/', label: 'Home', text: 'Testnet, live' },
  { href: '/network', label: 'Network', text: 'Validators, governance, blocks' },
  { href: '/get-started', label: 'Get started', text: 'Wallet, testnet QRDX, a first trade' },
  { href: docs.home, label: 'Documentation', text: 'docs.qrdx.org' },
  { href: apps.trade, label: 'QRDX Trade', text: 'trade.qrdx.org' },
]

export default function NotFound() {
  return (
    <section className={`${WRAP} pb-24 pt-28 sm:pt-36`}>
      <Eyebrow className="mb-6">404</Eyebrow>
      <h1 className="max-w-3xl text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl">There is no page here.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">The link may be old, or the page may have moved. One of these is probably what you were after.</p>
      <ul className="mt-12 max-w-2xl border-t border-foreground/15">
        {WHERE.map((w) => {
          const external = w.href.startsWith('http')
          const cls = 'flex items-baseline justify-between gap-4 border-b py-3.5 transition-colors hover:bg-accent/50'
          const body = (
            <>
              <span className="font-medium">{w.label}</span>
              <span className="truncate text-sm text-muted-foreground">{w.text}</span>
            </>
          )
          return (
            <li key={w.href}>
              {external ? (
                <a href={w.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {body}
                </a>
              ) : (
                <Link href={w.href} className={cls}>
                  {body}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
