'use client'

import { useEffect, useState } from 'react'

// Supported subdomains that should open in the PWA handler
const SUPPORTED_SUBDOMAINS: Record<string, string> = {
  'explorer.qrdx.org': 'QRDX Explorer',
  'trade.qrdx.org': 'QRDX Trade',
  'docs.qrdx.org': 'QRDX Docs'
}

export default function PWANavigationHandler() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Helper to check if URL matches supported subdomains
  const isSupportedUrl = (url: string): boolean => {
    return Object.keys(SUPPORTED_SUBDOMAINS).some(subdomain => 
      url.includes(subdomain) || url.startsWith(`https://${subdomain}`) || url.startsWith(`http://${subdomain}`)
    )
  }

  // Get label for the current URL
  const getUrlLabel = (url: string): string => {
    const subdomain = Object.keys(SUPPORTED_SUBDOMAINS).find(sub => url.includes(sub))
    return subdomain ? SUPPORTED_SUBDOMAINS[subdomain] : 'QRDX'
  }

  // Hide the navigation when iframe is active
  useEffect(() => {
    if (iframeUrl) {
      // Hide the navigation and all content by adding a class to body
      document.body.setAttribute('data-pwa-iframe-active', 'true')
      // Prevent scrolling and ensure nothing shows through
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      // Hide all body children except the handler
      document.body.style.visibility = 'hidden'
    } else {
      document.body.removeAttribute('data-pwa-iframe-active')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.visibility = ''
    }
  }, [iframeUrl])

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
        if (href && isSupportedUrl(href)) {
          e.preventDefault()
          setIframeUrl(href)
          return
        }
      }

      // Check if it's a button with data-href or onclick navigation
      const button = target.closest('button')
      if (button) {
        const dataHref = button.getAttribute('data-href') || button.getAttribute('data-url')
        if (dataHref && isSupportedUrl(dataHref)) {
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
      if (isSupportedUrl(urlString)) {
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
          flexDirection: 'column',
          visibility: 'visible'
        }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b bg-background/100 backdrop-blur-sm" style={{ height: '60px', flexShrink: 0, zIndex: 10000000 }}>
          <button
            onClick={() => setIframeUrl(null)}
            className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-accent transition-colors flex-shrink-0"
          >
            ← Back
          </button>
          <div className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border text-sm font-medium text-muted-foreground truncate">
            {getUrlLabel(iframeUrl)}
          </div>
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
