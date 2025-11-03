# QRDX Website - Quantum Resistant Decentralized eXchange# QRDX Website



A professional, fully-functional DeFi exchange website built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.A modern, production-ready React application with routing, built using esbuild for lightning-fast builds.



## Overview## 🚀 Features



QRDX.org is the world's first quantum-resistant decentralized exchange. This repository contains the marketing website and frontend interface. The trading backend and QRDX blockchain are on separate subdomains.- **React 19** - Latest version with modern React features

- **React Router DOM** - Client-side routing

## Features- **esbuild** - Ultra-fast bundler for development and production

- **Professional Structure** - Organized directory structure for scalability

### Core Functionality- **Hot Reload** - Live reload during development

- ✅ **Light/Dark Mode** - Full theme support with system preference detection- **Production Ready** - Optimized build for production deployment

- ✅ **Responsive Design** - Mobile-first approach with desktop optimization

- ✅ **Animated UI** - Smooth Framer Motion animations throughout## 📁 Project Structure

- ✅ **Professional Design** - Uniswap-inspired layout with custom QRDX branding

```

### Pagesqrdx-website/

├── public/              # Static files

1. **Homepage** (`/`)│   └── index.html       # HTML template

   - Hero section with animated statistics├── scripts/             # Build and development scripts

   - Key metrics: TVL ($2.4B), 24h Volume ($847M), Active Users (156K+), Liquidity Pools (2,847+)│   ├── dev-server.js    # Development server with hot reload

   - Features grid highlighting quantum-resistance, speed, low fees│   ├── build.js         # Production build script

   - Call-to-action sections│   └── README.md        # Scripts documentation

   - Comprehensive footer with links├── src/

│   ├── components/      # Reusable React components

2. **Trade** (`/trade`)│   │   ├── Layout/      # Layout wrapper component

   - Professional token swap interface│   │   ├── Navigation/  # Navigation component

   - Real-time rate calculations (stub)│   │   └── index.js     # Component exports

   - Connect wallet functionality (frontend only)│   ├── pages/           # Page components

   - Transaction details and fee breakdown│   │   ├── Home.jsx     # Home page

│   │   ├── About.jsx    # About page

3. **Pools** (`/pools`)│   │   ├── Contact.jsx  # Contact page

   - Liquidity pools table with TVL, APR, and 24h volume│   │   ├── Pages.css    # Page styles

   - Stats overview dashboard│   │   └── index.js     # Page exports

   - Add liquidity functionality│   ├── styles/          # Global styles and CSS variables

   - Educational information about LPs│   │   ├── index.css    # Global styles

│   │   └── variables.css # CSS custom properties

4. **Stake** (`/stake`)│   ├── utils/           # Utility functions

   - Multiple staking options (Flexible, 30-day, 90-day)│   │   └── index.js     # Helper functions

   - Staking position dashboard│   ├── hooks/           # Custom React hooks

   - Rewards calculator│   │   └── index.js     # Custom hooks

   - Benefits and governance info│   ├── constants/       # Application constants

│   │   └── index.js     # Constants and config

5. **Whitepaper** (`/whitepaper`)│   ├── App.jsx          # Root application component

   - Comprehensive technical documentation│   └── index.jsx        # Application entry point

   - Table of contents├── .env.example         # Environment variables template

   - Key highlights with quantum-resistance details├── .gitignore          # Git ignore rules

   - Downloadable PDF (stub)├── package.json        # Dependencies and scripts

└── README.md           # Project documentation

6. **Docs** (`/docs`)```

   - Documentation hub

   - Quick links to guides## 🛠️ Getting Started

   - Popular articles

   - Help center integration### Prerequisites



### API Endpoints (Stub Data)- Node.js (v16 or higher)

- pnpm (v6 or higher)

- `GET /api/stats` - Platform statistics

- `GET /api/pools` - Liquidity pool data### Installation

- `GET /api/tokens` - Token information

```bash

## Tech Stack# Install dependencies

pnpm install

- **Framework**: Next.js 16.0.1 (App Router)```

