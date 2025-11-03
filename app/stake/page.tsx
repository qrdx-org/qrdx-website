'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Coins, Lock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function StakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container px-4 mx-auto pt-32 pb-16">
        <motion.div
          className="max-w-2xl mx-auto"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeIn()} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <Coins className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Staking Platform</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-lg font-medium text-primary">Coming Soon</span>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              QRDX staking functionality is under development
            </p>
          </motion.div>

          <motion.div variants={fadeIn(0.1)}>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">What to Expect</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Earn Passive Income</h3>
                      <p className="text-muted-foreground">
                        Stake QRDX tokens and receive daily rewards distributed directly to your wallet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">High APR Rewards</h3>
                      <p className="text-muted-foreground">
                        Flexible and locked staking options with competitive annual returns up to 52%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Governance Rights</h3>
                      <p className="text-muted-foreground">
                        Staked tokens grant voting power to participate in protocol governance decisions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn(0.2)} className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </motion.div>

          <motion.div variants={fadeIn(0.3)} className="mt-8 grid grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">12.5%</div>
                <div className="text-xs text-muted-foreground">Min APR</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">52%</div>
                <div className="text-xs text-muted-foreground">Max APR</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">Daily</div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}
