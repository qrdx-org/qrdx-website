'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, TrendingUp, Coins } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function PoolsPage() {
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
              <Droplets className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Liquidity Pools</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-lg font-medium text-primary">Coming Soon</span>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Liquidity pool functionality is under development
            </p>
          </motion.div>

          <motion.div variants={fadeIn(0.1)}>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">What to Expect</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Droplets className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Provide Liquidity</h3>
                      <p className="text-muted-foreground">
                        Add liquidity to pools and earn a share of trading fees from every swap
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Earn High APR</h3>
                      <p className="text-muted-foreground">
                        Competitive annual percentage rates with additional QRDX token rewards
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 mt-1">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">LP Tokens</h3>
                      <p className="text-muted-foreground">
                        Receive LP tokens representing your pool share, redeemable anytime
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
                <div className="text-xs text-muted-foreground">LP Fee</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">45%+</div>
                <div className="text-xs text-muted-foreground">Max APR</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-xs text-muted-foreground">Pool Pairs</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}
