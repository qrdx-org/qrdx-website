'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function TradePage() {
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
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Trading Platform</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-lg font-medium text-primary">Coming Soon</span>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              QRDX trading interface is under development
            </p>
          </motion.div>

          <motion.div variants={fadeIn(0.1)}>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">What to Expect</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Instant Token Swaps</h3>
                      <p className="text-muted-foreground">
                        Trade any token pair instantly with the best rates and minimal slippage
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Lightning Fast Execution</h3>
                      <p className="text-muted-foreground">
                        Sub-second transaction finality powered by quantum-resistant blockchain
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Non-Custodial & Secure</h3>
                      <p className="text-muted-foreground">
                        Trade directly from your wallet with quantum-resistant security
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
                <div className="text-2xl font-bold text-primary">0.05%</div>
                <div className="text-xs text-muted-foreground">Trading Fee</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">&lt;1s</div>
                <div className="text-xs text-muted-foreground">Finality</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">2.4B</div>
                <div className="text-xs text-muted-foreground">Liquidity</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
