# QRDX Protocol Whitepaper

This directory contains the official QRDX Protocol whitepaper and related documentation.

## Documents

### Main Whitepaper
- **File**: `QRDX-Whitepaper-v2.0.md`
- **Version**: 2.0
- **Last Updated**: November 3, 2025
- **Format**: Markdown (76 pages)

### Content Overview

The whitepaper provides comprehensive documentation of the QRDX ecosystem, including:

1. **QRDX Chain**: Layer-1 blockchain with quantum-resistant cryptography
2. **QRDX Protocol**: AMM based on Uniswap v3/v4 architecture
3. **Asset Shielding**: Convert ETH → qETH, BTC → qBTC, etc.
4. **qRC20 Standard**: Quantum-resistant token standard
5. **Cross-Chain Bridges**: Trustless asset migration
6. **Tokenomics**: 100M fixed supply with deflationary mechanics
7. **Governance**: On-chain voting and community participation
8. **Security**: Post-quantum cryptography implementation
9. **Performance**: 5,000+ TPS benchmarks
10. **Roadmap**: Development phases and milestones

## Download

### Online Access
- Website: https://qrdx.org/whitepaper
- Direct Download: https://qrdx.org/QRDX-Whitepaper-v2.0.md

### Local Development
The whitepaper is located at:
```
/workspaces/qrdx-website/public/QRDX-Whitepaper-v2.0.md
```

Access via the website at `/QRDX-Whitepaper-v2.0.md` or through the whitepaper page.

## Generating PDF

To generate a PDF version of the whitepaper:

```bash
# Using pandoc (recommended)
pnpm add -D pandoc

# Generate PDF with table of contents
pandoc public/QRDX-Whitepaper-v2.0.md \
  -o public/QRDX-Whitepaper-v2.0.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=2 \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article
```

Alternative methods:
- Use online Markdown to PDF converters
- Use VS Code extensions (e.g., Markdown PDF)
- Use browser print-to-PDF on the rendered website

## Technical Specifications

### Post-Quantum Cryptography
- **Digital Signatures**: CRYSTALS-Dilithium (FIPS 204)
- **Key Encapsulation**: CRYSTALS-Kyber (FIPS 203)
- **Hash Functions**: BLAKE3 (512-bit), SHA3-512
- **Security Level**: NIST Level 3 (AES-192 equivalent)

### Blockchain Performance
- **Throughput**: 5,000+ TPS
- **Block Time**: 2 seconds
- **Finality**: Sub-second (single slot)
- **Consensus**: Quantum-Resistant Proof-of-Stake (QR-PoS)

### AMM Features
- Concentrated liquidity (Uniswap v3 style)
- Singleton architecture (Uniswap v4 style)
- Hooks system for extensibility
- Multiple fee tiers (0.01% - 1.00%)

## Supported Assets

### Native Tokens
- **QRDX**: Native governance and utility token
- **qETH**: Quantum-resistant Ether (1:1 with ETH)
- **qBTC**: Quantum-resistant Bitcoin (1:1 with WBTC)
- **qUSDC**: Quantum-resistant USD Coin (1:1 with USDC)
- **qUSDT**: Quantum-resistant Tether (1:1 with USDT)

### Token Standard
All shielded assets follow the qRC20 standard, which is:
- Compatible with ERC-20 tooling
- Enforces quantum-resistant signatures
- Includes native bridge metadata
- Supports cross-chain provenance tracking

## Citations

When citing this whitepaper, please use:

```
QRDX Foundation Research Team. (2025). QRDX Protocol Whitepaper v2.0: 
Quantum-Resistant Decentralized Exchange & Asset Shielding Protocol. 
Retrieved from https://qrdx.org/whitepaper
```

## License

This whitepaper is licensed under:
**CC BY-NC-ND 4.0** (Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International)

You are free to:
- Share: Copy and redistribute the material in any medium or format

Under the following terms:
- Attribution: You must give appropriate credit
- NonCommercial: You may not use the material for commercial purposes
- NoDerivatives: If you remix, transform, or build upon the material, you may not distribute the modified material

## Contact

- **Website**: https://qrdx.org
- **Documentation**: https://docs.qrdx.org
- **Email**: research@qrdx.org
- **GitHub**: https://github.com/qrdx-org
- **Discord**: https://discord.gg/qrdx
- **Twitter**: https://twitter.com/qrdx_official

## Version History

### v2.0 (November 3, 2025)
- Complete rewrite with QRDX Chain architecture
- Added asset shielding mechanism (ETH → qETH)
- Integrated Uniswap v3/v4 AMM design
- Added qRC20 token standard specification
- Expanded cross-chain bridge documentation
- Updated tokenomics and governance model
- Added comprehensive security analysis
- Performance benchmarks with 5,000+ TPS

### v1.2 (Q4 2024)
- Initial public release
- Basic QRDX protocol overview
- Post-quantum cryptography introduction
- Preliminary tokenomics

## Disclaimer

This whitepaper is for informational purposes only and does not constitute investment advice, financial advice, trading advice, or any other sort of advice. QRDX does not guarantee the accuracy or completeness of the information provided. The protocol is under active development and specifications may change.

For the latest updates and announcements, visit https://qrdx.org
