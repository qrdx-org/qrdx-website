'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Settings, ChevronDown, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
              <ArrowDown className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Trading Platform</h1>
            <p className="text-xl text-muted-foreground mb-2">Coming Soon</p>
            <p className="text-muted-foreground">The quantum-resistant trading platform is under development</p>
          </motion.div>

          <motion.div variants={fadeIn(0.1)}>
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-medium text-muted-foreground">Swap</h2>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                {/* From Token */}
                <div className="space-y-2 mb-2">
                  <label className="text-sm text-muted-foreground">From</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                        className="text-2xl h-16 pr-24"
                      />
                      <Button
                        variant="ghost"
                        className="absolute right-2 top-2 h-12"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20" />
                          <span className="font-medium">{fromToken}</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Balance: 2.45 {fromToken}</span>
                    <span>~$4,900.00</span>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-4 border-background"
                    onClick={handleSwapTokens}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm text-muted-foreground">To</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={toAmount}
                        readOnly
                        className="text-2xl h-16 pr-24"
                      />
                      <Button
                        variant="ghost"
                        className="absolute right-2 top-2 h-12"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20" />
                          <span className="font-medium">{toToken}</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Balance: 15,234.67 {toToken}</span>
                    <span>~${toAmount || '0.00'}</span>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {fromAmount && toAmount && (
                  <div className="p-4 rounded-lg bg-muted/50 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium">1 {fromToken} = 2,000 {toToken}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Price Impact</span>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-green-500">{'<0.01%'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="font-medium">~$0.42</span>
                    </div>
                  </div>
                )}

                {/* Swap Button */}
                <Button
                  className="w-full h-14 text-lg"
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                >
                  {fromAmount && parseFloat(fromAmount) > 0 ? 'Connect Wallet' : 'Enter Amount'}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By connecting your wallet, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeIn(0.2)} className="mt-6 grid grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-primary">$2.4B</div>
                <div className="text-xs text-muted-foreground">24h Volume</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-primary">2,847</div>
                <div className="text-xs text-muted-foreground">Pools</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-primary">0.05%</div>
                <div className="text-xs text-muted-foreground">Lowest Fee</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
