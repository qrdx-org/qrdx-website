import Link from 'next/link'
import { Github, Send, ShieldCheck, Twitter } from 'lucide-react'
import { Wordmark } from '@/components/site/Logo'
import { apps, contact, docs, social } from '@/lib/site'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'QRDX Trade', href: apps.trade },
      { label: 'QRDX Wallet', href: apps.wallet },
      { label: 'QRDX Explorer', href: apps.explorer },
      { label: 'Run a validator', href: '/stake' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Get started', href: '/get-started' },
      { label: 'Documentation', href: docs.home },
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'Status and roadmap', href: docs.roadmap },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Build on QRDX', href: docs.build },
      { label: 'JSON-RPC', href: docs.rpc },
      { label: 'Trade API', href: docs.tradeApi },
      { label: 'GitHub', href: social.github },
    ],
  },
  {
    title: 'QRDX',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Report a vulnerability', href: docs.reporting },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A blockchain secured by post-quantum signatures, with an exchange built into the protocol.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> ML-DSA-65 (FIPS 204)
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { href: social.x, icon: Twitter, label: 'X' },
              { href: social.telegram, icon: Send, label: 'Telegram' },
              { href: social.github, icon: Github, label: 'GitHub' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('http') ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} QRDX Foundation</span>
          <span>
            Testnet tokens have no value. Support: <a href={`mailto:${contact.support}`} className="hover:text-foreground">{contact.support}</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
