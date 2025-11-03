import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QRDX - Quantum Resistant Decentralized eXchange',
  description: 'Trade, shield, and secure your crypto assets with quantum-resistant technology. Convert ETH to qETH, BTC to qBTC with post-quantum cryptography. The first quantum-safe DEX for the future of blockchain.',
  keywords: ['quantum resistant', 'quantum safe', 'post-quantum cryptography', 'DEX', 'decentralized exchange', 'asset shielding', 'qETH', 'qBTC', 'blockchain security', 'CRYSTALS-Dilithium', 'CRYSTALS-Kyber'],
  authors: [{ name: 'QRDX Foundation' }],
  creator: 'QRDX Foundation',
  publisher: 'QRDX Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrdx.org',
    title: 'QRDX - Quantum Resistant Decentralized eXchange',
    description: 'Trade, shield, and secure your crypto assets with quantum-resistant technology. Convert ETH to qETH, BTC to qBTC with post-quantum cryptography.',
    siteName: 'QRDX',
    images: [
      {
        url: 'https://qrdx.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'QRDX - Quantum Resistant DEX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRDX - Quantum Resistant Decentralized eXchange',
    description: 'Trade, shield, and secure your crypto assets with quantum-resistant technology. Convert ETH to qETH, BTC to qBTC.',
    images: ['https://qrdx.org/logo.png'],
    creator: '@qrdx_org',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}