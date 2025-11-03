'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Droplets, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

const mockPools = [
  { id: 1, pair: 'ETH/USDT', tvl: '$124.5M', apr: '24.5%', volume24h: '$45.2M', fees24h: '$22,600' },
  { id: 2, pair: 'QRDX/ETH', tvl: '$89.2M', apr: '45.8%', volume24h: '$28.4M', fees24h: '$14,200' },
  { id: 3, pair: 'BTC/USDT', tvl: '$156.8M', apr: '18.2%', volume24h: '$67.9M', fees24h: '$33,950' },
  { id: 4, pair: 'USDC/USDT', tvl: '$78.4M', apr: '12.4%', volume24h: '$98.2M', fees24h: '$49,100' },
  { id: 5, pair: 'ETH/WBTC', tvl: '$45.6M', apr: '32.1%', volume24h: '$18.7M', fees24h: '$9,350' },
  { id: 6, pair: 'QRDX/USDT', tvl: '$67.3M', apr: '52.3%', volume24h: '$22.1M', fees24h: '$11,050' },
]

export default function PoolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container px-4 mx-auto pt-32 pb-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeIn()} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Liquidity Pools</h1>
                <p className="text-muted-foreground">Provide liquidity and earn fees from trades</p>
              </div>
              <Button size="lg" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Liquidity
              </Button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={fadeIn(0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Droplets className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Total Value Locked</span>
                </div>
                <div className="text-3xl font-bold">$562.8M</div>
                <div className="text-sm text-green-500 mt-1">+12.4% this week</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                </div>
                <div className="text-3xl font-bold">$280.5M</div>
                <div className="text-sm text-green-500 mt-1">+8.2% from yesterday</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">24h Fees</span>
                </div>
                <div className="text-3xl font-bold">$140,250</div>
                <div className="text-sm text-muted-foreground mt-1">Distributed to LPs</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pools Table */}
          <motion.div variants={fadeIn(0.2)}>
            <Card className="border-primary/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Pool</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">TVL</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">APR</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">24h Volume</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">24h Fees</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPools.map((pool) => (
                        <tr key={pool.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                                <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background" />
                              </div>
                              <span className="font-medium">{pool.pair}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">{pool.tvl}</td>
                          <td className="px-6 py-4">
                            <span className="text-green-500 font-medium">{pool.apr}</span>
                          </td>
                          <td className="px-6 py-4">{pool.volume24h}</td>
                          <td className="px-6 py-4">{pool.fees24h}</td>
                          <td className="px-6 py-4 text-right">
                            <Button size="sm" variant="outline">Add</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div variants={fadeIn(0.3)} className="mt-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">How Liquidity Pools Work</h3>
                <p className="text-muted-foreground mb-4">
                  Liquidity pools are the backbone of decentralized exchanges. By providing liquidity, you earn a share of trading fees proportional to your contribution to the pool.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Earn 0.05% of all trades proportional to your share of the pool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>LP tokens represent your share and can be redeemed anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Additional rewards available in QRDX tokens for select pools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
