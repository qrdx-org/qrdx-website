'use client'

import { ArrowLeftRight, AtSign, Code2, Coins, KeyRound, Landmark, Layers, Link2, QrCode, Search, ShieldCheck, Siren, TrendingUp, Wallet } from 'lucide-react'
import { ButtonLink, Feature, PageHero, Section } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

const LIVE = [
  { icon: ArrowLeftRight, title: 'Spot trading', text: 'Order books and best-venue swaps for any pair of native tokens and native QRDX.', href: docs.spot },
  { icon: Layers, title: 'Liquidity pools', text: 'Concentrated liquidity with four fee tiers; 70 % of fees to in-range providers.', href: docs.liquidity },
  { icon: TrendingUp, title: 'Perpetuals', text: 'USD-quoted perps with cross and isolated margin, a validator oracle and a backstop vault.', href: docs.perps },
  { icon: Coins, title: 'Native tokens', text: 'Create a token and its market in one step; extensions and NFTs included.', href: docs.launch },
  { icon: Wallet, title: 'QRDX Wallet', text: 'Extension, web and iPhone, with a post-quantum key on every account.', href: apps.wallet },
  { icon: Search, title: 'QRDX Explorer', text: 'The chain, its tokens and markets, and signed public profiles.', href: apps.explorer },
  { icon: ShieldCheck, title: 'Validation', text: 'Post-quantum proof of stake: run a validator with your own stake.', href: '/stake' },
  { icon: Code2, title: 'Developer APIs', text: 'JSON-RPC, REST and streams on every node, plus the trade API.', href: docs.build },
  { icon: QrCode, title: 'QRDX Connect', text: 'Link any site to the wallet on a phone through an encrypted relay.', href: `${docs.build}/qrdx-connect` },
  { icon: Landmark, title: 'Governance', text: 'Validators vote by stake; holders can veto a passed proposal during its timelock.', href: docs.governance },
  { icon: KeyRound, title: 'Account control', text: 'Controllers, m-of-n multisigs, a delay on changes and recovery guardians.', href: docs.accountControl },
  { icon: AtSign, title: 'QRDX names', text: 'name.qrdx for any account: send to a name, and show one as yours.', href: docs.names },
  { icon: Link2, title: 'Bridge', text: 'Deposits proven against attested heads of other chains, with guardrails.', href: docs.bridge },
  { icon: Siren, title: 'Quantum migration', text: 'Bind a post-quantum successor to a classic key before ECDSA breaks; the Doomsday Protocol switches ECDSA off.', href: docs.quantumMigration },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="What runs on QRDX"
        actions={
          <>
            <ButtonLink href={apps.trade}>Launch app</ButtonLink>
            <ButtonLink href={docs.roadmap} variant="outline">
              What is planned
            </ButtonLink>
          </>
        }
      >
        Everything here is live on testnet; mainnet follows security audits. Asset shielding beyond the bridge is planned and listed on the roadmap.
      </PageHero>
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {LIVE.map((s) => (
            <a key={s.title} href={s.href} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block">
              <Feature icon={s.icon} title={s.title}>
                {s.text}
              </Feature>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
