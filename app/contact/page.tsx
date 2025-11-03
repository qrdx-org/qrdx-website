'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Navigation from '@/components/Navigation'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function Contact() {
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
              Contact Us
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeIn(0.2)}
            >
              Get in touch with our team. We&apos;re here to help and answer any questions you might have.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn()}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                      />
                    </div>
                    <Button className="w-full gap-2">
                      Send Message
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn(0.2)}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Whether you have questions about our platform, need technical support, 
                  or want to explore partnership opportunities, we&apos;re here to help.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-muted-foreground">support@qrdx.io</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Community</h3>
                        <p className="text-sm text-muted-foreground">Join our Discord community</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-accent rounded-lg">
                <h3 className="font-medium mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </motion.div>
          </div>
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