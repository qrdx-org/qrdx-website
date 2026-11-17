'use client'

/**
 * The /network page's data: validators and their delegation pools, staking and governance
 * parameters, proposals and the Doomsday Protocol's state, read from the testnet node in the
 * visitor's browser every 15 s. Like lib/live.ts, nothing is made up: what cannot be read is null.
 */

import { useEffect, useState } from 'react'
import { rpc } from './live'

export interface Validator {
  address: string
  status: string
  stake: string
  delegated: string
  weight: string
  earned: string
  activationEpoch: number
  slashed: boolean
  commissionBps: number | null
  delegators: number | null
}

export interface StakingParams {
  rewardRateBps: number
  defaultCommissionBps: number
  minDelegation: string
  minValidatorStake: string
  warmupEpochs: number
  unbondingEpochs: number
  withdrawalDelayEpochs: number
}

export interface GovParams {
  votingBlocks: number
  timelockBlocks: number
  executionBlocks: number
  approvalBps: number
  vetoQrdx: number
  sunsetHeight: number
}

export interface Proposal {
  id: number
  action: string
  memo: string
  status: string
  yes: string
  no: string
  totalWeight: string
  vetoTotal: string
  createdAt: number
}

export interface Spec {
  slotMs: number
  slotsPerEpoch: number
  nodeVersion: string | null
}

export interface NetworkState {
  validators: Validator[] | null
  staking: StakingParams | null
  gov: { params: GovParams; open: number; masterAuthority: boolean } | null
  proposals: Proposal[] | null
  doomsday: { triggered: { time: number; height: number; cause: string } | null; canaries: Record<string, string> } | null
  spec: Spec | null
}

const EMPTY: NetworkState = { validators: null, staking: null, gov: null, proposals: null, doomsday: null, spec: null }

interface RawValidator {
  address: string
  status: string
  stake: string
  delegated: string
  weight: string
  earned: string
  activation_epoch: number
  slashed: boolean
}
interface RawPool {
  validator: string
  commission_bps: number
  delegators: number
}
interface RawProposal {
  id: number
  action: string
  memo: string
  status: string
  yes: string
  no: string
  total_weight: string
  veto_total: string
  created_at: number
}

async function load(set: (f: (s: NetworkState) => NetworkState) => void) {
  const patch = (p: Partial<NetworkState>) => set((s) => ({ ...s, ...p }))
  await Promise.allSettled([
    Promise.all([rpc<RawValidator[]>('staking_getValidators'), rpc<RawPool[]>('staking_getPools')]).then(([vs, pools]) => {
      const pool = new Map(pools.map((p) => [p.validator.toLowerCase(), p]))
      patch({
        validators: vs
          .map((v) => {
            const p = pool.get(v.address.toLowerCase())
            return {
              address: v.address,
              status: v.status,
              stake: v.stake,
              delegated: v.delegated,
              weight: v.weight,
              earned: v.earned,
              activationEpoch: v.activation_epoch,
              slashed: v.slashed,
              commissionBps: p?.commission_bps ?? null,
              delegators: p?.delegators ?? null,
            }
          })
          .sort((a, b) => Number(b.weight) - Number(a.weight)),
      })
    }),
    rpc<{ reward_rate_bps_per_year: number; default_commission_bps: number; min_delegation: string; min_validator_stake: string; warmup_epochs: number; unbonding_epochs: number; withdrawal_delay_epochs: number }>(
      'staking_getParams'
    ).then((p) =>
      patch({
        staking: {
          rewardRateBps: p.reward_rate_bps_per_year,
          defaultCommissionBps: p.default_commission_bps,
          minDelegation: p.min_delegation,
          minValidatorStake: p.min_validator_stake,
          warmupEpochs: p.warmup_epochs,
          unbondingEpochs: p.unbonding_epochs,
          withdrawalDelayEpochs: p.withdrawal_delay_epochs,
        },
      })
    ),
    rpc<{ params: Record<string, number>; open_proposals: number; master_controller: { authority: boolean } }>('governance_getStatus').then((g) =>
      patch({
        gov: {
          params: {
            votingBlocks: g.params.GOV_VOTING_PERIOD_BLOCKS,
            timelockBlocks: g.params.GOV_TIMELOCK_BLOCKS,
            executionBlocks: g.params.GOV_EXECUTION_WINDOW_BLOCKS,
            approvalBps: g.params.GOV_APPROVAL_THRESHOLD_BPS,
            vetoQrdx: g.params.GOV_VETO_THRESHOLD_QRDX,
            sunsetHeight: g.params.SYSTEM_WALLET_MASTER_SUNSET_HEIGHT,
          },
          open: g.open_proposals,
          masterAuthority: g.master_controller.authority,
        },
      })
    ),
    rpc<RawProposal[]>('governance_getProposals', null, 10).then((ps) =>
      patch({
        proposals: ps.map((p) => ({ id: p.id, action: p.action, memo: p.memo, status: p.status, yes: p.yes, no: p.no, totalWeight: p.total_weight, vetoTotal: p.veto_total, createdAt: p.created_at })),
      })
    ),
    rpc<NetworkState['doomsday']>('bridge_getDoomsday').then((d) => patch({ doomsday: d })),
    rpc<{ params: Record<string, number>; node_version?: string }>('qrdx_chainSpec').then((c) =>
      patch({ spec: { slotMs: c.params.SLOT_DURATION_MS, slotsPerEpoch: c.params.SLOTS_PER_EPOCH, nodeVersion: c.node_version ?? null } })
    ),
  ])
}

export function useNetwork(): NetworkState {
  const [state, setState] = useState(EMPTY)
  useEffect(() => {
    void load(setState)
    const t = setInterval(() => void load(setState), 15_000)
    return () => clearInterval(t)
  }, [])
  return state
}

/** A span of time, roughly: 32 s, 4.6 h, 3.7 days. */
export function span(seconds: number): string {
  if (seconds < 90) return `${Math.round(seconds)} s`
  if (seconds < 5400) return `${Math.round(seconds / 60)} min`
  if (seconds < 172_800) return `${+(seconds / 3600).toFixed(1)} h`
  return `${+(seconds / 86_400).toFixed(1)} days`
}
