'use client'

/**
 * Live testnet numbers for the site, read in the visitor's browser straight from
 * the QRDX node and the trade API (both allow cross-origin requests). Nothing is
 * cached server-side and nothing is made up: a number that cannot be read shows
 * as a dash.
 *
 * One store per tab: every component that reads it shares the same polling and the
 * same block stream, which runs while at least one of them is mounted.
 */

import { useSyncExternalStore } from 'react'
import { testnet } from './site'

async function rpc<T>(method: string, ...params: unknown[]): Promise<T> {
  const res = await fetch(testnet.rpc, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal: AbortSignal.timeout(12_000),
  })
  const body = (await res.json()) as { result?: T; error?: { message: string } }
  if (body.error) throw new Error(body.error.message)
  return body.result as T
}

const get = <T>(url: string) => fetch(url, { signal: AbortSignal.timeout(12_000) }).then((r) => r.json() as Promise<T>)

/** A market as trade.qrdx.org shows it: spot oriented by its page (QRDX/USDC, not USDC/QRDX). */
export interface Market {
  id: string
  type: 'spot' | 'perp'
  name: string
  path: string
  price: string | null
  change24h: string | null
  volume24h: string | null
}

export interface Block {
  height: number
  hash: string
  /** Unix seconds, with the fraction. */
  ts: number
  finalizedEpoch: number | null
}

export interface ChainStats {
  height: number | null
  chainId: number | null
  blockInterval: number | null
  finalizedEpoch: number | null
  validators: number | null
  /** One active validator's ML-DSA-65 public key, hex. */
  validatorKey: { address: string; publicKey: string } | null
  markets: Market[] | null
  trades24h: number | null
  tokens: number | null
  qrdxUsd: number | null
  /** The newest blocks from the stream, newest first. */
  blocks: Block[]
  live: boolean
}

const EMPTY: ChainStats = {
  height: null,
  chainId: null,
  blockInterval: null,
  finalizedEpoch: null,
  validators: null,
  validatorKey: null,
  markets: null,
  trades24h: null,
  tokens: null,
  qrdxUsd: null,
  blocks: [],
  live: false,
}

const KEEP_BLOCKS = 12

let state = EMPTY
const listeners = new Set<() => void>()
let stop: (() => void) | null = null

const set = (patch: Partial<ChainStats>) => {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

interface TradeMarkets {
  spot: { id: string; path: string; base: { symbol: string }; quote: { symbol: string }; last: string | null; change24h: string | null; volume24h: string | null }[]
  perps: { id: string; path: string; markPrice: string | null; change24h: string | null; volume24h: string | null }[]
}

async function load() {
  await Promise.allSettled([
    (async () => {
      const [chain, latest] = await Promise.all([rpc<string>('eth_chainId'), rpc<{ number: string; timestamp: string }>('eth_getBlockByNumber', 'latest', false)])
      const n = parseInt(latest.number, 16)
      const back = await rpc<{ timestamp: string }>('eth_getBlockByNumber', `0x${Math.max(0, n - 200).toString(16)}`, false)
      set({ chainId: parseInt(chain, 16), height: Math.max(n, state.height ?? 0), blockInterval: (parseInt(latest.timestamp, 16) - parseInt(back.timestamp, 16)) / Math.min(200, n || 1) })
    })(),
    get<TradeMarkets>(`${testnet.tradeApi}/markets`).then((m) =>
      set({
        markets: [
          ...m.spot.map((s) => ({ id: s.id, type: 'spot' as const, name: `${s.base.symbol}/${s.quote.symbol}`, path: s.path, price: s.last, change24h: s.change24h, volume24h: s.volume24h })),
          ...m.perps.map((p) => ({ id: p.id, type: 'perp' as const, name: p.id, path: p.path, price: p.markPrice, change24h: p.change24h, volume24h: p.volume24h })),
        ],
      })
    ),
    rpc<{ trades_24h?: number }[]>('market_getMarkets').then((rows) => set({ trades24h: rows.reduce((t, r) => t + (r.trades_24h ?? 0), 0) })),
    rpc<unknown[]>('exchange_getTokens').then((t) => set({ tokens: t.length })),
    get<{ result?: { address: string; public_key?: string; status?: string }[] }>(`${testnet.node}/get_validators`).then((b) => {
      const active = (b.result ?? []).filter((v) => !v.status || v.status === 'active')
      const keyed = active.find((v) => v.public_key)
      set({ validators: active.length, validatorKey: state.validatorKey ?? (keyed ? { address: keyed.address, publicKey: keyed.public_key! } : null) })
    }),
    get<{ prices?: { qrdx?: { price: string } | null } }>(`${testnet.tradeApi}/prices?assets=qrdx`).then((b) => set({ qrdxUsd: b.prices?.qrdx ? Number(b.prices.qrdx.price) : null })),
  ])
}

function start() {
  let stopped = false
  void load()
  const timer = setInterval(load, 15_000)

  let ws: WebSocket | null = null
  let retry: ReturnType<typeof setTimeout> | null = null
  const connect = () => {
    try {
      ws = new WebSocket(testnet.ws)
    } catch {
      return
    }
    ws.onopen = () => !stopped && set({ live: true })
    ws.onclose = () => {
      if (stopped) return
      set({ live: false })
      retry = setTimeout(connect, 5_000)
    }
    ws.onmessage = (m) => {
      const e = JSON.parse(String(m.data)) as { type?: string; height?: number; hash?: string; ts?: number; finalized_epoch?: number }
      if (e.type !== 'block' || !e.height || stopped) return
      const b: Block = { height: e.height, hash: e.hash ?? '', ts: e.ts ?? Date.now() / 1000, finalizedEpoch: e.finalized_epoch ?? null }
      set({ height: e.height, finalizedEpoch: b.finalizedEpoch ?? state.finalizedEpoch, blocks: [b, ...state.blocks.filter((x) => x.height !== b.height)].slice(0, KEEP_BLOCKS) })
    }
  }
  connect()

  return () => {
    stopped = true
    clearInterval(timer)
    if (retry) clearTimeout(retry)
    ws?.close()
    set({ live: false })
  }
}

function subscribe(l: () => void) {
  listeners.add(l)
  if (!stop) stop = start()
  return () => {
    listeners.delete(l)
    if (!listeners.size && stop) {
      stop()
      stop = null
    }
  }
}

/** Chain, markets and prices, refreshed every 15 s; height and blocks follow the block stream. */
export function useTestnet(): ChainStats {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY
  )
}

/** A price to a sensible number of figures: 443.95, 0.0022525, 64,838. */
export function fmtPrice(v: string | null): string {
  const x = v === null ? NaN : Number(v)
  if (!Number.isFinite(x) || x <= 0) return '—'
  if (x >= 1000) return x.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (x >= 1) return x.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  return x.toPrecision(5)
}
