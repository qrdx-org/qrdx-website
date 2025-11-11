'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, CreditCard, Shield, ExternalLink, ArrowRight, Book } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

const steps = [
  {
    icon: Wallet,
    title: 'Create Wallet',
    description: 'Set up your quantum-resistant wallet to securely store and manage your assets on QRDX.',
    buttonText: 'Create Wallet',
    buttonLink: '/wallet/create',
    docsLink: 'https://docs.qrdx.org/wallet/create',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Start Trading',
    description: 'Begin trading quantum-resistant tokens with low fees and lightning-fast transactions.',
    buttonText: 'Start Trading',
    buttonLink: '/trade',
    docsLink: 'https://docs.qrdx.org/trading/getting-started',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: CreditCard,
    title: 'Fund Your Account',
    description: 'Deposit assets into your QRDX wallet through bridge transfers or direct purchases.',
    buttonText: 'Fund Account',
    buttonLink: '/wallet/funding',
    docsLink: 'https://docs.qrdx.org/trading/funding',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Shield Your Assets',
    description: 'Convert your traditional crypto into quantum-resistant tokens for future-proof security.',
    buttonText: 'Shield Assets',
    buttonLink: '/wallet/shielding',
    docsLink: 'https://docs.qrdx.org/wallet/shielding',
    color: 'from-orange-500 to-red-500'
  }
]

export default function GetStarted() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
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
              <Book className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Getting Started Guide</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
              variants={fadeIn()}
            >
              Start Your{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Quantum-Safe Journey
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn()}
            >
              Follow these simple steps to begin using QRDX and protect your assets for the quantum era.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeIn()}>
                <Card className="h-full hover:shadow-xl transition-all border-primary/20 group">
                  <CardHeader>
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-muted-foreground mb-2">
                          STEP {index + 1}
                        </div>
                        <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full text-lg" 
                      asChild
                    >
                      <Link href={step.buttonLink} className="flex items-center justify-center">
                        {step.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    
                    <div className="pt-2 border-t">
                      <a 
                        href={step.docsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Book className="h-4 w-4" />
                        View Documentation
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Resources Section */}
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              variants={fadeIn()}
            >
              Need More Help?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn()}
            >
              Check out our comprehensive documentation or reach out to our support team.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn()}
            >
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="https://docs.qrdx.org" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Book className="mr-2 h-5 w-5" />
                  Full Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/contact" className="flex items-center">
                  Get Support
                  <ArrowRight className="ml-2 h-5 w-5" />
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
