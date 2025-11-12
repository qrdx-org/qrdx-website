'use client'

import Link from 'next/link'

export default function Footer() {
  const openCookieSettings = () => {
    localStorage.removeItem('cookie-consent')
    window.location.reload()
  }

  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="https://trade.qrdx.org/trade" className="hover:text-foreground transition-colors">Trade</Link></li>
              <li><Link href="https://trade.qrdx.org/pools" className="hover:text-foreground transition-colors">Pools</Link></li>
              <li><Link href="https://trade.qrdx.org/stake" className="hover:text-foreground transition-colors">Stake</Link></li>
              <li><Link href="https://docs.qrdx.org/governance" className="hover:text-foreground transition-colors">Governance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Developers</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="https://docs.qrdx.org/" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="https://github.com/qrdx-org" className="hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="https://docs.qrdx.org/api" className="hover:text-foreground transition-colors">API</Link></li>
              <li><Link href="https://docs.qrdx.org/bugs" className="hover:text-foreground transition-colors">Bug Bounty</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/whitepaper" className="hover:text-foreground transition-colors">Whitepaper</Link></li>
              <li><Link href="https://blog.qrdx.org/" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="https://docs.qrdx.org/community/discord" className="hover:text-foreground transition-colors">Discord</Link></li>
              <li><Link href="https://x.com/qrdx_org" className="hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link href="https://t.me/qrdx_telegram" className="hover:text-foreground transition-colors">Telegram</Link></li>
              <li><Link href="https://forum.qrdx.org/" className="hover:text-foreground transition-colors">Forum</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold">QRDX</div>
          <div className="text-sm text-muted-foreground">
            © 2025 QRDX.org. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <button 
              onClick={openCookieSettings} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}