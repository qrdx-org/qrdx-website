'use client'

import { useEffect, useState } from 'react'

export default function PWANavigationHandler() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide the navigation when iframe is active
  useEffect(() => {
    if (iframeUrl) {
      // Hide the navigation by adding a class to body
      document.body.setAttribute('data-pwa-iframe-active', 'true')
    } else {
      document.body.removeAttribute('data-pwa-iframe-active')
    }
  }, [iframeUrl])

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')

    if (!isStandalone) return

    // Prevent body scroll and hide all content when iframe is open
    if (iframeUrl) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

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
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [iframeUrl])

  if (!iframeUrl || !mounted) return null

  return (
    <>
      {/* Portal overlay to ensure complete coverage */}
      <div 
        className="fixed inset-0 bg-background" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 9999999,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="flex items-center justify-between p-4 border-b bg-background" style={{ height: '57px', flexShrink: 0, zIndex: 10000000 }}>
          <button
            onClick={() => setIframeUrl(null)}
            className="text-sm font-medium hover:underline"
          >
            ← Back
          </button>
        </div>
        <iframe
          src={iframeUrl}
          className="border-0"
          style={{ 
            width: '100%',
            height: '100%',
            flex: 1,
            display: 'block',
            border: 'none'
          }}
          title="QRDX Trade"
          allow="clipboard-write; payment"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </>
  )
}
