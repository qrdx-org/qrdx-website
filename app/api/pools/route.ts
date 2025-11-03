import { NextResponse } from 'next/server'

export const dynamic = "force-static"

export async function GET() {
  // Stub data for pools
  const pools = [
    { id: 1, pair: 'ETH/USDT', token0: 'ETH', token1: 'USDT', tvl: '124500000', apr: 24.5, volume24h: '45200000', fees24h: '22600', liquidity: '124500000' },
    { id: 2, pair: 'QRDX/ETH', token0: 'QRDX', token1: 'ETH', tvl: '89200000', apr: 45.8, volume24h: '28400000', fees24h: '14200', liquidity: '89200000' },
    { id: 3, pair: 'BTC/USDT', token0: 'BTC', token1: 'USDT', tvl: '156800000', apr: 18.2, volume24h: '67900000', fees24h: '33950', liquidity: '156800000' },
    { id: 4, pair: 'USDC/USDT', token0: 'USDC', token1: 'USDT', tvl: '78400000', apr: 12.4, volume24h: '98200000', fees24h: '49100', liquidity: '78400000' },
    { id: 5, pair: 'ETH/WBTC', token0: 'ETH', token1: 'WBTC', tvl: '45600000', apr: 32.1, volume24h: '18700000', fees24h: '9350', liquidity: '45600000' },
    { id: 6, pair: 'QRDX/USDT', token0: 'QRDX', token1: 'USDT', tvl: '67300000', apr: 52.3, volume24h: '22100000', fees24h: '11050', liquidity: '67300000' },
  ]

  return NextResponse.json({ pools, total: pools.length })
}
