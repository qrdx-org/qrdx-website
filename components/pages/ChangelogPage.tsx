'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ButtonLink, PageHero, Section } from '@/components/site/blocks'
import { RELEASES, type Product } from '@/lib/changelog'
import { docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const PRODUCTS: Product[] = ['Node', 'Testnet', 'Trade', 'Wallet', 'Explorer', 'Docs', 'Website']

const month = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const day = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

export default function ChangelogPage() {
  const [only, setOnly] = useState<Product | null>(null)
  const rows = RELEASES.filter((r) => !only || r.product === only)
  const months = [...new Set(rows.map((r) => r.date.slice(0, 7)))]

  return (
    <>
      <PageHero eyebrow="What’s new" title="What shipped, and when" actions={<ButtonLink href={docs.roadmap}>What comes next</ButtonLink>}>
        Releases of the node and the apps, newest first. Everything here runs on testnet today.
      </PageHero>

      <Section>
        <div className="mb-10 flex flex-wrap gap-x-5 border-b text-sm" role="tablist" aria-label="Filter by product">
          {[null, ...PRODUCTS].map((p) => (
            <button
              key={p ?? 'all'}
              role="tab"
              aria-selected={only === p}
              onClick={() => setOnly(p)}
              className={cn('-mb-px border-b-2 py-3 transition-colors', only === p ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}
            >
              {p ?? 'All'}
            </button>
          ))}
        </div>

        <div className="space-y-14">
          {months.map((m) => (
            <section key={m} className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:sticky lg:top-24 lg:self-start lg:pt-5">{month(`${m}-01`)}</h2>
              <ol className="border-t border-foreground/15">
                {rows
                  .filter((r) => r.date.startsWith(m))
                  .map((r) => {
                    const external = r.href?.startsWith('http')
                    return (
                      <li key={`${r.date}-${r.product}-${r.title}`} className="grid gap-x-8 gap-y-2 border-b py-5 sm:grid-cols-[6rem_minmax(0,1fr)]">
                        <div className="flex items-baseline gap-3 sm:block">
                          <div className="num font-mono text-[13px]">{day(r.date)}</div>
                          <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground sm:mt-1">{r.product}</div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium tracking-tight">{r.title}</h3>
                          {r.points?.map((p) => (
                            <p key={p} className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                              {p}
                            </p>
                          ))}
                          {r.href &&
                            (external ? (
                              <a href={r.href} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1 text-sm underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
                                Read more <ArrowUpRight className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <Link href={r.href} className="mt-2.5 inline-flex items-center gap-1 text-sm underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
                                Open <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ))}
                        </div>
                      </li>
                    )
                  })}
              </ol>
            </section>
          ))}
        </div>
      </Section>
    </>
  )
}
