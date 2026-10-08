'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileText, ListTree } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { Note, PageHero } from '@/components/site/blocks'
import { docs } from '@/lib/site'
import { cn } from '@/lib/utils'

const SOURCE = '/QRDX-Whitepaper-v3.2.md'

interface Heading {
  id: string
  title: string
}

export default function WhitepaperPage() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [toc, setToc] = useState<Heading[]>([])
  const [active, setActive] = useState('')
  const body = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(SOURCE)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setMarkdown)
      .catch(() => setError(true))
  }, [])

  // Version and date as the document states them.
  const meta = useMemo(() => {
    const version = markdown?.match(/\*\*Version:\*\*\s*([^\n]+?)\s*$/m)?.[1]
    const updated = markdown?.match(/\*\*Last Updated:\*\*\s*([^\n]+?)\s*$/m)?.[1]
    return { version, updated }
  }, [markdown])

  // The table of contents is the rendered document's own section headings, so anchors always match.
  useEffect(() => {
    if (!markdown || !body.current) return
    const hs = [...body.current.querySelectorAll<HTMLHeadingElement>('h2[id]')].filter((h) => /^\d+\./.test(h.textContent ?? ''))
    setToc(hs.map((h) => ({ id: h.id, title: h.textContent ?? '' })))
    const onScroll = () => {
      let current = ''
      for (const h of hs) if (h.getBoundingClientRect().top <= 120) current = h.id
      setActive(current)
    }
    onScroll()
    // A link to a section (/whitepaper#…) arrives before the document has rendered.
    const target = decodeURIComponent(window.location.hash.slice(1))
    if (target) document.getElementById(target)?.scrollIntoView()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [markdown])

  return (
    <>
      <PageHero
        eyebrow="Whitepaper"
        title="The QRDX protocol"
        actions={
          <>
            <a href="/QRDX-Whitepaper-v3.2.pdf" download className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Download className="h-4 w-4" /> PDF
            </a>
            <a href={SOURCE} download className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent">
              <FileText className="h-4 w-4" /> Markdown
            </a>
          </>
        }
      >
        A quantum-resistant Layer-0 protocol with an integrated exchange, cross-chain oracle and asset shielding.
        {meta.version && (
          <span className="mt-3 block text-sm">
            Version {meta.version}
            {meta.updated ? ` · ${meta.updated}` : ''}
          </span>
        )}
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto mb-10 max-w-3xl">
          <Note title="Design and status">
            The whitepaper describes the full design, including parts that are not built yet. What runs today, on testnet, is on the{' '}
            <a href={docs.roadmap} className="text-primary hover:underline">
              status and roadmap
            </a>{' '}
            page of the docs.
          </Note>
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ListTree className="h-3.5 w-3.5" /> Contents
              </p>
              <ul className="space-y-0.5 border-l text-sm">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={cn(
                        '-ml-px block border-l py-1 pl-3 transition-colors',
                        active === h.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article ref={body} className="min-w-0">
            {error ? (
              <p className="text-ask">The whitepaper could not be loaded. Download the PDF instead.</p>
            ) : !markdown ? (
              <p className="text-muted-foreground">Loading the whitepaper…</p>
            ) : (
              <div
                className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:hidden
                  prose-h2:mt-14 prose-h2:border-b prose-h2:pb-3 prose-h2:text-3xl prose-p:leading-7 prose-p:text-muted-foreground prose-li:text-muted-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground
                  prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none
                  prose-pre:border prose-pre:bg-card prose-pre:text-foreground prose-table:text-sm prose-th:bg-muted/50 prose-th:p-2 prose-td:p-2 prose-img:mx-auto"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
