'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowLeftRight, Coins, KeyRound, Layers, ShieldCheck, TrendingUp } from 'lucide-react'
import { Lattice } from '@/components/gfx/Lattice'
import { ButtonLink, Eyebrow, Feature, LiveMarkets, LiveTiles, Section, WRAP } from '@/components/site/blocks'
import { BlockTape, Endpoints, SizeTable, ValidatorKey } from '@/components/site/home'
import { RiseText, spotlight } from '@/components/site/motion'
import { useTestnet } from '@/lib/live'
import { apps, docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const PRODUCTS = [
  { href: apps.trade, name: 'Trade', host: 'trade.qrdx.org', text: 'Order books, swaps routed to the better venue, pools and perpetuals. Sub-accounts, and a portfolio with PnL.' },
  { href: apps.wallet, name: 'Wallet', host: 'wallet.qrdx.org', text: 'A browser extension, a web app and an iPhone app. One recovery phrase restores both of an account’s keys.' },
  { href: apps.explorer, name: 'Explorer', host: 'explorer.qrdx.org', text: 'Blocks, transactions, tokens and markets, every protocol account, and profiles for addresses.' },
  { href: docs.home, name: 'Docs', host: 'docs.qrdx.org', text: 'A guide for every app, and references whose examples run against testnet in the page.' },
]

const STATUS = [
  {
    state: 'Live on testnet',
    rule: 'bg-bid',
    items: [
      'Post-quantum proof of stake, with delegation',
      'Order books, pools and perpetuals',
      'Sub-accounts, vaults and one-click trading',
      'Governance with a holders’ veto',
      'Multisig, account control and recovery',
      'The consensus bridge and the Doomsday Protocol',
    ],
  },
  { state: 'Next', rule: 'bg-warn', items: ['Security audits', 'Mainnet launch', 'A bridged USD stablecoin as perps collateral', 'Quantum migration in the wallet'] },
  { state: 'Planned', rule: 'bg-muted-foreground/50', items: ['Asset shielding beyond the bridge', 'Wider chain adapters'] },
]

export default function Home() {
  const stats = useTestnet()
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Lattice className="absolute inset-0 -z-10" />
        <div className={cn(WRAP, 'flex min-h-[min(94svh,940px)] flex-col pb-10 pt-32 sm:pt-40')}>
          <div className="max-w-[68rem]">
            <Eyebrow className="rise-in mb-8 flex items-center gap-3">
              <span className={cn('h-1.5 w-1.5 rounded-full', stats.live ? 'pulse-dot bg-signal text-signal' : 'bg-muted-foreground')} />
              Testnet live · post-quantum proof of stake
            </Eyebrow>
            <h1 className="text-[3.1rem] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[5.25rem] xl:text-[6.25rem]">
              <RiseText parts={[{ text: 'Every block is signed' }, { text: 'post-quantum.', serif: true, nowrap: true }]} />
            </h1>
            <p className="rise-in mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground" style={{ '--d': '520ms' } as React.CSSProperties}>
              QRDX validators and accounts sign with ML-DSA-65, the lattice signature NIST standardized in FIPS 204. Its order books, pools and perpetuals are part of the
              protocol, not contracts on top of it.
            </p>
            <div className="rise-in mt-10 flex flex-wrap items-center gap-3" style={{ '--d': '640ms' } as React.CSSProperties}>
              <ButtonLink href={apps.trade}>Open Trade</ButtonLink>
              <ButtonLink href="/get-started" variant="outline">
                Get started
              </ButtonLink>
              <Link href="/whitepaper" className="text-sm text-muted-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground sm:ml-2">
                Read the whitepaper
              </Link>
            </div>
          </div>
          <div className="mt-auto grid items-end gap-10 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
            <p className="rise-in max-w-sm font-mono text-[11px] leading-relaxed text-muted-foreground" style={{ '--d': '900ms' } as React.CSSProperties}>
              <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-signal align-middle" />
              Beside this text: a module lattice, the structure ML-DSA rests on, made of liquid. Each node that swells and glows is a testnet block as it arrives, chosen by its
              hash; a band of colour runs through it when an epoch is finalized.
            </p>
            <BlockTape stats={stats} rows={6} className="rise-in hidden lg:block" />
          </div>
        </div>
      </section>
      <div className={WRAP}>
        <LiveTiles stats={stats} />
      </div>

      <Section
        index="01"
        label="Keys"
        title={
          <>
            What a <span className="whitespace-nowrap">post-quantum</span> key looks like
          </>
        }
        intro="A quantum computer running Shor's algorithm could derive the private key behind any elliptic-curve public key, and every account that has signed has published one. ML-DSA-65 has no such shortcut. It costs bytes."
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SizeTable />
          <div className="flex flex-col gap-8">
            <Feature icon={ShieldCheck} title="Validators">
              Blocks and attestations are signed with ML-DSA-65. A classic key cannot propose or attest.
            </Feature>
            <Feature icon={KeyRound} title="Accounts">
              Each wallet account has a <span className="font-mono text-[13px] text-foreground">0xPQ…</span> address beside its classic one, both restored from one recovery phrase. Contracts see
              it as an ordinary 20-byte account id, so Ethereum tools keep working.
            </Feature>
            <a href={docs.security} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 self-start text-sm underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
              What post-quantum protects, and what it does not <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <div className="mt-16">
          <ValidatorKey stats={stats} />
        </div>
      </Section>

      <div className="border-y bg-canvas/60 dark:bg-card/30">
        <Section
          index="02"
          label="Exchange"
          title="The exchange is part of the chain"
          intro="Validators execute every order, swap and liquidation as part of the state transition, and every node agrees on the result. There is no exchange contract and no off-chain matching engine."
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="grid content-start gap-y-6">
              <Feature icon={ArrowLeftRight} title="Books and pools, one swap">
                Every pair has an order book and concentrated-liquidity pools. A swap prices both and settles where it pays more. QRDX trades directly, unwrapped.
              </Feature>
              <Feature icon={TrendingUp} title="Perpetuals that only move value">
                An on-chain book, margin at a mark price, a validator-voted oracle, funding and a backstop vault. Profits are paid by losses; nothing is minted.
              </Feature>
              <Feature icon={Coins} title="Tokens without contracts">
                A token is a registry entry and balances in consensus. Create one and open its market in the same block; the EVM sees an ERC-20.
              </Feature>
              <Feature icon={Layers} title="Accounts for trading">
                Up to 20 sub-accounts per wallet, copy-trading vaults, and trading keys that can trade but never withdraw.
              </Feature>
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-4 flex items-baseline justify-between">
                <Eyebrow>Testnet markets</Eyebrow>
                <a href={apps.trade} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  All markets <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <LiveMarkets stats={stats} limit={7} />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Prices are the chain&apos;s own trades and pools, read in your browser. Testnet tokens have no value.</p>
            </div>
          </div>
        </Section>
      </div>

      <Section index="03" label="Apps" title="Use it today" intro="Each of these runs against testnet now, from the same keys.">
        <ul className="border-t border-foreground/15">
          {PRODUCTS.map((p, i) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={spotlight}
                className="spot group grid items-baseline gap-x-8 gap-y-2 border-b py-6 sm:grid-cols-[2.5rem_10rem_1fr_auto] sm:py-8"
              >
                <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">0{i + 1}</span>
                <span className="text-2xl font-medium tracking-[-0.03em] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:text-signal sm:text-[2rem]">{p.name}</span>
                <span className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{p.text}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {p.host}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-t">
        <Section index="04" label="Status" title="Where QRDX is" intro="Testnet runs the protocol today. Mainnet follows the audits.">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STATUS.map((s) => (
              <div key={s.state}>
                <span className={cn('rule-draw block h-0.5 w-full', s.rule)} />
                <h3 className="mt-5 font-medium">{s.state}</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] text-muted-foreground">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a href={docs.roadmap} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-1.5 text-sm underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
            Status and roadmap, in full <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Section>
      </div>

      <section className="relative isolate overflow-hidden border-t">
        <Lattice intensity={0.45} className="absolute inset-0 -z-10" />
        <div className={cn(WRAP, 'grid gap-12 py-20 sm:py-32 lg:grid-cols-2 lg:gap-16')}>
          <div className="reveal">
            <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-[3.6rem]">
              Testnet is open. Point <span className="serif">anything</span> at it.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Install the wallet and place an order in a few minutes, or call the node from code. It speaks Ethereum JSON-RPC as well as its own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/get-started">Get started</ButtonLink>
              <ButtonLink href={docs.build} variant="outline">
                Build on QRDX
              </ButtonLink>
            </div>
          </div>
          <div className="reveal rounded-xl border border-foreground/10 bg-background/60 p-5 backdrop-blur-xl lg:mt-2">
            <Endpoints stats={stats} />
            <p className="mt-4 text-xs text-muted-foreground">
              Or{' '}
              <Link href="/stake" className="underline decoration-foreground/20 underline-offset-2 hover:text-foreground">
                run a validator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
