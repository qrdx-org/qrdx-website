'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Shield, Lock, Zap, Users, Layers, ArrowRightLeft, Database, Network, Book, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } }
})

export default function WhitepaperPage() {
  const [markdownContent, setMarkdownContent] = useState('')
  const [showFullContent, setShowFullContent] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // Fetch the markdown content
    fetch('/QRDX-Whitepaper-v3.2.md')
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text))
      .catch((err) => console.error('Failed to load whitepaper:', err))
  }, [])

  useEffect(() => {
    // Track active section on scroll
    const handleScroll = () => {
      const headings = document.querySelectorAll('.markdown-content h2[id]')
      let current = ''
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 150) {
          current = heading.id
        }
      })
      
      setActiveSection(current)
    }

    if (showFullContent) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [showFullContent])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }
  const tocSections = [
    { id: '1-introduction', title: 'Introduction', description: 'QRDX solution and key innovations' },
    { id: '2-the-quantum-threat', title: 'The Quantum Threat', description: 'Shor\'s and Grover\'s algorithms impact on blockchain' },
    { id: '3-qrdx-chain-architecture', title: 'QRDX Chain Architecture', description: 'Layer-1 blockchain with QEVM and QR-PoS consensus' },
    { id: '4-post-quantum-cryptography-implementation', title: 'Post-Quantum Cryptography', description: 'CRYSTALS-Dilithium & Kyber implementation' },
    { id: '5-qrdx-protocol-quantum-resistant-amm', title: 'QRDX Protocol: Quantum-Resistant AMM', description: 'Uniswap v3/v4-based concentrated liquidity DEX' },
    { id: '6-asset-shielding-mechanism', title: 'Asset Shielding Mechanism', description: 'Convert ETH → qETH and cross-chain migration' },
    { id: '7-qrc20-token-standard', title: 'qRC20 Token Standard', description: 'Quantum-resistant ERC-20 compatible standard' },
    { id: '8-cross-chain-bridge-infrastructure', title: 'Cross-Chain Bridge Infrastructure', description: 'Trustless bridges for Ethereum, Bitcoin, and more' },
    { id: '9-consensus-mechanism', title: 'Consensus Mechanism', description: 'Quantum-Resistant Proof-of-Stake (QR-PoS)' },
    { id: '10-tokenomics', title: 'Tokenomics', description: '100M fixed supply with deflationary mechanics' },
    { id: '11-governance-model', title: 'Governance Model', description: 'On-chain voting and decentralized decision-making' },
    { id: '12-security-analysis', title: 'Security Analysis', description: 'Threat model and cryptographic guarantees' },
    { id: '13-performance-benchmarks', title: 'Performance Benchmarks', description: '5,000+ TPS with sub-second finality' },
    { id: '14-roadmap', title: 'Roadmap', description: 'Development phases from testnet to mainnet' },
  ]

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">QRDX Protocol Whitepaper</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Quantum-Resistant DEX & Asset Shielding Protocol built on Uniswap v3/v4 architecture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => setShowFullContent(!showFullContent)}
              >
                <Book className="h-5 w-5" />
                {showFullContent ? 'Hide Full Content' : 'Read Full Whitepaper'}
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2" asChild>
                <a href="/QRDX-Whitepaper-v3.2.pdf" download>
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2" asChild>
                <a href="/QRDX-Whitepaper-v3.2.md" download>
                  <FileText className="h-5 w-5" />
                  Download Markdown
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeIn(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">v3.2</div>
                <div className="text-sm text-muted-foreground">Current Version</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">21 Pages</div>
                <div className="text-sm text-muted-foreground">Technical Details</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">Feb 2026</div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">5K+ TPS</div>
                <div className="text-sm text-muted-foreground">Throughput</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Table of Contents */}
          <motion.div variants={fadeIn(0.2)} className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
                <div className="space-y-4">
                  {tocSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setShowFullContent(true)
                        setTimeout(() => scrollToSection(section.id), 100)
                      }}
                      className={`w-full flex gap-4 p-4 rounded-lg transition-all text-left ${
                        activeSection === section.id && showFullContent
                          ? 'bg-primary/10 border border-primary/30'
                          : 'hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1 flex items-center gap-2">
                          {section.title}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </h3>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Highlights */}
          <motion.div variants={fadeIn(0.3)}>
            <h2 className="text-3xl font-bold mb-6 text-center">Key Innovations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Post-Quantum Security</h3>
                  <p className="text-muted-foreground">
                    CRYSTALS-Dilithium signatures and CRYSTALS-Kyber key encapsulation provide NIST Level 3 security against quantum attacks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">QRDX Chain (Layer-1)</h3>
                  <p className="text-muted-foreground">
                    Purpose-built blockchain with QEVM (Quantum-resistant EVM) and QR-PoS consensus achieving 5,000+ TPS.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Concentrated Liquidity</h3>
                  <p className="text-muted-foreground">
                    Based on Uniswap v3/v4 architecture with capital-efficient market making and custom price ranges for LPs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ArrowRightLeft className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Asset Shielding</h3>
                  <p className="text-muted-foreground">
                    Native conversion of classical assets (ETH, BTC, USDC) to quantum-resistant equivalents (qETH, qBTC, qUSDC).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Cross-Chain Bridges</h3>
                  <p className="text-muted-foreground">
                    Trustless bridge infrastructure with multi-validator consensus and fraud proof mechanisms for secure transfers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">qRC20 Standard</h3>
                  <p className="text-muted-foreground">
                    Quantum-resistant token standard compatible with ERC-20 tooling while enforcing post-quantum cryptography.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Abstract */}
          <motion.div variants={fadeIn(0.4)} className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Abstract</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The emergence of quantum computing threatens the cryptographic foundations of blockchain technology. QRDX addresses this existential challenge by introducing the first quantum-resistant decentralized exchange protocol with native asset shielding capabilities. Built on Uniswap v3 and v4 architecture principles and secured by NIST-standardized post-quantum cryptographic algorithms, QRDX enables users to shield traditional assets (e.g., ETH → qETH) into quantum-resistant equivalents while maintaining the efficiency and capital utilization of modern automated market makers (AMMs).
                  </p>
                  <p>
                    QRDX Chain serves as the foundational Layer-1 blockchain implementing post-quantum security primitives, enabling cross-chain asset migration, decentralized trading, and long-term cryptographic security. The protocol combines CRYSTALS-Dilithium for digital signatures and CRYSTALS-Kyber for key encapsulation, providing NIST Level 3 security guarantees while maintaining performance comparable to traditional blockchain systems.
                  </p>
                  <p>
                    Through innovative Quantum-Resistant Proof-of-Stake (QR-PoS) consensus and optimized implementations of post-quantum algorithms, QRDX achieves transaction throughput exceeding 5,000 TPS with sub-second finality. The protocol supports concentrated liquidity market making, cross-chain asset bridges, and the qRC20 token standard—a quantum-resistant equivalent of ERC-20.
                  </p>
                  <p>
                    This whitepaper presents the technical architecture, economic model, and security guarantees of the QRDX ecosystem, demonstrating how quantum-resistant cryptography can be practically integrated into high-performance DeFi protocols without sacrificing user experience or capital efficiency.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Protocol Features */}
          <motion.div variants={fadeIn(0.5)} className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Asset Shielding Example</h2>
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6 border border-primary/10">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <ArrowRightLeft className="h-5 w-5 text-primary" />
                      Converting ETH to qETH
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                        <p>User locks ETH in the QRDX Bridge contract on Ethereum</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                        <p>Bridge validators verify the lock transaction with quantum-resistant signatures</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                        <p>qETH tokens are minted 1:1 on QRDX Chain to the user's quantum-resistant address</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                        <p>User can now trade qETH on QRDX Protocol with full quantum-resistant security</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">1:1</div>
                      <div className="text-sm text-muted-foreground">Asset Backing Ratio</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">0.1%</div>
                      <div className="text-sm text-muted-foreground">Bridge Fee</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">7 Days</div>
                      <div className="text-sm text-muted-foreground">Unshielding Period</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Specifications */}
          <motion.div variants={fadeIn(0.6)} className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3 text-primary">Blockchain Layer</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Consensus:</strong> Quantum-Resistant Proof-of-Stake (QR-PoS)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Block Time:</strong> 2 seconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Finality:</strong> Sub-second (single slot)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Throughput:</strong> 5,000+ TPS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>VM:</strong> QEVM (Quantum-resistant EVM)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-primary">Cryptography</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Signatures:</strong> CRYSTALS-Dilithium (FIPS 204)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Key Encapsulation:</strong> CRYSTALS-Kyber (FIPS 203)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Hash Functions:</strong> BLAKE3 (512-bit), SHA3-512</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Security Level:</strong> NIST Level 3 (AES-192 equivalent)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-primary">AMM Protocol</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Architecture:</strong> Uniswap v3/v4 based</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Liquidity:</strong> Concentrated liquidity (custom ranges)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Design:</strong> Singleton architecture (single contract)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Extensions:</strong> Hooks system for custom logic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Fee Tiers:</strong> 0.01%, 0.05%, 0.30%, 1.00%</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-primary">Token Economics</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Total Supply:</strong> 100,000,000 QRDX (fixed)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Staking APY:</strong> 5-12% (dynamic)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Min Validator Stake:</strong> 100,000 QRDX</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Deflationary:</strong> Fee burns + buybacks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Markdown Content */}
          {showFullContent && markdownContent && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto mt-12"
            >
              <Card className="border-primary/20">
                <CardContent className="p-8 md:p-12">
                  <div className="markdown-content prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 max-w-none
                    prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:text-foreground
                    prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-foreground prose-h2:border-b prose-h2:border-border prose-h2:pb-3
                    prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-foreground
                    prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-7 prose-p:mb-4
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:text-foreground
                    prose-ul:my-4 prose-ul:text-muted-foreground
                    prose-ol:my-4 prose-ol:text-muted-foreground
                    prose-li:my-2
                    prose-table:text-sm prose-table:border-collapse
                    prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-foreground
                    prose-td:border prose-td:border-border prose-td:p-2 prose-td:text-muted-foreground
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                    prose-hr:border-border
                  ">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[
                        rehypeRaw,
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                      ]}
                    >
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}
