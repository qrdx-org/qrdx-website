'use client'

import { ArrowLeftRight, BarChart3, Gauge, Layers, LineChart, Rocket, ShieldCheck, TrendingUp, Zap } from 'lucide-react'
import { ButtonLink, Feature, LiveMarkets, Note, PageHero, Section } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

export default function TradePage() {
  return (
    <>
      <PageHero
        eyebrow="QRDX Trade"
        title="Trade on the protocol's own exchange"
        actions={
          <>
            <ButtonLink href={apps.trade}>Open QRDX Trade</ButtonLink>
            <ButtonLink href={docs.spot} variant="outline">
              How trading works
            </ButtonLink>
          </>
        }
      >
        Spot order books, concentrated-liquidity pools and perpetual futures, executed by QRDX validators and signed with your post-quantum key. Live on testnet.
      </PageHero>

      <Section title="Markets, live from testnet" intro="Every price and trade below comes from the chain, read in your browser.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Spot</h3>
            <LiveMarkets kind="spot" limit={8} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Perpetuals</h3>
            <LiveMarkets kind="perp" limit={8} />
          </div>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="What you can do">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={LineChart} title="Limit orders">
              Rest orders on any pair's book with price-time priority. Funds are escrowed by the protocol until the order fills or you cancel.
            </Feature>
            <Feature icon={ArrowLeftRight} title="Best-venue swaps">
              A swap prices every pool and the book and settles with the one that pays the most, against a minimum you set from an exact quote.
            </Feature>
            <Feature icon={TrendingUp} title="Perpetuals">
              BTC, ETH, SOL and more against USD, cross or isolated margin, priced by a validator-voted oracle, with hourly funding.
            </Feature>
            <Feature icon={Layers} title="Liquidity pools">
              Provide liquidity in a price range and earn 70 % of the pool fee while the price is inside it. Fee tiers from 0.01 % to 1 %.
            </Feature>
            <Feature icon={Rocket} title="Launch a token">
              Create a native token and open its market in one step, with a launch curve buyers walk up like a bonding curve.
            </Feature>
            <Feature icon={BarChart3} title="Portfolio and PnL">
              Every balance, order and position in one place, with realized and open PnL charted over time.
            </Feature>
          </div>
        </Section>
      </section>

      <Section title="How it is different">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={ShieldCheck} title="Post-quantum signatures">
            Every order is an exchange transaction signed with ML-DSA-65. A classic key cannot place one.
          </Feature>
          <Feature icon={Zap} title="No contracts, no relayers">
            Books, pools and the perps clearinghouse are protocol state. There is no exchange contract to exploit and no off-chain matching engine.
          </Feature>
          <Feature icon={Gauge} title="All-or-nothing">
            Every operation succeeds whole or changes nothing but its fee. A swap below your minimum simply fails.
          </Feature>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Note title="Testnet">
            Trading is live on testnet, where tokens have no value. Perps collateral on testnet is native QRDX; mainnet will settle in a bridged USD stablecoin.
          </Note>
        </div>
      </Section>
    </>
  )
}
