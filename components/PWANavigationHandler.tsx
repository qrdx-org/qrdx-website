'use client'

import { useEffect, useState } from 'react'

export default function PWANavigationHandler() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')

    if (!isStandalone) return

    // Intercept clicks on links and buttons
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if it's a link
      const link = target.closest('a')
      if (link) {
        const href = link.getAttribute('href')
        if (href && (href.includes('trade.qrdx.org') || href.startsWith('https://trade.qrdx.org'))) {
          e.preventDefault()
          setIframeUrl(href)
          return
        }
      }

      // Check if it's a button with data-href or onclick navigation
      const button = target.closest('button')
      if (button) {
        const dataHref = button.getAttribute('data-href') || button.getAttribute('data-url')
        if (dataHref && (dataHref.includes('trade.qrdx.org') || dataHref.startsWith('https://trade.qrdx.org'))) {
          e.preventDefault()
          setIframeUrl(dataHref)
          return
        }
      }

      // Check for programmatic navigation (window.location, window.open, etc.)
    }

    document.addEventListener('click', handleClick, true) // Use capture phase

    // Intercept programmatic navigation
    const originalOpen = window.open
    window.open = function(url?: string | URL, ...args: any[]) {
      const urlString = url?.toString() || ''
      if (urlString.includes('trade.qrdx.org')) {
        setIframeUrl(urlString)
        return null
      }
      return originalOpen.call(window, url, ...args)
    }

    return () => {
      document.removeEventListener('click', handleClick, true)
      window.open = originalOpen
    }
  }, [])

  if (!iframeUrl) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => setIframeUrl(null)}
          className="text-sm font-medium hover:underline"
        >
          ← Back
        </button>
        <span className="text-xs text-muted-foreground">trade.qrdx.org</span>
      </div>
      <iframe
        src={iframeUrl}
        className="w-full h-[calc(100vh-57px)] border-0"
        title="QRDX Trade"
        allow="clipboard-write; payment"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
