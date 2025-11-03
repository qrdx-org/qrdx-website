import { NextResponse } from 'next/server'

export async function GET() {
  // Stub data for tokens
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', price: '2000.00', change24h: 2.5, volume24h: '245000000', marketCap: '240000000000' },
    { symbol: 'BTC', name: 'Bitcoin', price: '42000.00', change24h: 1.8, volume24h: '890000000', marketCap: '820000000000' },
    { symbol: 'QRDX', name: 'QRDX Token', price: '19.75', change24h: 8.3, volume24h: '45000000', marketCap: '1975000000' },
    { symbol: 'USDT', name: 'Tether', price: '1.00', change24h: 0.01, volume24h: '567000000', marketCap: '95000000000' },
    { symbol: 'USDC', name: 'USD Coin', price: '1.00', change24h: -0.01, volume24h: '432000000', marketCap: '28000000000' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: '41950.00', change24h: 1.7, volume24h: '125000000', marketCap: '6700000000' },
  ]

  return NextResponse.json({ tokens, total: tokens.length })
}
