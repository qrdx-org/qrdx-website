'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { KeyField } from '@/components/gfx/KeyField'
import type { ChainStats } from '@/lib/live'
import { apps, testnet } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Testnet's blocks as the node's stream announces them: height, hash, and the time since the
 * block before. Rows are kept at a fixed count so the hero does not move while they arrive.
 * Over the lattice it is frosted glass, so the nodes those blocks light show through.
 */
export function BlockTape({ stats, rows = 9, className }: { stats: ChainStats; rows?: number; className?: string }) {
  const { blocks, live, chainId, finalizedEpoch } = stats
  return (
    <div className={cn('overflow-hidden rounded-xl border border-foreground/10 bg-background/55 font-mono text-[12px] shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40', className)}>
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5 text-muted-foreground">
        <span className="flex items-center gap-2 text-foreground">
          <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'pulse-dot bg-bid text-bid' : 'bg-muted-foreground')} />
          {live ? 'blocks, live' : 'connecting'}
        </span>
        <span className="truncate">test.qrdx.org{chainId ? ` · chain ${chainId}` : ''}</span>
      </div>
      <div className="grid grid-cols-[6.5rem_1fr_4.5rem] gap-3 border-b px-4 py-2 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>Height</span>
        <span>Hash</span>
        <span className="text-right">After</span>
      </div>
      <ol>
        {Array.from({ length: rows }, (_, i) => {
          const b = blocks[i]
          const prev = blocks[i + 1]
          const gap = b && prev && prev.height === b.height - 1 ? Math.round((b.ts - prev.ts) * 1000) : null
          return (
            <li
              key={b ? b.height : `empty-${i}`}
              className={cn('grid grid-cols-[6.5rem_1fr_4.5rem] gap-3 border-b px-4 py-[7px] last:border-b-0', i === 0 && b && 'flash-in')}
              style={{ opacity: b ? 1 - i * (0.6 / rows) : 0.35 }}
            >
              <span className="num text-foreground">{b ? `#${b.height.toLocaleString('en-US')}` : '—'}</span>
              <span className="truncate text-muted-foreground">{b ? `${b.hash.slice(0, 8)}…${b.hash.slice(-6)}` : ' '}</span>
              <span className="num text-right text-muted-foreground">{gap !== null ? `${gap} ms` : b ? '' : ' '}</span>
            </li>
          )
        })}
      </ol>
      <div className="flex justify-between gap-3 border-t px-4 py-2.5 text-muted-foreground">
        <span>finalized epoch {finalizedEpoch ? finalizedEpoch.toLocaleString('en-US') : '—'}</span>
        <span className="hidden sm:inline">32 slots × 250 ms</span>
      </div>
    </div>
  )
}

/** Bytes a classic key fills, highlighted at the start of the post-quantum key. */
const CLASSIC_PUBKEY_BYTES = 33

/**
 * One active validator's ML-DSA-65 public key, exactly as the node serves it, with the first
 * 33 bytes marked: that much is a whole compressed secp256k1 public key.
 */
