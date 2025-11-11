'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Zap, Users, Lock, ArrowRight, ChevronRight, Droplets, Activity, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}{displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}
    </span>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Under Construction Banner */}
      <div className="container px-4 mx-auto pt-20">
        <Alert className="bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Under Construction:</strong> QRDX is currently in development. Features and information are subject to change.
          </AlertDescription>
        </Alert>
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div
              variants={fadeIn()}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quantum-Resistant Security</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
              variants={fadeIn()}
            >
              Shield Your Assets for the{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-foreground">
                Quantum Era
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn()}
            >
              Convert ETH → qETH, BTC → qBTC with quantum-resistant cryptography. Trade and secure your assets on the first post-quantum DEX.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeIn()}
            >
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/get-started" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/trade">
                  Launch App
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/whitepaper">
                  Read Whitepaper
                </Link>
              </Button>
            </motion.div>

            {/* Stats Grid - Commented out for now
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              variants={fadeIn(0.2)}
            >
              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                    <AnimatedNumber value={2.4} prefix="$" suffix="B" decimals={1} />
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value Locked</div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                    <AnimatedNumber value={847} suffix="M" decimals={0} />
                  </div>
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                    <AnimatedNumber value={156000} suffix="+" decimals={0} />
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                    <AnimatedNumber value={2847} suffix="+" decimals={0} />
                  </div>
                  <div className="text-sm text-muted-foreground">Liquidity Pools</div>
                </CardContent>
              </Card>
            </motion.div>
            */}
          </motion.div>
        </div>
      </section>

      {/* Asset Shielding Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              variants={fadeIn()}
            >
              Asset Shielding: Quantum-Safe Migration
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeIn()}
            >
              Protect your cryptocurrency from quantum computing threats. Shield your assets with NIST-standardized post-quantum cryptography.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div variants={fadeIn()}>
              <Card className="h-full p-8 text-center border-primary/20 hover:shadow-xl transition-all">
                <div className="text-5xl font-bold mb-4 text-primary">ETH → qETH</div>
                <h3 className="text-xl font-bold mb-3">Shield Ethereum</h3>
                <p className="text-muted-foreground">
                  Lock your ETH on Ethereum mainnet and receive quantum-resistant qETH on QRDX Chain. 1:1 backed and fully redeemable.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full p-8 text-center border-primary/20 hover:shadow-xl transition-all">
                <div className="text-5xl font-bold mb-4 text-primary">BTC → qBTC</div>
                <h3 className="text-xl font-bold mb-3">Shield Bitcoin</h3>
                <p className="text-muted-foreground">
                  Convert your Bitcoin (via WBTC) into quantum-safe qBTC. Secured by CRYSTALS-Dilithium signatures and trustless bridges.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full p-8 text-center border-primary/20 hover:shadow-xl transition-all">
                <div className="text-5xl font-bold mb-4 text-primary">ANY → qRC20</div>
                <h3 className="text-xl font-bold mb-3">Shield Any Asset</h3>
                <p className="text-muted-foreground">
                  Migrate USDC, USDT, and any ERC-20 token to their quantum-resistant qRC20 equivalents on QRDX Chain.
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn(0.3)}
          >
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/whitepaper#asset-shielding" className="flex items-center">
                Learn About Asset Shielding
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              variants={fadeIn()}
            >
              Why Choose QRDX?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn()}
            >
              Built for the quantum era with cutting-edge security and performance
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quantum-Resistant Security</h3>
                <p className="text-muted-foreground">
                  Protected by post-quantum cryptography algorithms, ensuring your assets remain secure in the quantum computing era
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Experience sub-second transaction finality with our optimized quantum-resistant blockchain architecture
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lowest Fees</h3>
                <p className="text-muted-foreground">
                  Trade with minimal fees starting at 0.05%, with additional discounts for QRDX token holders
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Deep Liquidity</h3>
                <p className="text-muted-foreground">
                  Access deep liquidity pools with minimal slippage for optimal trading experience
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Non-Custodial</h3>
                <p className="text-muted-foreground">
                  Your keys, your crypto. Trade directly from your wallet without trusting intermediaries
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()}>
              <Card className="h-full hover:shadow-lg transition-shadow p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Governed</h3>
                <p className="text-muted-foreground">
                  Participate in governance decisions and shape the future of the protocol through DAO voting
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trading CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn()}>
              <Activity className="h-16 w-16 mx-auto mb-6 text-primary" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              variants={fadeIn()}
            >
              Start Trading in Seconds
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn()}
            >
              Connect your wallet and start swapping tokens instantly. No registration required.
            </motion.p>

            <motion.div variants={fadeIn()}>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/trade" className="flex items-center">
                  Launch Trading App
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
