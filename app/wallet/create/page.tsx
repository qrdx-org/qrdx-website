'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Shield, Key, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function CreateWallet() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div 
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
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Wallet Creation</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              variants={fadeIn()}
            >
              Create Your Quantum-Resistant Wallet
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              variants={fadeIn()}
            >
              Set up your secure QRDX wallet to store and manage quantum-safe assets.
            </motion.p>

            <motion.div variants={fadeIn()}>
              <Alert className="mb-8 bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-500">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Coming Soon:</strong> Wallet creation functionality is currently under development. Check back soon!
                </AlertDescription>
              </Alert>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-6 mb-8"
              variants={fadeIn()}
            >
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Quantum-Safe</CardTitle>
                  <CardDescription>
                    Protected by post-quantum cryptography algorithms
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Key className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Your Keys</CardTitle>
                  <CardDescription>
                    Non-custodial wallet - you control your private keys
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Wallet className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Multi-Asset</CardTitle>
                  <CardDescription>
                    Support for all qRC20 tokens and quantum-safe assets
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn()} className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/get-started">Back to Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://docs.qrdx.org/wallet/create" target="_blank" rel="noopener noreferrer">
                  View Documentation
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
