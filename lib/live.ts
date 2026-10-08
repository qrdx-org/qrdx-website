'use client'

/**
 * Live testnet numbers for the site, read in the visitor's browser straight from
 * the QRDX node and the trade API (both allow cross-origin requests). Nothing is
 * cached server-side and nothing is made up: a number that cannot be read shows
 * as a dash.
 */

import { useEffect, useState } from 'react'
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

export interface MarketRow {
  market: string
  type: 'spot' | 'perp'
  base: string
  quote: string
  last_price: string | null
  change_pct_24h: string | null
  trades_24h: number
  base_info?: { symbol: string }
  quote_info?: { symbol: string }
  mark_price?: string | null
}

export interface ChainStats {
  height: number | null
  chainId: number | null
  blockInterval: number | null
  validators: number | null
  markets: MarketRow[] | null
  tokens: number | null
  qrdxUsd: number | null
}

const EMPTY: ChainStats = { height: null, chainId: null, blockInterval: null, validators: null, markets: null, tokens: null, qrdxUsd: null }

/** Chain, markets and price, refreshed every 15 s; the height follows the block stream. */
export function useTestnet(): ChainStats & { live: boolean } {
  const [s, setS] = useState<ChainStats>(EMPTY)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let stopped = false
    const set = (patch: Partial<ChainStats>) => !stopped && setS((p) => ({ ...p, ...patch }))
    const load = async () => {
      await Promise.allSettled([
        (async () => {
          const [chain, latest] = await Promise.all([rpc<string>('eth_chainId'), rpc<{ number: string; timestamp: string }>('eth_getBlockByNumber', 'latest', false)])
          const n = parseInt(latest.number, 16)
          const back = await rpc<{ timestamp: string }>('eth_getBlockByNumber', `0x${Math.max(0, n - 50).toString(16)}`, false)
          set({ chainId: parseInt(chain, 16), height: n, blockInterval: (parseInt(latest.timestamp, 16) - parseInt(back.timestamp, 16)) / Math.min(50, n || 1) })
        })(),
        rpc<MarketRow[]>('market_getMarkets').then((markets) => set({ markets })),
        rpc<unknown[]>('exchange_getTokens').then((t) => set({ tokens: t.length })),
        fetch(`${testnet.node}/get_validators`, { signal: AbortSignal.timeout(12_000) })
          .then((r) => r.json())
          .then((b: { result?: { status?: string }[] }) => set({ validators: (b.result ?? []).filter((v) => !v.status || v.status === 'active').length })),
        fetch(`${testnet.tradeApi}/prices?assets=qrdx`, { signal: AbortSignal.timeout(12_000) })
          .then((r) => r.json())
          .then((b: { prices?: { qrdx?: { price: string } | null } }) => set({ qrdxUsd: b.prices?.qrdx ? Number(b.prices.qrdx.price) : null })),
      ])
    }
    void load()
    const timer = setInterval(load, 15_000)

    let ws: WebSocket | null = null
    try {
      ws = new WebSocket(testnet.ws)
      ws.onopen = () => !stopped && setLive(true)
      ws.onclose = () => !stopped && setLive(false)
      ws.onmessage = (m) => {
        const e = JSON.parse(String(m.data)) as { type?: string; height?: number }
        if (e.type === 'block' && e.height) set({ height: e.height })
      }
    } catch {
      /* polling still updates */
    }
    return () => {
      stopped = true
      clearInterval(timer)
      ws?.close()
    }
  }, [])

  return { ...s, live }
}

export const marketName = (m: MarketRow) =>
  m.type === 'perp' ? m.market : `${m.base_info?.symbol ?? m.base.slice(0, 8)}/${m.quote_info?.symbol ?? m.quote.slice(0, 8)}`
