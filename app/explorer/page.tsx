'use client'

import { Activity, BadgeCheck, Blocks, CandlestickChart, Coins, History } from 'lucide-react'
import { ButtonLink, Feature, LiveTiles, PageHero, Section } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

export default function ExplorerPage() {
  return (
    <>
      <PageHero
        eyebrow="QRDX Explorer"
        title="See everything on chain"
        actions={
          <>
            <ButtonLink href={apps.explorer}>Open the explorer</ButtonLink>
            <ButtonLink href={docs.explorer} variant="outline">
              Explorer guide
            </ButtonLink>
          </>
        }
      >
        Blocks, transactions, accounts, tokens and markets, read live from a QRDX node, with charts and a public profile for your address.
      </PageHero>

      <Section>
        <LiveTiles />
      </Section>

      <section className="border-y bg-card/30">
        <Section title="What it shows">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={Blocks} title="Blocks and transactions">
              Every block, and every transaction with its fills and the accounts it touched, including exchange operations decoded.
            </Feature>
            <Feature icon={Coins} title="Token pages">
              A token address opens a token page: price chart with volume, supply and authorities, every market and pool, recent trades.
            </Feature>
            <Feature icon={History} title="Account pages">
              Balances in USD, 30 days of activity, the full history, open orders, liquidity positions, perps and validator details.
            </Feature>
            <Feature icon={CandlestickChart} title="Markets">
              Every spot pair and perpetual market with its last price, 24-hour change and volume.
            </Feature>
            <Feature icon={BadgeCheck} title="Profiles">
              Link QRDX Wallet and claim your address with a signature: a name, image and links. Token creators can set their token's image.
            </Feature>
            <Feature icon={Activity} title="Live">
              New blocks stream in as they are produced. Switch networks, or point it at your own node, from the header.
            </Feature>
          </div>
        </Section>
      </section>
    </>
  )
}
