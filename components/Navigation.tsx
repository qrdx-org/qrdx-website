'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, BookOpen, ChevronDown, Code2, FileText, LineChart, Menu, Search, ShieldCheck, Wallet, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Wordmark } from '@/components/site/Logo'
import { apps, docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const PRODUCTS = [
  { href: '/trade', icon: LineChart, title: 'Trade', text: 'Spot books, pools and perpetuals' },
  { href: '/wallet', icon: Wallet, title: 'Wallet', text: 'Web, iPhone and browser extension' },
  { href: '/explorer', icon: Search, title: 'Explorer', text: 'Blocks, tokens, markets, profiles' },
  { href: '/stake', icon: ShieldCheck, title: 'Validate', text: 'Run a post-quantum validator' },
]

const DEVELOPERS = [
  { href: docs.build, icon: Code2, title: 'Build on QRDX', text: 'JSON-RPC, REST, streams, signing' },
  { href: docs.home, icon: BookOpen, title: 'Documentation', text: 'Guides, concepts and references' },
  { href: '/whitepaper', icon: FileText, title: 'Whitepaper', text: 'The protocol design' },
]

function Menu_({ label, items }: { label: string; items: typeof PRODUCTS }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        {label} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="w-80 rounded-xl border bg-popover p-2 shadow-xl">
          {items.map((i) => {
            const external = i.href.startsWith('http')
            return (
              <Link
                key={i.href}
                href={i.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-card">
                  <i.icon className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {i.title} {external && <ArrowUpRight className="h-3 w-3 text-muted-foreground" />}
                  </span>
                  <span className="block text-xs text-muted-foreground">{i.text}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md [body[data-pwa-iframe-active]_&]:hidden">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4">
        <Link href="/" className="mr-4" aria-label="QRDX home">
          <Wordmark />
        </Link>
        <div className="hidden items-center md:flex">
          <Menu_ label="Products" items={PRODUCTS} />
          <Menu_ label="Developers" items={DEVELOPERS} />
          <Link href="/get-started" className={cn('rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground', pathname === '/get-started' ? 'text-foreground' : 'text-muted-foreground')}>
            Get started
          </Link>
          <Link href="/about" className={cn('rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground', pathname === '/about' ? 'text-foreground' : 'text-muted-foreground')}>
            About
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground lg:inline-flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-bid text-bid" /> Testnet live
          </span>
          <ThemeToggle />
          <a
            href={apps.trade}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Launch app <ArrowUpRight className="h-4 w-4" />
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          {[...PRODUCTS, ...DEVELOPERS, { href: '/get-started', icon: BookOpen, title: 'Get started', text: '' }, { href: '/about', icon: FileText, title: 'About', text: '' }].map((i) => (
            <Link key={i.href} href={i.href} className="flex items-center gap-3 border-b py-3 text-sm last:border-b-0">
              <i.icon className="h-4 w-4 text-primary" /> {i.title}
            </Link>
          ))}
          <a href={apps.trade} className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
            Launch app <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  )
}
