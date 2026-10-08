'use client'

import { useEffect, useState } from 'react'
import { Coins, Droplets, Lock, Percent, Ruler, Shuffle } from 'lucide-react'
import { ButtonLink, Feature, Note, PageHero, Section } from '@/components/site/blocks'
import { apps, docs, testnet } from '@/lib/site'

interface Pool {
  pool_id: string
  token0: string
  token1: string
  fee_tier: number
  positions: number
  price: string
  paused: boolean
}

export default function PoolsPage() {
  const [pools, setPools] = useState<Pool[] | null>(null)
  const [symbols, setSymbols] = useState<Record<string, string>>({})
  useEffect(() => {
    const rpc = (method: string) =>
      fetch(testnet.rpc, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params: [] }) }).then((r) => r.json())
    rpc('exchange_getPools').then((b) => setPools(b.result ?? [])).catch(() => setPools([]))
    rpc('exchange_getTokens')
      .then((b: { result?: { token_address: string; symbol: string }[] }) => setSymbols(Object.fromEntries((b.result ?? []).map((t) => [t.token_address.toLowerCase(), t.symbol]))))
      .catch(() => undefined)
  }, [])
  const sym = (a: string) => (a.toUpperCase() === 'QRDX' ? 'QRDX' : symbols[a.toLowerCase()] ?? `${a.slice(0, 8)}…`)

  return (
    <>
      <PageHero
        eyebrow="Liquidity"
        title="Concentrated liquidity, in the protocol"
        actions={
          <>
            <ButtonLink href={`${apps.trade}/pools`}>Provide liquidity</ButtonLink>
            <ButtonLink href={docs.liquidity} variant="outline">
              Liquidity guide
            </ButtonLink>
          </>
        }
      >
        Choose a price range and earn fees while the price is inside it. Pools for any pair of native tokens, including native QRDX, with the mathematics of Uniswap v3.
      </PageHero>

      <Section title="Testnet pools" intro="Read from the chain in your browser.">
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="num w-full text-sm">
            <thead className="border-b text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Pool</th>
                <th className="px-4 py-2.5 text-right font-medium">Fee</th>
                <th className="px-4 py-2.5 text-right font-medium">Price (token1 per token0)</th>
                <th className="px-4 py-2.5 text-right font-medium">Positions</th>
              </tr>
            </thead>
            <tbody>
              {pools === null ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    Reading the chain…
                  </td>
                </tr>
              ) : (
                pools.map((p) => (
                  <tr key={p.pool_id} className="border-b last:border-b-0">
                    <td className="px-4 py-2.5 font-medium">
                      {sym(p.token0)} / {sym(p.token1)}
                      {p.paused && <span className="ml-2 text-xs text-warn">paused</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right">{(p.fee_tier / 10_000).toString()} %</td>
                    <td className="px-4 py-2.5 text-right">{Number(p.price).toPrecision(6)}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{p.positions}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="How pools work">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={Ruler} title="Your range">
              Liquidity trades only between the prices you choose. A narrower range earns more of the fees per unit of capital, and stops earning sooner when the price leaves it.
            </Feature>
            <Feature icon={Percent} title="Fees">
              Four tiers: 0.01 %, 0.05 %, 0.3 % and 1 %. 70 % of every swap's fee goes to in-range liquidity providers, 30 % to the protocol.
            </Feature>
            <Feature icon={Shuffle} title="Books and pools together">
              Swaps compare every pool with the pair's order book and fill on the better venue, so pool liquidity and resting orders compete for every trade.
            </Feature>
            <Feature icon={Coins} title="Exact deposits">
              The node quotes the most liquidity your amounts buy and the exact deposit it takes before you sign.
            </Feature>
            <Feature icon={Lock} title="Creating a pool">
              Stake 10,000 QRDX, refunded when the pool is removed, or burn 5,000 QRDX for a permanent pool. Creating a pool also opens the pair's order book.
            </Feature>
            <Feature icon={Droplets} title="Impermanent loss">
              As the price moves, a position shifts toward the token that fell. Fees offset this; they do not always cover it.
            </Feature>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <Note title="Testnet">Pools are live on testnet, where tokens have no value.</Note>
          </div>
        </Section>
      </section>
    </>
  )
}
