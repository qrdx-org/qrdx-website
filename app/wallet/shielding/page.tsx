'use client'

import { AlertOctagon, ArrowDownUp, Coins, Link2 } from 'lucide-react'
import { ButtonLink, Feature, Note, PageHero, Section } from '@/components/site/blocks'
import { docs } from '@/lib/site'

export default function ShieldingPage() {
  return (
    <>
      <PageHero
        eyebrow="Planned"
        title="Asset shielding"
        actions={
          <>
            <ButtonLink href="/whitepaper#8-asset-shielding-mechanism">Read the design</ButtonLink>
            <ButtonLink href={docs.roadmap} variant="outline">
              Status and roadmap
            </ButtonLink>
          </>
        }
      >
        Bringing assets from classical chains, such as ETH and BTC, onto QRDX where post-quantum keys secure them, and back again.
      </PageHero>

      <Section>
        <div className="mx-auto max-w-3xl">
          <Note title="Not available yet" tone="warn">
            Asset shielding is part of the whitepaper's design and is not live on testnet or mainnet. Nothing on this page can be used today. Be suspicious of anyone offering to shield your assets now.
          </Note>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="The design" intro="From the QRDX whitepaper. Details may change before it ships.">
          <div className="grid gap-4 md:grid-cols-2">
            <Feature icon={Link2} title="Lock on the origin chain">
              An asset is locked on its own chain, and validators that follow that chain attest to the deposit.
            </Feature>
            <Feature icon={Coins} title="Mint a native token">
              The shielded asset is a native QRDX token whose mint authority is the bridge: minted when the deposit is proven, held by a post-quantum account, tradable on the exchange.
            </Feature>
            <Feature icon={ArrowDownUp} title="Redeem">
              Burning the shielded token releases the original asset on its chain.
            </Feature>
            <Feature icon={AlertOctagon} title="The Doomsday protocol">
              A circuit breaker that would stop new classical-to-quantum shielding if a quantum computer demonstrably breaks ECDSA, while still letting holders bring shielded assets back.
            </Feature>
          </div>
        </Section>
      </section>

      <Section title="What you can do today">
        <div className="mx-auto max-w-3xl text-center text-muted-foreground">
          <p>Hold and trade native QRDX tokens with a post-quantum key on testnet: the account and the exchange that shielded assets will use already run.</p>
          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink href="/get-started">Get started</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