export function ValidatorKey({ stats }: { stats: ChainStats }) {
  const k = stats.validatorKey
  const hex = k?.publicKey ?? ''
  const bytes = hex.length / 2
  return (
    <figure className="flex h-full flex-col">
      <KeyField publicKey={k ? hex : null} className="aspect-[4/3] w-full rounded-t-xl border border-b-0 bg-card sm:aspect-[2.3/1]">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground sm:p-5">
          <span>Fig. 1 · one column per byte, as tall as its value</span>
          <span className="hidden sm:inline">61 × 32</span>
        </div>
      </KeyField>
      <div className="relative flex-1 overflow-hidden rounded-b-xl border bg-card/60 p-4 first:rounded-t-xl sm:p-5">
        {k ? (
          <p className="break-all font-mono text-[8.5px] leading-[1.55] tracking-[0.02em] text-muted-foreground/80 sm:text-[9.5px] lg:text-[10px]">
            <mark className="rounded-[2px] bg-signal/20 text-foreground ring-1 ring-signal/50">{hex.slice(0, CLASSIC_PUBKEY_BYTES * 2)}</mark>
            {hex.slice(CLASSIC_PUBKEY_BYTES * 2)}
          </p>
        ) : (
          <p className="flex h-full min-h-40 items-center justify-center font-mono text-xs text-muted-foreground">Reading a validator&apos;s key from testnet…</p>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span>
          {k ? (
            <>
              <a href={`${apps.explorer}/address/${k.address}?network=testnet`} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">
                {k.address.slice(0, 8)}…{k.address.slice(-6)}
              </a>
              , a testnet validator: its public key, {bytes.toLocaleString('en-US')} bytes
            </>
          ) : (
            'A testnet validator’s public key'
          )}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-signal/40 ring-1 ring-signal" /> {CLASSIC_PUBKEY_BYTES} bytes: a whole secp256k1 key
        </span>
      </figcaption>
    </figure>
  )
}

const SIZES = [
  { what: 'Public key', classic: 33, pq: 1952 },
  { what: 'Signature', classic: 65, pq: 3309 },
]
const MAX = 3309

/** secp256k1 against ML-DSA-65, drawn to one scale. */
export function SizeTable() {
  return (
    <div className="border-t border-foreground/15">
      <div className="grid grid-cols-[6rem_1fr] gap-4 border-b py-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground sm:grid-cols-[7.5rem_1fr]">
        <span />
        <span>Bytes, to scale</span>
      </div>
      {SIZES.map((s) => (
        <div key={s.what} className="grid grid-cols-[6rem_1fr] items-center gap-4 border-b py-4 sm:grid-cols-[7.5rem_1fr]">
          <span className="text-sm font-medium">{s.what}</span>
          <div className="space-y-2">
            <Bar label="secp256k1" bytes={s.classic} />
            <Bar label="ML-DSA-65" bytes={s.pq} accent />
          </div>
        </div>
      ))}
      <dl className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 py-4 text-sm sm:grid-cols-[7.5rem_1fr]">
        <dt className="font-medium">Shor&apos;s algorithm</dt>
        <dd className="text-muted-foreground">
          Recovers a secp256k1 private key from its public key. No known quantum algorithm does the same for ML-DSA-65, which rests on module lattices.
        </dd>
        <dt className="font-medium">Standard</dt>
        <dd className="text-muted-foreground">secp256k1: SEC 2, as in Bitcoin and Ethereum. ML-DSA-65: NIST FIPS 204, published August 2024.</dd>
      </dl>
    </div>
  )
}

function Bar({ label, bytes, accent }: { label: string; bytes: number; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3 font-mono text-[11px] sm:grid-cols-[6rem_1fr]">
      <span className={accent ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
      <div className="flex items-center gap-2">
        <span className={cn('rule-draw h-2 rounded-[1px]', accent ? 'bg-signal' : 'bg-foreground/50')} style={{ width: `max(3px, calc((100% - 4.5rem) * ${bytes / MAX}))` }} />
        <span className="num shrink-0 text-muted-foreground">{bytes.toLocaleString('en-US')} B</span>
      </div>
    </div>
  )
}

function CopyValue({ value }: { value: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        })
      }}
      className="group flex min-w-0 max-w-full items-center gap-2 text-left"
      aria-label={`Copy ${value}`}
    >
      <span className="truncate">{value}</span>
      {done ? <Check className="h-3.5 w-3.5 shrink-0 text-bid" /> : <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />}
    </button>
  )
}

/** What a developer or a wallet needs to reach testnet, copyable. */
export function Endpoints({ stats }: { stats: ChainStats }) {
  const rows = [
    { k: 'JSON-RPC', v: testnet.rpc },
    { k: 'WebSocket', v: testnet.ws },
    { k: 'Chain id', v: stats.chainId ? String(stats.chainId) : null },
    { k: 'Trade API', v: testnet.tradeApi },
  ]
  return (
    <dl className="border-t border-foreground/15 font-mono text-[13px]">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[6.5rem_1fr] items-center gap-4 border-b py-3">
          <dt className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{r.k}</dt>
          <dd className="min-w-0">{r.v ? <CopyValue value={r.v} /> : <span className="text-muted-foreground">—</span>}</dd>
        </div>
      ))}
    </dl>
  )
}
