'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Wordmark } from '@/components/site/Logo'
import { useTestnet } from '@/lib/live'
import { apps, docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const PRODUCTS = [
  { href: '/trade', title: 'Trade', text: 'Spot books, pools and perpetuals' },
  { href: '/wallet', title: 'Wallet', text: 'Extension, web and iPhone' },
  { href: '/explorer', title: 'Explorer', text: 'Blocks, tokens, markets, profiles' },
  { href: '/stake', title: 'Validate', text: 'Run or delegate to a validator' },
]

const DEVELOPERS = [
  { href: docs.build, title: 'Build on QRDX', text: 'JSON-RPC, REST, streams, signing' },
  { href: docs.home, title: 'Documentation', text: 'Guides, concepts and references' },
  { href: '/whitepaper', title: 'Whitepaper', text: 'The protocol design' },
]

const LINK = 'rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground'

function Menu_({ label, items }: { label: string; items: typeof PRODUCTS }) {
  return (
    <div className="group relative">
      <button className={cn(LINK, 'flex items-center gap-1 text-muted-foreground group-focus-within:text-foreground')}>
        {label} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="w-72 rounded-lg border bg-popover p-1.5 shadow-lg shadow-black/5">
          {items.map((i) => {
            const external = i.href.startsWith('http')
            return (
              <Link key={i.href} href={i.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block rounded-md px-3 py-2.5 transition-colors hover:bg-accent">
                <span className="flex items-center gap-1 text-sm font-medium">
                  {i.title} {external && <ArrowUpRight className="h-3 w-3 text-muted-foreground" />}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{i.text}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Testnet's height, following the block stream: the one live thing in the bar. */
function Height() {
  const { height, live } = useTestnet()
  return (
    <a
      href={apps.explorer}
      target="_blank"
      rel="noopener noreferrer"
      title="Testnet block height"
      className="hidden items-center gap-2 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'pulse-dot bg-bid text-bid' : 'bg-muted-foreground')} />
      <span className="num">testnet {height ? `#${height.toLocaleString('en-US')}` : '—'}</span>
    </a>
  )
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors [body[data-pwa-iframe-active]_&]:hidden',
        scrolled || open ? 'border-border bg-background/85 backdrop-blur-md' : 'border-transparent bg-background/0'
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-2 px-5 sm:px-8">
        <Link href="/" className="-ml-1 mr-5 p-1" aria-label="QRDX home">
          <Wordmark />
        </Link>
        <div className="hidden items-center md:flex">
          <Menu_ label="Products" items={PRODUCTS} />
          <Menu_ label="Developers" items={DEVELOPERS} />
          {[
            { href: '/get-started', label: 'Get started' },
            { href: '/about', label: 'About' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className={cn(LINK, pathname === l.href ? 'text-foreground' : 'text-muted-foreground')}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Height />
          <ThemeToggle />
          <a
            href={apps.trade}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Open Trade <ArrowUpRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background px-5 pb-5 md:hidden">
          {[
            { label: 'Products', items: PRODUCTS },
            { label: 'Developers', items: DEVELOPERS },
            {
              label: 'QRDX',
              items: [
                { href: '/get-started', title: 'Get started', text: '' },
                { href: '/about', title: 'About', text: '' },
              ],
            },
          ].map((g) => (
            <div key={g.label} className="pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{g.label}</p>
              {g.items.map((i) => (
                <Link key={i.href} href={i.href} className="flex items-baseline justify-between gap-4 border-b py-3 text-[15px]">
                  {i.title}
                  {i.text && <span className="truncate text-xs text-muted-foreground">{i.text}</span>}
                </Link>
              ))}
            </div>
          ))}
          <a href={apps.trade} className="mt-5 flex h-11 items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-medium text-primary-foreground">
            Open Trade <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  )
}
