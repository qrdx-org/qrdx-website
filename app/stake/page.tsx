'use client'

import { useEffect, useState } from 'react'
import { Clock, Coins, Gavel, KeyRound, Server, ShieldCheck } from 'lucide-react'
import { ButtonLink, Feature, Note, PageHero, Section } from '@/components/site/blocks'
import { apps, docs, testnet } from '@/lib/site'

interface Validator {
  address: string
  stake: string
  effective_stake: string
  status: string
  activation_epoch: string
  slashed: boolean | string
}

const PARAMS = [
  ['Signature scheme', 'ML-DSA-65 only'],
  ['Minimum stake', '100,000 QRDX'],
  ['Active validators', 'at most 150'],
  ['Slot', '2 seconds'],
  ['Epoch', '32 slots'],
  ['Finality', 'two-thirds of active stake attests'],
  ['Activation', '4 epochs after the deposit'],
  ['Ejection', 'stake below 50,000 QRDX'],
]

export default function StakePage() {
  const [validators, setValidators] = useState<Validator[] | null>(null)
  useEffect(() => {
    fetch(`${testnet.node}/get_validators`)
      .then((r) => r.json())
      .then((b: { result?: Validator[] }) => setValidators(b.result ?? []))
      .catch(() => setValidators([]))
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Validators"
        title="Secure QRDX with a post-quantum key"
        actions={
          <>
            <ButtonLink href={docs.consensus}>Consensus and validators</ButtonLink>
            <ButtonLink href={`${apps.explorer}/validators`} variant="outline">
              Validator set
            </ButtonLink>
          </>
        }
      >
        QRDX is proof of stake, and every validator signs blocks and attestations with ML-DSA-65. Validators stake their own QRDX; there is no delegation.
      </PageHero>

      <Section title="Testnet validators" intro="Read from the node in your browser.">
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="num w-full text-sm">
            <thead className="border-b text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Validator</th>
                <th className="px-4 py-2.5 text-right font-medium">Stake</th>
                <th className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">Effective stake</th>
                <th className="px-4 py-2.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {validators === null ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    Reading the chain…
                  </td>
                </tr>
              ) : (
                validators.map((v) => (
                  <tr key={v.address} className="border-b last:border-b-0">
                    <td className="px-4 py-2.5">
                      <a href={`${apps.explorer}/address/${v.address}?network=testnet`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-primary hover:underline">
                        {v.address.slice(0, 12)}…{v.address.slice(-8)}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-right">{Number(v.stake).toLocaleString()} QRDX</td>
                    <td className="hidden px-4 py-2.5 text-right text-muted-foreground sm:table-cell">{Number(v.effective_stake).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className={`px-4 py-2.5 text-right ${v.status === 'active' ? 'text-bid' : 'text-warn'}`}>{String(v.slashed) === 'True' || v.slashed === true ? 'slashed' : v.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section title="Becoming a validator">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={Server} title="1. Run a node">
              Run the QRDX node with a post-quantum validator key. Classic keys cannot propose or attest.
            </Feature>
            <Feature icon={Coins} title="2. Stake">
              Send a <span className="font-mono text-foreground">STAKE_DEPOSIT</span> of at least 100,000 QRDX. The stake is debited from your account, so it is at risk.
            </Feature>
            <Feature icon={Clock} title="3. Activate">
              The validator registers as pending and every node activates it a few epochs later. <span className="font-mono text-foreground">STAKE_EXIT</span> refunds the stake at the finalized exit epoch.
            </Feature>
          </div>
        </Section>
      </section>

      <Section title="Parameters">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border bg-card">
            <dl className="divide-y text-sm">
              {PARAMS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-4">
            <Feature icon={Gavel} title="Slashing">
              Double signing and surround votes cost 50 % of stake, invalid attestations 30 %, extended downtime 5 %. A slashed validator never exits, so it forfeits its stake. Reporters and the including proposer receive a share.
            </Feature>
            <Feature icon={ShieldCheck} title="The price oracle">
              Validators also vote external USD prices for the perpetual markets. The oracle is the stake-weighted median of fresh votes, and only counts when a majority of stake has voted.
            </Feature>
            <Feature icon={KeyRound} title="Keys">
              A validator key is an ML-DSA-65 key pair. Keep it on the validator, with slashing protection on.
            </Feature>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Note title="No staking yield product">
            QRDX has no delegation, pooled staking or advertised APY. Staking means running a validator.
          </Note>
        </div>
      </Section>
    </>
  )
}
