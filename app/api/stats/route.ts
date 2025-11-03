import { NextResponse } from 'next/server'

export async function GET() {
  // Stub data for stats
  const stats = {
    tvl: '2400000000', // $2.4B
    volume24h: '847000000', // $847M
    activeUsers: 156000,
    liquidityPools: 2847,
    totalStaked: '892400000', // $892.4M
    qrdxStaked: '45200000', // 45.2M
    stakingRatio: 67.8,
    fees24h: '4235000', // $4.235M
  }

  return NextResponse.json(stats)
}
