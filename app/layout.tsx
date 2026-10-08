import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import CookieConsent from '@/components/CookieConsent'
import PWANavigationHandler from '@/components/PWANavigationHandler'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

const description =
  'QRDX is a blockchain secured by NIST-standard post-quantum signatures (ML-DSA-65), with order books, liquidity pools and perpetuals built into the protocol. Testnet is live.'

export const metadata: Metadata = {
  metadataBase: new URL('https://qrdx.org'),
  title: { default: 'QRDX: the blockchain built for the quantum era', template: '%s · QRDX' },
  description,
  keywords: ['post-quantum', 'quantum resistant', 'ML-DSA-65', 'FIPS 204', 'Dilithium', 'blockchain', 'decentralized exchange', 'perpetuals', 'order book', 'QRDX'],
  authors: [{ name: 'QRDX Foundation' }],
  creator: 'QRDX Foundation',
  publisher: 'QRDX Foundation',
  icons: { icon: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrdx.org',
    title: 'QRDX: the blockchain built for the quantum era',
    description,
    siteName: 'QRDX',
    images: [{ url: 'https://qrdx.org/logo.png', width: 1200, height: 630, alt: 'QRDX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRDX: the blockchain built for the quantum era',
    description,
    images: ['https://qrdx.org/logo.png'],
    creator: '@qrdx_org',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QRDX" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#030712" />
      </head>
      <body className={`${inter.className} ${inter.variable} ${mono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PWANavigationHandler />
          <div className="flex min-h-screen flex-col bg-background">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}