'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Coins, TrendingUp, Lock, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

const stakingOptions = [
  {
    id: 1,
    title: 'Flexible Staking',
    apr: '12.5%',
    lockPeriod: 'No lock',
    minAmount: '100 QRDX',
    description: 'Stake and unstake anytime with daily rewards',
    icon: Coins,
  },
  {
    id: 2,
    title: '30-Day Lock',
    apr: '24.8%',
    lockPeriod: '30 days',
    minAmount: '500 QRDX',
    description: 'Lock your tokens for 30 days and earn higher rewards',
    icon: Timer,
  },
  {
    id: 3,
    title: '90-Day Lock',
    apr: '45.2%',
    lockPeriod: '90 days',
    minAmount: '1,000 QRDX',
    description: 'Maximum rewards with 90-day commitment',
    icon: Lock,
  },
]

export default function StakePage() {
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
          <motion.div variants={fadeIn()} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Stake QRDX</h1>
            <p className="text-muted-foreground text-lg">Earn rewards by staking your QRDX tokens</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={fadeIn(0.1)} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">$892.4M</div>
                <div className="text-sm text-muted-foreground">Total Staked</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">45.2M</div>
                <div className="text-sm text-muted-foreground">QRDX Staked</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">67.8%</div>
                <div className="text-sm text-muted-foreground">Staking Ratio</div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">156K+</div>
                <div className="text-sm text-muted-foreground">Stakers</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Staking Options */}
          <motion.div 
            variants={fadeIn(0.2)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {stakingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card key={option.id} className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{option.title}</h3>
                        <div className="text-2xl font-bold text-primary">{option.apr}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lock Period</span>
                        <span className="font-medium">{option.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min. Amount</span>
                        <span className="font-medium">{option.minAmount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground pt-2 border-t">
                        {option.description}
                      </p>
                    </div>

                    <Button className="w-full">Stake Now</Button>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>

          {/* Your Staking Position */}
          <motion.div variants={fadeIn(0.3)}>
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Your Staking Position</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Staked</div>
                    <div className="text-2xl font-bold">0 QRDX</div>
                    <div className="text-sm text-muted-foreground">~$0.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rewards Earned</div>
                    <div className="text-2xl font-bold text-green-500">0 QRDX</div>
                    <div className="text-sm text-muted-foreground">~$0.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Est. Annual Rewards</div>
                    <div className="text-2xl font-bold">0 QRDX</div>
                    <div className="text-sm text-muted-foreground">Based on current APR</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-muted-foreground mb-4">Connect your wallet to view and manage your staking positions</p>
                  <Button size="lg">Connect Wallet</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div variants={fadeIn(0.4)} className="mt-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Staking Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Earn Passive Income</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive daily rewards distributed in QRDX tokens directly to your wallet
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Governance Rights</h4>
                    <p className="text-sm text-muted-foreground">
                      Staked QRDX holders can vote on protocol proposals and shape the future of QRDX
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Trading Fee Discounts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get up to 50% discount on trading fees based on your staking tier
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Compound Rewards</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically restake your rewards to maximize your earnings over time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
