'use client'

import { ArrowRightLeft, Coins, Fuel, KeyRound } from 'lucide-react'
import { ButtonLink, Feature, Note, PageHero, Section } from '@/components/site/blocks'
import { docs, social } from '@/lib/site'

export default function FundingPage() {
  return (
    <>
      <PageHero
        eyebrow="Funding"
        title="Getting QRDX"
        actions={
          <>
            <ButtonLink href={docs.quickstart}>Quickstart</ButtonLink>
            <ButtonLink href={social.telegram} variant="outline">
              Ask the community
            </ButtonLink>
          </>
        }
      >
        QRDX is the network's native currency. Every exchange operation pays a small fee in it, and pools and validators stake it.
      </PageHero>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-4">
          <Note title="Testnet">
            Testnet QRDX has no value. There is no public faucet yet: ask in the QRDX community channels for testnet QRDX, and give your <span className="font-mono">0xPQ…</span> address.
          </Note>
          <Note title="Mainnet" tone="warn">
            Mainnet has not launched, so there is no way to buy QRDX yet. Bridges that bring assets in from other chains are planned; see the roadmap.
          </Note>
        </div>
      </Section>

      <section className="border-t bg-card/30">
        <Section title="Where to send it">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Feature icon={KeyRound} title="Your 0xPQ… address">
              Trading, pools, perps and tokens spend from the post-quantum account. Fund it to trade.
            </Feature>
            <Feature icon={Coins} title="Two separate balances">
              The classic 0x… address is a different ledger account. Moving QRDX between them is a transaction.
            </Feature>
            <Feature icon={Fuel} title="Fees">
              An exchange operation costs 20,000–150,000 gas at 1 gwei: 0.00002–0.00015 QRDX, burned.
            </Feature>
            <Feature icon={ArrowRightLeft} title="From MetaMask">
              Send to a post-quantum account's 20-byte account id, which QRDX Wallet shows. It is the same account.
            </Feature>
          </div>
        </Section>
      </section>
    </>
  )
}
