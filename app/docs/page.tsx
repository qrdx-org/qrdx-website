'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code, Blocks, Wallet, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

const docSections = [
  {
    icon: Blocks,
    title: 'Getting Started',
    description: 'Learn the basics of QRDX and start trading in minutes',
    items: ['Quick Start Guide', 'Create a Wallet', 'Fund Your Account', 'Make Your First Trade'],
  },
  {
    icon: Code,
    title: 'Developer Docs',
    description: 'Build on QRDX with our comprehensive API and SDK documentation',
    items: ['API Reference', 'Smart Contract SDK', 'Integration Guide', 'Code Examples'],
  },
  {
    icon: Wallet,
    title: 'User Guides',
    description: 'Step-by-step tutorials for all QRDX features',
    items: ['Trading Guide', 'Liquidity Provision', 'Staking & Rewards', 'Governance Voting'],
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Learn about QRDX security features and best practices',
    items: ['Quantum Resistance', 'Audit Reports', 'Security Best Practices', 'Bug Bounty'],
  },
]

export default function DocsPage() {
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
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Documentation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">QRDX Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about using and building on QRDX
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2" asChild>
              <a href="https://docs.qrdx.org/quickstart" target="_blank" rel="noopener noreferrer">
                <TrendingUp className="h-6 w-6" />
                <span>Quick Start</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2" asChild>
              <a href="https://docs.qrdx.org/api" target="_blank" rel="noopener noreferrer">
                <Code className="h-6 w-6" />
                <span>API Docs</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2" asChild>
              <a href="https://docs.qrdx.org/guides" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-6 w-6" />
                <span>Guides</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex flex-col gap-2" asChild>
              <a href="https://docs.qrdx.org/security" target="_blank" rel="noopener noreferrer">
                <Shield className="h-6 w-6" />
                <span>Security</span>
              </a>
            </Button>
          </motion.div>

          {/* Documentation Sections */}
          <motion.div 
            variants={fadeIn(0.2)}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {docSections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={index} className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                        <p className="text-muted-foreground text-sm">{section.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx}>
                          <a 
                            href={`https://docs.qrdx.org/${section.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                          >
                            <span className="text-primary">→</span>
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>

          {/* Popular Articles */}
          <motion.div variants={fadeIn(0.3)} className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
            <Card className="border-primary/20">
              <CardContent className="p-0 divide-y">
                {[
                  { title: 'How to Connect Your Wallet', category: 'Getting Started', readTime: '3 min' },
                  { title: 'Understanding Liquidity Pools', category: 'User Guides', readTime: '8 min' },
                  { title: 'Integrating QRDX API', category: 'Developers', readTime: '15 min' },
                  { title: 'Post-Quantum Cryptography Explained', category: 'Security', readTime: '12 min' },
                  { title: 'Maximizing Staking Rewards', category: 'User Guides', readTime: '6 min' },
                ].map((article, idx) => (
                  <a 
                    key={idx}
                    href={`https://docs.qrdx.org/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{article.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime} read</span>
                        </div>
                      </div>
                      <div className="text-primary">→</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Need Help */}
          <motion.div variants={fadeIn(0.4)} className="mt-12 text-center">
            <Card className="border-primary/20 bg-primary/5 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Our community and support team are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="https://docs.qrdx.org/help" target="_blank" rel="noopener noreferrer">Help Center</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://docs.qrdx.org/discord" target="_blank" rel="noopener noreferrer">Join Discord</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
