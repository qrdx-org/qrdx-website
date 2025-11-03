'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function About() {
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
              About QRDX
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              Building the future of quantum-resistant decentralized finance with cutting-edge technology and unwavering commitment to security.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-accent">
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
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <motion.div variants={fadeIn()}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We strive to build the most secure and efficient decentralized exchange platform, 
                  designed to withstand the challenges of both classical and quantum computing threats.
                </p>
                <p className="text-muted-foreground">
                  Our commitment extends beyond just creating another DeFi platform. We&apos;re building 
                  the infrastructure for a quantum-safe financial future, ensuring that digital assets 
                  remain secure as technology continues to evolve.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn(0.2)} className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <Target className="h-24 w-24 text-primary/40" />
                </div>
              </motion.div>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={fadeIn(0.1)}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Security First
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quantum-resistant cryptography and multi-layered security protocols 
                      ensure your assets are protected against future threats.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn(0.2)}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Community Driven
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Built by the community, for the community. Our governance model 
                      ensures every voice is heard in shaping the future of QRDX.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn(0.3)}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cutting-edge technology meets user-friendly design. We&apos;re pushing 
                      the boundaries of what&apos;s possible in decentralized finance.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn()}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Built with modern technologies and quantum-resistant protocols
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">React Framework</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Utility-First CSS</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">shadcn/ui</h3>
                <p className="text-sm text-muted-foreground">Component Library</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Framer Motion</h3>
                <p className="text-sm text-muted-foreground">Animation Library</p>
              </div>
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