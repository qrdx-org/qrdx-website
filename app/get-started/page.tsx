'use client'

import { ArrowUpRight, Code2, Coins, LineChart, Search, Wallet } from 'lucide-react'
import { ButtonLink, PageHero, Section } from '@/components/site/blocks'
import { apps, docs, social } from '@/lib/site'

const STEPS = [
  {
    icon: Wallet,
    title: 'Install QRDX Wallet',
    text: 'The browser extension for Chrome or Firefox, the web app, or the iPhone app (Safari → Share → Add to Home Screen). Create a wallet and write down the recovery phrase: it restores both of your keys.',
    link: { href: apps.wallet, label: 'wallet.qrdx.org' },
  },
  {
    icon: Coins,
    title: 'Switch to testnet and get QRDX',
    text: 'Choose QRDX Testnet in the wallet. Testnet QRDX has no value; there is no public faucet yet, so ask the community and give your 0xPQ… address.',
    link: { href: social.telegram, label: 'Community' },
  },
  {
    icon: LineChart,
    title: 'Connect and trade',
    text: 'Open QRDX Trade and connect: the extension directly, or your phone by QR code. Place a limit order or a swap; the wallet shows exactly what you sign.',
    link: { href: apps.trade, label: 'trade.qrdx.org' },
  },
  {
    icon: Search,
    title: 'Find it on the explorer',
    text: 'Search your 0xPQ… address to see every order, fill and fee, and claim a public profile for it.',
    link: { href: apps.explorer, label: 'explorer.qrdx.org' },
  },
]

export default function GetStartedPage() {
  return (
    <>
      <PageHero eyebrow="Get started" title="On QRDX in five minutes" actions={<ButtonLink href={docs.quickstart}>Full quickstart</ButtonLink>}>
        Everything below runs on testnet, where tokens have no value.
      </PageHero>

      <Section>
        <ol className="max-w-4xl border-b">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-x-8 gap-y-3 border-t border-foreground/15 py-8 sm:grid-cols-[5rem_1fr]">
              <span className="num font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="flex items-center gap-2 text-xl font-medium tracking-tight">
                  <s.icon className="h-4 w-4 text-muted-foreground" /> {s.title}
                </h2>
                <p className="mt-2.5 max-w-2xl leading-relaxed text-muted-foreground">{s.text}</p>
                <a href={s.link.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
                  {s.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section className="border-t bg-card/30">
        <Section title="Building something?" intro="Read the chain, sign transactions and integrate the wallet. The docs' examples run live against testnet, in the page.">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={docs.build}>
              <Code2 className="h-4 w-4" /> Build on QRDX
            </ButtonLink>
            <ButtonLink href={docs.walletIntegration} variant="outline">
              Wallet integration
            </ButtonLink>
          </div>
        </Section>
      </section>
    </>
  )
}
