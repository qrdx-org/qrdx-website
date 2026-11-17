import type { Metadata } from 'next'
import ChangelogPage from '@/components/pages/ChangelogPage'

export const metadata: Metadata = {
  title: 'What’s new',
  description: 'Releases of the QRDX node, testnet, Trade, the wallet, the explorer and the docs, newest first.',
}

export default function Page() {
  return <ChangelogPage />
}
