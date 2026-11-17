import type { Metadata } from 'next'
import NetworkPage from '@/components/pages/NetworkPage'

export const metadata: Metadata = {
  title: 'Network',
  description: 'QRDX testnet live: validators and their stake, delegation, governance proposals and rules, the Doomsday Protocol, and blocks as they arrive.',
}

export default function Page() {
  return <NetworkPage />
}
