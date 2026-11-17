'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ButtonLink, Eyebrow, Note, PageHero, Section, StatGrid, num } from '@/components/site/blocks'
import { BlockTape } from '@/components/site/home'
import { useTestnet } from '@/lib/live'
import { span, useNetwork, type Validator } from '@/lib/network'
import { apps, docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const qrdx = (v: string | number | null | undefined, digits = 0) => {
  const x = v === null || v === undefined ? NaN : Number(v)
  return Number.isFinite(x) ? x.toLocaleString('en-US', { maximumFractionDigits: digits }) : '—'
}
const pct = (bps: number | null | undefined) => (bps === null || bps === undefined ? '—' : `${+(bps / 100).toFixed(2)} %`)
const short = (a: string) => `${a.slice(0, 8)}…${a.slice(-6)}`

const HEAD = 'font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground'

/** Ruled label and value rows. */
function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="border-t border-foreground/15">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b py-3 text-sm">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="num text-right">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function ValidatorRows({ validators, totalWeight }: { validators: Validator[] | null; totalWeight: number }) {
  const cols = 'grid grid-cols-[minmax(0,1fr)_5rem_4.5rem] gap-4 sm:grid-cols-[minmax(0,1fr)_7rem_7rem_6rem_6rem_5rem] lg:grid-cols-[minmax(0,1fr)_7rem_8rem_8rem_6rem_6rem_6rem]'
  return (
    <div className="border-t border-foreground/15">
      <div className={cn(cols, 'border-b py-2.5', HEAD)}>
        <span>Validator</span>
        <span className="hidden text-right lg:block">Own stake</span>
        <span className="hidden text-right sm:block">Delegated</span>
        <span className="text-right">Weight</span>
        <span className="hidden text-right sm:block">Delegators</span>
        <span className="text-right">Commission</span>
        <span className="hidden text-right sm:block">Status</span>
      </div>
      {validators === null ? (
        <p className="py-8 text-sm text-muted-foreground">Reading the chain…</p>
      ) : validators.length === 0 ? (
        <p className="py-8 text-sm text-muted-foreground">No validators.</p>
      ) : (
        validators.map((v) => {
          const share = totalWeight > 0 ? (Number(v.weight) / totalWeight) * 100 : null
          return (
            <a
              key={v.address}
              href={`${apps.explorer}/address/${v.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(cols, 'group items-center border-b py-3.5 text-sm transition-colors hover:bg-accent/50')}
            >
              <span className="flex min-w-0 items-center gap-1.5 font-mono text-[13px]">
                <span className="truncate">{short(v.address)}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="num hidden text-right lg:block">{qrdx(v.stake)}</span>
              <span className="num hidden text-right sm:block">{qrdx(v.delegated)}</span>
              <span className="num text-right">{share === null ? '—' : `${share.toFixed(share >= 10 ? 1 : 2)} %`}</span>
              <span className="num hidden text-right sm:block">{num(v.delegators)}</span>
              <span className="num text-right">{pct(v.commissionBps)}</span>
              <span className={cn('hidden text-right sm:block', v.slashed ? 'text-ask' : v.status === 'active' ? 'text-bid' : 'text-muted-foreground')}>{v.slashed ? 'slashed' : v.status}</span>
            </a>
          )
        })
      )}
    </div>
  )
}

export default function NetworkPage() {
  const chain = useTestnet()
  const net = useNetwork()
  const slot = net.spec ? net.spec.slotMs / 1000 : null
  const epoch = net.spec && slot ? net.spec.slotsPerEpoch * slot : null
  const totalWeight = (net.validators ?? []).reduce((t, v) => t + Number(v.weight), 0)
  const delegators = net.validators ? net.validators.reduce((t, v) => t + (v.delegators ?? 0), 0) : null
  const epochs = (n: number | undefined) => (n === undefined ? '—' : `${n.toLocaleString('en-US')} epochs${epoch ? ` (${span(n * epoch)})` : ''}`)
  const blocks = (n: number | undefined) => (n === undefined ? '—' : `${n.toLocaleString('en-US')} blocks${slot ? ` (${span(n * slot)})` : ''}`)
  const g = net.gov?.params

  return (
    <>
      <PageHero
        eyebrow="Network · testnet"
        title="The network, as it runs"
        actions={
          <>
            <ButtonLink href={`${apps.trade}/stake`}>Delegate QRDX</ButtonLink>
            <ButtonLink href={`${apps.explorer}/validators`} variant="outline">
              Validators in the explorer
            </ButtonLink>
          </>
        }
      >
        Who validates QRDX testnet, the stake behind each validator, what governance is deciding and the blocks arriving now. All of it is read from the chain, in your browser.
      </PageHero>

      <div className="mx-auto w-full max-w-[1200px] px-5 pt-12 sm:px-8 sm:pt-16">
        <StatGrid
          tiles={[
            { label: 'Block height', value: num(chain.height) },
            { label: 'Finalized epoch', value: num(chain.finalizedEpoch) },
            { label: 'Validators', value: num(net.validators?.length ?? null) },
            { label: 'Staked, QRDX', value: net.validators ? qrdx(totalWeight) : '—' },
            { label: 'Delegators', value: num(delegators) },
            { label: 'Node version', value: net.spec?.nodeVersion ?? '—' },
          ]}
        />
      </div>

      <Section
        title="Validators"
        intro="Each validator signs blocks and votes with an ML-DSA-65 key. Its weight is its own stake plus what is delegated to its pool; its votes count by weight, in consensus and in governance."
      >
        <ValidatorRows validators={net.validators} totalWeight={totalWeight} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow className="mb-4">Staking, from the chain</Eyebrow>
            <Facts
              rows={[
                ['Minimum to run a validator', net.staking ? `${qrdx(net.staking.minValidatorStake)} QRDX` : '—'],
                ['Minimum delegation', net.staking ? `${net.staking.minDelegation} QRDX` : '—'],
                ['Staking rate', net.staking ? `${pct(net.staking.rewardRateBps)} a year` : '—'],
                ['Default commission', pct(net.staking?.defaultCommissionBps)],
                ['Warm-up', epochs(net.staking?.warmupEpochs)],
                ['Unbonding', epochs(net.staking?.unbondingEpochs)],
                ['Withdrawal delay', epochs(net.staking?.withdrawalDelayEpochs)],
                ['Epoch', net.spec && slot ? `${net.spec.slotsPerEpoch} slots × ${net.spec.slotMs} ms` : '—'],
              ]}
            />
          </div>
          <div className="space-y-6">
            <Eyebrow>Delegating</Eyebrow>
            <p className="leading-relaxed text-muted-foreground">
              Delegated QRDX buys shares of a validator&apos;s pool. Rewards raise the share price, less the validator&apos;s commission, and delegated stake is slashed with the pool. Withdrawing waits out unbonding. Delegate from QRDX Trade&apos;s Stake page or the wallet.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={docs.staking} variant="outline">
                Staking guide
              </ButtonLink>
              <ButtonLink href="/stake" variant="outline">
                Run a validator
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <section className="border-y bg-card/30">
        <Section
          title="Governance"
          intro="Validators propose and vote, weighted by stake. A passed proposal waits out a timelock in which QRDX holders can veto it by locking QRDX; then anyone can execute it."
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="mb-4">Proposals</Eyebrow>
              <div className="border-t border-foreground/15">
                {net.proposals === null ? (
                  <p className="py-6 text-sm text-muted-foreground">Reading the chain…</p>
                ) : net.proposals.length === 0 ? (
                  <p className="border-b py-6 text-sm text-muted-foreground">No proposals on testnet since the regenesis.</p>
                ) : (
                  net.proposals.map((p) => {
                    const yes = Number(p.totalWeight) > 0 ? (Number(p.yes) / Number(p.totalWeight)) * 100 : 0
                    return (
                      <a
                        key={p.id}
                        href={`${apps.explorer}/governance`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b py-3.5 text-sm transition-colors hover:bg-accent/50"
                      >
                        <span className="num font-mono text-muted-foreground">#{p.id}</span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{p.action.replace(/_/g, ' ')}</span>
                          {p.memo && <span className="block truncate text-xs text-muted-foreground">{p.memo}</span>}
                        </span>
                        <span className="text-right">
                          <span className="block font-mono text-[11px] uppercase tracking-[0.1em]">{p.status}</span>
                          <span className="num block text-xs text-muted-foreground">{yes.toFixed(1)} % yes</span>
                        </span>
                      </a>
                    )
                  })
                )}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Open now: <span className="num text-foreground">{num(net.gov?.open ?? null)}</span>.{' '}
                {net.gov && !net.gov.masterAuthority && <>The genesis controller&apos;s authority over the system wallets has ended; their funds move only by proposal.</>}
              </p>
            </div>
            <div>
              <Eyebrow className="mb-4">Rules, from the chain</Eyebrow>
              <Facts
                rows={[
                  ['Voting period', blocks(g?.votingBlocks)],
                  ['To pass', g ? `${pct(g.approvalBps)} of stake` : '—'],
                  ['Veto window (timelock)', blocks(g?.timelockBlocks)],
                  ['Veto threshold', g ? `${qrdx(g.vetoQrdx)} QRDX locked` : '—'],
                  ['Execution window', blocks(g?.executionBlocks)],
                ]}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={docs.governance} variant="outline">
                  Governance guide
                </ButtonLink>
                <ButtonLink href={`${apps.explorer}/governance`} variant="outline">
                  In the explorer
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Section
        title="Quantum readiness"
        intro="Validators and QRDX accounts sign with ML-DSA-65. Classic 0x accounts still sign with ECDSA, so the chain watches for the day ECDSA breaks and switches it off when it does."
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Facts
            rows={[
              ['Validator signatures', 'ML-DSA-65 (FIPS 204)'],
              [
                'Doomsday Protocol',
                net.doomsday === null ? '—' : net.doomsday.triggered ? <span className="text-ask">triggered at #{net.doomsday.triggered.height.toLocaleString('en-US')}</span> : 'not triggered',
              ],
              ['Canaries watched', net.doomsday === null ? '—' : Object.keys(net.doomsday.canaries).length || 'none on testnet'],
            ]}
          />
          <div className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              A canary is an Ethereum account whose key nobody knows, funded with a bounty. If its key ever signs, ECDSA is broken, anyone can prove it on QRDX, and from that block every ECDSA key on QRDX stops signing. Accounts that bound a post-quantum successor beforehand keep working through it.
            </p>
            <ButtonLink href={docs.quantumMigration} variant="outline">
              Quantum migration
            </ButtonLink>
          </div>
        </div>
      </Section>

      <section className="border-t">
        <Section title="Blocks" intro="As the node's stream announces them. A slot is 250 ms; an epoch is 32 slots, and validators finalize epochs.">
          <div className="max-w-2xl">
            <BlockTape stats={chain} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Note title="Testnet">Testnet QRDX has no value. Mainnet launches after security audits, with its own validator set.</Note>
          </div>
        </Section>
      </section>
    </>
  )
}
