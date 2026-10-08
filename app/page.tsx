'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftRight, ArrowUpRight, Atom, Boxes, CircleDot, Code2, Coins, KeyRound, Layers, LineChart, Search, ShieldCheck, TrendingUp, Wallet } from 'lucide-react'
import { ButtonLink, Feature, LiveMarkets, LiveTiles, Section, fadeUp } from '@/components/site/blocks'
import { useTestnet } from '@/lib/live'
import { apps, docs } from '@/lib/site'

const PRODUCTS = [
  { href: apps.trade, icon: LineChart, title: 'QRDX Trade', text: 'Limit orders, swaps routed to the best venue, liquidity pools and perpetuals, plus a public API.', cta: 'Open Trade' },
  { href: apps.wallet, icon: Wallet, title: 'QRDX Wallet', text: 'Browser extension, web app and iPhone app. One recovery phrase restores your classic and post-quantum keys.', cta: 'Get the wallet' },
  { href: apps.explorer, icon: Search, title: 'QRDX Explorer', text: 'Blocks, transactions, tokens and markets, with charts, and a public profile for your address.', cta: 'Explore' },
  { href: docs.home, icon: Code2, title: 'Docs', text: 'Guides for every app, and developer references whose examples run live against testnet.', cta: 'Read the docs' },
]

const ROADMAP = [
  { state: 'Live on testnet', tone: 'text-bid', items: ['Post-quantum proof of stake', 'Spot books and concentrated-liquidity pools', 'Perpetuals with a validator oracle', 'Native tokens and NFTs', 'Wallet, Trade, Explorer'] },
  { state: 'Next', tone: 'text-warn', items: ['Security audits', 'Mainnet launch', 'Bridged USD stablecoin for perps'] },
  { state: 'Planned', tone: 'text-muted-foreground', items: ['Bridges and asset shielding', 'The Doomsday circuit breaker', 'Governance', 'Post-quantum multisig'] },
]

export default function Home() {
  const stats = useTestnet()
  return (
    <>
      <section className="hero-glow relative overflow-hidden border-b">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:pt-40">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <a href={docs.networks} target="_blank" rel="noopener noreferrer" className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-bid text-bid" /> Testnet is live <ArrowUpRight className="h-3 w-3" />
            </a>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">The blockchain built for the quantum era</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Accounts and validators secured by NIST-standard post-quantum signatures, with order books, liquidity pools and perpetuals built into the protocol itself.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={apps.trade}>Launch app</ButtonLink>
              <ButtonLink href="/get-started" variant="outline">
                Get started
              </ButtonLink>
              <ButtonLink href="/whitepaper" variant="outline">
                Whitepaper
              </ButtonLink>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-16">
            <LiveTiles stats={stats} />
          </motion.div>
        </div>
      </section>

      <Section
        title="Post-quantum from the ground up"
        intro="A quantum computer running Shor's algorithm could forge the elliptic-curve signatures that secure Bitcoin and Ethereum. QRDX signs with ML-DSA-65 (FIPS 204), which no known quantum algorithm breaks."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={ShieldCheck} title="Validators sign post-quantum">
            Every block and attestation is signed with ML-DSA-65. Classic keys cannot validate. Proof of stake with 2-second slots and epoch finality.
          </Feature>
          <Feature icon={KeyRound} title="Post-quantum accounts">
            Every account has a <span className="font-mono text-foreground">0xPQ…</span> address signed with ML-DSA-65. One recovery phrase restores it alongside the classic key.
          </Feature>
          <Feature icon={Layers} title="Still speaks Ethereum">
            Post-quantum accounts map to ordinary 20-byte account ids, so contracts, MetaMask and Ethereum tools keep working, and native tokens are ERC-20s in the EVM.
          </Feature>
        </div>
        <motion.div {...fadeUp} className="mt-8 text-center">
          <a href={docs.security} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            What post-quantum protects, and what it does not <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </Section>

      <section className="border-y bg-card/30">
        <Section
          title="An exchange in the protocol"
          intro="Trading is part of the chain's state transition, not a contract on top of it. Validators execute every order, swap and liquidation, and every node agrees on the result."
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-4">
              <Feature icon={ArrowLeftRight} title="Spot: books and pools together">
                Every pair has an order book and concentrated-liquidity pools. A swap settles on whichever venue pays the most. Native QRDX trades directly, with no wrapping.
              </Feature>
              <Feature icon={TrendingUp} title="Perpetuals, zero-sum">
                Matched on an on-chain book, margined at a mark price, priced by a validator-voted oracle, with funding, liquidations and a backstop vault. Profits are paid by losses; nothing is minted.
              </Feature>
              <Feature icon={Coins} title="Tokens without contracts">
                A token is a registry entry and balances in consensus. Create one and open its market in the same block. Extensions, NFTs and ERC-20/721 views included.
              </Feature>
            </div>
            <motion.div {...fadeUp}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Testnet markets, live</h3>
                <a href={apps.trade} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  All markets <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <LiveMarkets stats={stats} limit={9} />
              <p className="mt-3 text-xs text-muted-foreground">Prices and trades come from the chain. Testnet tokens have no value.</p>
            </motion.div>
          </div>
        </Section>
      </section>

      <Section title="Use it today" intro="Everything below runs on testnet now.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <motion.a {...fadeUp} key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary/50">
              <p.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {p.cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </Section>

      <section className="border-t bg-card/30">
        <Section title="Where QRDX is" intro="Testnet runs the core protocol today. Mainnet follows the audits; bridges and asset shielding come after.">
          <div className="grid gap-4 md:grid-cols-3">
            {ROADMAP.map((r) => (
              <motion.div {...fadeUp} key={r.state} className="rounded-xl border bg-card p-6">
                <h3 className={`flex items-center gap-2 text-sm font-semibold ${r.tone}`}>
                  <CircleDot className="h-4 w-4" /> {r.state}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {r.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={docs.roadmap} variant="outline">
              Status and roadmap
            </ButtonLink>
            <ButtonLink href="/wallet/shielding" variant="outline">
              About asset shielding
            </ButtonLink>
          </div>
        </Section>
      </section>

      <section className="hero-glow border-t">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <Atom className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Try it in five minutes</h2>
          <p className="mt-3 text-muted-foreground">Install the wallet, switch to testnet and place an order. Or read the chain from code, right in the docs.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/get-started">Get started</ButtonLink>
            <ButtonLink href={docs.build} variant="outline">
              Build on QRDX
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            <Link href="/stake" className="hover:text-foreground">
              Run a validator
            </Link>
            {' · '}
            <a href={apps.explorer} className="hover:text-foreground">
              See the chain
            </a>
            {' · '}
            <a href={docs.tokens} className="hover:text-foreground">
              <Boxes className="mb-0.5 mr-1 inline h-3 w-3" />
              Native tokens
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
