'use client'

import { ArrowUpRight, BookMarked, Code2, Compass, Lightbulb, Rocket, Shield } from 'lucide-react'
import { ButtonLink, PageHero, Section } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

const SECTIONS = [
  { icon: Rocket, title: 'Get started', text: 'Quickstart, networks and endpoints, glossary.', href: docs.quickstart },
  { icon: Compass, title: 'Use QRDX', text: 'The wallet, trading, liquidity, perps, launching a token, the explorer.', href: docs.wallet },
  { icon: Lightbulb, title: 'Concepts', text: 'Post-quantum keys, accounts, native tokens, the exchange, perps, consensus.', href: docs.postQuantum },
  { icon: Code2, title: 'Build', text: 'JSON-RPC, REST, streams, signing, wallet integration, the trade API.', href: docs.build },
  { icon: BookMarked, title: 'Reference', text: 'Every method, endpoint, operation and error.', href: `${apps.docs}/docs/reference/json-rpc` },
  { icon: Shield, title: 'Security', text: 'Post-quantum cryptography, wallet security, reporting.', href: docs.security },
]

export default function DocsPage() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="docs.qrdx.org" actions={<ButtonLink href={docs.home}>Open the docs</ButtonLink>}>
        Guides, concepts and references, with examples that run live against testnet in the page.
      </PageHero>
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {SECTIONS.map((s) => (
            <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/50">
              <s.icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 flex items-center gap-1 font-semibold">
                {s.title} <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
