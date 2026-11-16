'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'cookie-consent'

/**
 * qrdx.org sets no cookies and loads no trackers, so there is nothing to consent to: this says
 * so once, and remembers that it was read.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY))
    } catch {
      /* storage blocked: say nothing rather than every visit */
    }
  }, [])

  if (!show) return null
  const dismiss = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ notice: 'read', at: new Date().toISOString().slice(0, 10) }))
    } catch {
      /* the notice still closes */
    }
    setShow(false)
  }

  return (
    <div role="region" aria-label="Privacy notice" className="fixed bottom-4 left-4 right-4 z-50 sm:right-auto sm:max-w-sm">
      <div className="flex items-start gap-4 rounded-lg border bg-popover/95 p-4 text-sm shadow-lg shadow-black/10 backdrop-blur">
        <p className="leading-relaxed text-muted-foreground">
          No cookies, no analytics, no trackers. This browser only remembers your theme.{' '}
          <Link href="/privacy#cookies" className="text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">
            Privacy
          </Link>
        </p>
        <button onClick={dismiss} className="shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent">
          OK
        </button>
      </div>
    </div>
  )
}
