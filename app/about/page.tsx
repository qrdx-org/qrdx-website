'use client'

import { Atom, Eye, GitBranch, Layers, Scale, ShieldCheck } from 'lucide-react'
import { ButtonLink, Feature, PageHero, Section } from '@/components/site/blocks'
import { contact, docs, social } from '@/lib/site'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Why QRDX exists"
        actions={
          <>
            <ButtonLink href="/whitepaper">Read the whitepaper</ButtonLink>
            <ButtonLink href={social.github} variant="outline">
              Source on GitHub
            </ButtonLink>
          </>
        }
      >
        Public blockchains are secured by signatures a large quantum computer could forge. Migrating a live chain later is slow and contentious. QRDX starts post-quantum.
      </PageHero>

      <Section title="The problem">
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Bitcoin and Ethereum accounts are protected by elliptic-curve signatures. Shor&apos;s algorithm, run on a large fault-tolerant quantum computer, would derive a private key from its public key, and every account that has
            ever published its public key would be open to theft. No such computer exists today, but keys and ledgers last for decades, and a chain cannot change its signatures overnight.
          </p>
          <p>
            QRDX signs with <span className="text-foreground">ML-DSA-65</span>, the lattice-based signature NIST standardised in FIPS 204. Validators can only use it, and every account has a post-quantum key from its first day.
          </p>
          <p>
            We also built the exchange into the protocol. Order books, pools and perpetuals are state every node computes, rather than contracts and off-chain services glued to a chain, so there are fewer seams to attack.
          </p>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="How we build">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={ShieldCheck} title="Standards, not inventions">
              NIST FIPS 204 signatures, verified against liboqs, and widely reviewed libraries in the wallet. We do not roll our own cryptography.
            </Feature>
            <Feature icon={Scale} title="Conservation first">
              The exchange is tested for invariants: supply always equals the sum of balances, perps are zero-sum, every operation is all-or-nothing, and every node rebuilds the same state.
            </Feature>
            <Feature icon={Eye} title="Say what is real">
              Live means live on testnet; planned means planned. Market data comes from the chain, and outside prices are labelled as reference.
            </Feature>
            <Feature icon={Layers} title="Compatible where it counts">
              Post-quantum accounts map to 20-byte ids, so Ethereum tools, contracts and wallets keep working.
            </Feature>
            <Feature icon={GitBranch} title="Open source">
              The node, wallet, trading site, explorer and docs are public on GitHub.
            </Feature>
            <Feature icon={Atom} title="Testnet before mainnet">
              Mainnet follows security audits. Until then everything runs on testnet, where tokens have no value.
            </Feature>
          </div>
        </Section>
      </section>

      <Section title="Get in touch">
        <div className="mx-auto grid max-w-3xl gap-3 text-sm sm:grid-cols-3">
          <a href={`mailto:${contact.support}`} className="rounded-xl border bg-card p-5 hover:border-primary/50">
            <div className="font-semibold">Support</div>
            <div className="mt-1 text-muted-foreground">{contact.support}</div>
          </a>
          <a href={`mailto:${contact.research}`} className="rounded-xl border bg-card p-5 hover:border-primary/50">
            <div className="font-semibold">Research</div>
            <div className="mt-1 text-muted-foreground">{contact.research}</div>
          </a>
          <a href={docs.reporting} className="rounded-xl border bg-card p-5 hover:border-primary/50">
            <div className="font-semibold">Security</div>
            <div className="mt-1 text-muted-foreground">{contact.security}</div>
          </a>
        </div>
      </Section>
    </>
  )
}
