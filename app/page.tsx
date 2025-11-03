'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Zap, ChevronRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

const slideIn = (direction) => ({
  initial: { 
    opacity: 0, 
    x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
})

export default function Home() {
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
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
              variants={fadeIn()}
            >
              The Future of Quantum-Resistant 
              <br />
              Decentralized Exchange
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              QRDX provides a secure, fast, and user-friendly platform for decentralized trading, 
              built to withstand both classical and quantum computing attacks.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={fadeIn(0.4)}
            >
              <Button size="lg" className="gap-2">
                Launch Exchange
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Read Whitepaper
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div 
          className="container px-4 mx-auto mt-20"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={slideIn("up")}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Total Value Locked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$127.5M</p>
                  <p className="text-sm text-muted-foreground">Across all pools</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={slideIn("up")}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Total Staked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">45.2M QRDX</p>
                  <p className="text-sm text-muted-foreground">By token holders</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={slideIn("up")}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    24h Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$12.8M</p>
                  <p className="text-sm text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Chain Comparison Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn()}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              QRDX Chain vs Traditional EVM Chain
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the next generation of blockchain technology with quantum-resistant security and enhanced performance.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* QRDX Chain Card */}
            <motion.div variants={slideIn("left")}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">QRDX Chain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quantum-Resistant Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Built with post-quantum cryptography to secure assets against future quantum computing threats
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">High Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      5,000+ transactions per second with sub-second finality
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Low Transaction Fees</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimized gas costs and efficient consensus mechanism
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Advanced Smart Contracts</h4>
                    <p className="text-sm text-muted-foreground">
                      Next-gen smart contract platform with enhanced security features
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Traditional EVM Chain Card */}
            <motion.div variants={slideIn("right")}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Traditional EVM Chain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Classical Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard cryptographic security vulnerable to quantum computing advances
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Limited Throughput</h4>
                    <p className="text-sm text-muted-foreground">
                      15-45 transactions per second with longer confirmation times
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Variable Gas Fees</h4>
                    <p className="text-sm text-muted-foreground">
                      Higher transaction costs during network congestion
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Traditional Smart Contracts</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard EVM smart contract functionality
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div variants={slideIn("left")}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Technical Excellence,
                  <br />
                  Documented in Detail
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Dive deep into QRDX&apos;s architecture, tokenomics, and quantum-resistant technology in our comprehensive whitepaper.
                </p>
                <div className="space-y-4">
                  {/* Key Highlights */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-primary/10 text-primary rounded-lg">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Post-Quantum Security</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed analysis of our quantum-resistant cryptographic protocols
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-primary/10 text-primary rounded-lg">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Performance Metrics</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive benchmarks and scalability analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-primary/10 text-primary rounded-lg">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Tokenomics</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed token distribution and economic model
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="lg" variant="outline" className="gap-2">
                    Download Whitepaper <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                variants={slideIn("right")}
                className="relative aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-24 w-24 text-primary/40" />
                </div>
              </motion.div>
            </div>
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