import Link from 'next/link'
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
      { label: 'Network', href: '/network' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Get started', href: '/get-started' },
      { label: 'Documentation', href: docs.home },
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'Status and roadmap', href: docs.roadmap },
      { label: 'What\u2019s new', href: '/changelog' },
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
    <footer className="border-t">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">A blockchain secured by post-quantum signatures, with an exchange built into the protocol.</p>
          <p className="mt-5 font-mono text-[11px] text-muted-foreground">ML-DSA-65 · NIST FIPS 204</p>
          <div className="mt-6 flex gap-4 text-sm">
            {[
              { href: social.x, label: 'X' },
              { href: social.telegram, label: 'Telegram' },
              { href: social.github, label: 'GitHub' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{c.title}</h3>
            <ul className="mt-5 space-y-3">
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
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} QRDX Foundation</span>
          <span>
            Testnet tokens have no value. Support:{' '}
            <a href={`mailto:${contact.support}`} className="hover:text-foreground">
              {contact.support}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
