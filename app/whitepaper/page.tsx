'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Shield, Lock, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function WhitepaperPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Technical Documentation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">QRDX Whitepaper</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A comprehensive guide to the world's first quantum-resistant decentralized exchange
            </p>
            <Button size="lg" className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download PDF (v1.2)
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeIn(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">v1.2</div>
                <div className="text-sm text-muted-foreground">Current Version</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">48 Pages</div>
                <div className="text-sm text-muted-foreground">Technical Details</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">Q4 2024</div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Table of Contents */}
          <motion.div variants={fadeIn(0.2)} className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
                <div className="space-y-4">
                  {[
                    { number: '1', title: 'Executive Summary', description: 'Overview of QRDX and the quantum threat' },
                    { number: '2', title: 'The Quantum Computing Threat', description: 'How quantum computers threaten current cryptography' },
                    { number: '3', title: 'Post-Quantum Cryptography', description: 'NIST-approved algorithms and implementation' },
                    { number: '4', title: 'QRDX Architecture', description: 'Technical design and blockchain infrastructure' },
                    { number: '5', title: 'Tokenomics', description: 'QRDX token distribution, utility, and economics' },
                    { number: '6', title: 'Governance Model', description: 'Decentralized decision-making and voting' },
                    { number: '7', title: 'Security Audits', description: 'Third-party security reviews and certifications' },
                    { number: '8', title: 'Roadmap', description: 'Development milestones and future plans' },
                  ].map((section) => (
                    <div key={section.number} className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {section.number}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Highlights */}
          <motion.div variants={fadeIn(0.3)}>
            <h2 className="text-3xl font-bold mb-6 text-center">Key Highlights</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quantum-Resistant Security</h3>
                  <p className="text-muted-foreground">
                    QRDX implements CRYSTALS-Dilithium for digital signatures and CRYSTALS-Kyber for key encapsulation, both NIST-approved post-quantum algorithms that resist attacks from both classical and quantum computers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">High Performance</h3>
                  <p className="text-muted-foreground">
                    Our custom consensus mechanism achieves 5,000+ transactions per second with sub-second finality, making QRDX one of the fastest quantum-resistant blockchains available.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sustainable Tokenomics</h3>
                  <p className="text-muted-foreground">
                    Fixed supply of 100 million QRDX tokens with deflationary mechanics through transaction fee burns and strategic token distribution to ensure long-term value accrual.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Community Governance</h3>
                  <p className="text-muted-foreground">
                    QRDX token holders participate in protocol decisions through on-chain voting, including parameter adjustments, treasury management, and protocol upgrades.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Abstract */}
          <motion.div variants={fadeIn(0.4)} className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Abstract</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The advent of quantum computing poses an existential threat to current blockchain infrastructure, particularly the elliptic curve cryptography (ECC) that secures most digital assets today. QRDX addresses this challenge by implementing a quantum-resistant decentralized exchange built on post-quantum cryptographic primitives.
                  </p>
                  <p>
                    This whitepaper introduces QRDX, a high-performance decentralized exchange (DEX) that leverages NIST-standardized post-quantum algorithms to protect user assets against both current and future cryptographic attacks. Our protocol combines quantum-resistant security with the efficiency and user experience expected from modern DeFi platforms.
                  </p>
                  <p>
                    QRDX utilizes CRYSTALS-Dilithium for digital signatures and CRYSTALS-Kyber for key encapsulation, providing long-term security guarantees while maintaining performance comparable to traditional blockchain systems. The protocol supports automated market making (AMM), liquidity provision, and yield farming, all secured by quantum-resistant cryptography.
                  </p>
                  <p>
                    Through innovative consensus mechanisms and optimized implementations of post-quantum algorithms, QRDX achieves transaction throughput exceeding 5,000 TPS with sub-second finality, making it practical for real-world DeFi applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
