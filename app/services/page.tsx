'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Lock, Globe } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
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
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeIn()}
            >
              Our Services
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              Comprehensive quantum-resistant DeFi solutions designed for the future of finance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div variants={fadeIn()}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Quantum-Resistant Trading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trade with confidence using our quantum-resistant protocols that protect against future cryptographic threats.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn(0.1)}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    High-Speed Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experience lightning-fast transactions with our optimized blockchain infrastructure and advanced consensus mechanisms.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn(0.2)}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-6 w-6 text-primary" />
                    Secure Staking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn rewards through our secure staking platform with industry-leading security measures and transparent APY calculations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn(0.3)}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    Cross-Chain Bridge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Seamlessly transfer assets across different blockchain networks with our secure and efficient cross-chain bridge.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn(0.4)}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Liquidity Pools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provide liquidity and earn fees through our optimized automated market maker (AMM) with dynamic pricing algorithms.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn(0.5)}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Yield Farming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Maximize your returns through our innovative yield farming opportunities with carefully curated DeFi protocols.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} QRDX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}