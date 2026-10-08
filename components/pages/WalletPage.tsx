'use client'

import { Fingerprint, Globe, KeyRound, Lock, Puzzle, QrCode, ScanEye, Smartphone } from 'lucide-react'
import { ButtonLink, Feature, Note, PageHero, Section } from '@/components/site/blocks'
import { apps, docs } from '@/lib/site'

const PLATFORMS = [
  { icon: Puzzle, title: 'Browser extension', how: 'Chrome and Firefox', text: 'Sites find it automatically (EIP-6963). Stays unlocked until auto-lock or the browser closes.' },
  { icon: Smartphone, title: 'iPhone app', how: 'Safari → Share → Add to Home Screen', text: 'Face ID or Touch ID on iOS 18 and later. Connects to sites on your computer by QR code.' },
  { icon: Globe, title: 'Web app', how: 'wallet.qrdx.org', text: 'Nothing to install. Locks when you reload; connects to sites by QR code.' },
]

export function WalletPage() {
  return (
    <>
      <PageHero
        eyebrow="QRDX Wallet"
        title="A wallet with a post-quantum key"
        actions={
          <>
            <ButtonLink href={apps.wallet}>Get QRDX Wallet</ButtonLink>
            <ButtonLink href={docs.wallet} variant="outline">
              Wallet guide
            </ButtonLink>
          </>
        }
      >
        Every account holds a classic key and an ML-DSA-65 post-quantum key, and one recovery phrase restores both. Send, swap, trade, provide liquidity and stake, on testnet today.
      </PageHero>

      <Section title="Three ways to run it" intro="One codebase, the same accounts everywhere: a recovery phrase moves between them.">
        <div className="grid gap-4 md:grid-cols-3">
          {PLATFORMS.map((p) => (
            <Feature key={p.title} icon={p.icon} title={p.title}>
              <span className="block text-xs font-medium text-foreground">{p.how}</span>
              <span className="mt-2 block">{p.text}</span>
            </Feature>
          ))}
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="Two addresses, one phrase">
          <div className="grid gap-4 md:grid-cols-2">
            <Feature icon={KeyRound} title="0xPQ… post-quantum address">
              Signed with ML-DSA-65. Trading, pools, perps and token operations use it, and it holds your exchange balances. Keep value you want protected from quantum attacks here.
            </Feature>
            <Feature icon={Lock} title="0x… classic address">
              A familiar Ethereum-style address for EVM transactions and Ethereum tools. It is secured by secp256k1, like any Ethereum account.
            </Feature>
          </div>
        </Section>
      </section>

      <Section title="Built to be hard to fool">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={ScanEye} title="Decoded approvals">
            Every request shows the site's real origin and what you sign, decoded: &ldquo;Buy 0.5 qBTC at 85,000 qUSDC&rdquo;, with warnings for unknown tokens, swaps without a minimum and token approvals.
          </Feature>
          <Feature icon={Fingerprint} title="Strong vault">
            Keys encrypted with AES-256-GCM under a key wrapped by your password (PBKDF2, 600,000 iterations) or a passkey. Wrong passwords slow down exponentially.
          </Feature>
          <Feature icon={QrCode} title="Phone to desktop">
            Trade on a computer and approve on your phone: QRDX Connect links them through an end-to-end encrypted relay.
          </Feature>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <Note title="Back up your recovery phrase">
            It is the only backup, and it restores both keys of every account. Safari deletes website storage after seven days unused; install the iPhone app from Safari to avoid that.
          </Note>
          <Note title="No hardware wallets yet" tone="warn">
            No hardware wallet supports ML-DSA yet. The wallet has not had a third-party audit; one is planned before mainnet.
          </Note>
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href={docs.walletSecurity} variant="outline">
            How the wallet protects keys
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