- **Runtime**: Bun (with `--bun` flag)

- **Language**: TypeScript 5.7.2### Development

- **Styling**: Tailwind CSS 4.1.16

- **UI Components**: shadcn/ui (Radix UI)```bash

- **Animations**: Framer Motion 12.23.24# Start development server

- **Icons**: Lucide React 0.552.0pnpm dev

- **Theme**: next-themes 0.4.6

- **Package Manager**: pnpm 10.6.4# Server will start at http://localhost:3000

```

## Getting Started

### Production Build

### Prerequisites

```bash

- Node.js 18+ or Bun# Create optimized production build

- pnpm 10+pnpm build



### Installation# Output will be in the dist/ directory

```

```bash

# Clone the repository## 📜 Available Scripts

git clone https://github.com/yourusername/qrdx-website.git

cd qrdx-website- `pnpm dev` - Start development server with hot reload

- `pnpm build` - Build for production

# Install dependencies- `pnpm start` - Alias for dev command

pnpm install- `pnpm clean` - Remove dist and node_modules directories



# Start development server## 🎨 Styling

pnpm dev

```The project uses CSS with CSS custom properties (variables) for consistent theming:



The site will be available at `http://localhost:3000`- **Global styles**: `src/styles/index.css`

- **CSS variables**: `src/styles/variables.css`

### Build for Production- **Component styles**: Co-located with components



```bash## 🏗️ Architecture

# Build the application

pnpm build### Components



# Start production serverReusable UI components are located in `src/components/`. Each component has its own directory with:

pnpm start- Component file (`.jsx`)

```- Styles (`.css`)

- Tests (when applicable)

## Project Structure

### Pages

```

qrdx-website/Page components in `src/pages/` represent different routes in the application.

├── app/

│   ├── api/              # API routes (stub endpoints)### Utilities

│   │   ├── stats/

│   │   ├── pools/Helper functions and utilities in `src/utils/` for common operations.

│   │   └── tokens/

│   ├── trade/            # Trading interface### Hooks

│   ├── pools/            # Liquidity pools

│   ├── stake/            # Staking pageCustom React hooks in `src/hooks/` for reusable stateful logic.

│   ├── whitepaper/       # Whitepaper page

│   ├── docs/             # Documentation### Constants

│   ├── layout.tsx        # Root layout with theme provider

│   ├── page.tsx          # HomepageApplication-wide constants and configuration in `src/constants/`.

│   └── globals.css       # Global styles

├── components/## 🚀 Deployment

│   ├── Navigation.tsx    # Main navigation component

│   ├── theme-provider.tsx # Theme provider wrapperAfter running `pnpm build`, deploy the contents of the `dist/` directory to your hosting provider:

│   ├── theme-toggle.tsx  # Light/dark mode toggle

│   └── ui/               # shadcn/ui components- Vercel

├── lib/- Netlify

│   └── utils.ts          # Utility functions- AWS S3 + CloudFront

└── public/- GitHub Pages

    └── logo.png          # QRDX logo- Any static hosting service

```

## 📝 Environment Variables

## Stub Functionality

Copy `.env.example` to `.env.local` and update with your values:

The following features are frontend-only with stub backends:

```bash

- Wallet connection (button only, no actual connection)cp .env.example .env.local

- Token swaps (calculations shown, no actual swaps)```

- Liquidity provision (UI only)

- Staking (interface only, no actual staking)## 🤝 Contributing

- API endpoints (return mock data)

1. Create a feature branch

## Development2. Make your changes

3. Submit a pull request

**Dev server is currently running at http://localhost:3000**

## 📄 License

Access it in your browser or use the Simple Browser in VS Code.

ISC

## License

## 🔧 Built With

MIT License

- [React](https://react.dev/) - UI library

---- [React Router](https://reactrouter.com/) - Routing

- [esbuild](https://esbuild.github.io/) - Bundler

**Built for the quantum-resistant future of DeFi**- [pnpm](https://pnpm.io/) - Package manager


https://qrdx.org/

Securing assets in a post quantum world