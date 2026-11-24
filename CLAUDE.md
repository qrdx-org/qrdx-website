# QRDX Website - Project Context for Claude AI

## Project Overview
QRDX is a modern Next.js website focused on quantum-resistant digital solutions and cryptography. The project uses the Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui components for a professional, production-ready web application.

## Tech Stack

### Core Technologies
- **Framework**: Next.js 16.0.1 (App Router)
- **Runtime**: Bun (with `--bun` flag for faster performance)
- **React**: 19.2.0
- **TypeScript**: 5.7.2
- **Styling**: Tailwind CSS 4.1.16 with CSS Variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: CSS (keyframes and scroll-driven `animation-timeline`); Framer Motion 12.23.24 is installed
- **WebGPU graphics**: vgpu 0.6.0 with `@vgpu/wgsl` (WGSL shaders imported as modules; loader rule in `next.config.mjs`, types in `wgsl-env.d.ts`)
- **Icons**: Lucide React 0.552.0

### Package Manager
**CRITICAL**: This project uses **pnpm** (v10.6.4) exclusively. Never use npm commands.

### Build Configuration
- **Development**: Uses Turbopack (`next dev --turbopack`)
- **Production**: Can export as static site (`output: 'export'`)
- **Optimizations**:
  - Package import optimization for lucide-react
  - Server Components HMR cache enabled
  - Worker threads for parallel compilation (can be disabled via `DISABLE_WORKERS=true`)
  - Optional source maps (`NEXT_PUBLIC_SOURCE_MAPS=true`)

## Project Structure

```
qrdx-website/
├── .github/
│   ├── instructions/           # AI Assistant Instructions (IMPORTANT!)
│   │   ├── no retard.instructions.md    # Code quality standards
│   │   ├── use pnpm.instructions.md     # Package manager rules
│   │   └── use shadcn.instructions.md   # Component generation rules
│   └── dependabot.yml
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout: Geist, Geist Mono, Instrument Serif
│   ├── page.tsx                # Home page (live blocks, validator key, markets)
│   ├── globals.css             # Tailwind + CSS custom properties
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── services/page.tsx       # Services page
│   └── api/                    # API routes
├── components/
│   ├── Navigation.tsx          # Main navigation (desktop + mobile)
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx/.jsx
│       ├── card.tsx/.jsx
│       ├── dialog.tsx/.jsx
│       ├── hover-card.tsx/.jsx
│       ├── input.tsx/.jsx
│       ├── navigation-menu.tsx/.jsx
│       ├── scroll-area.tsx/.jsx
│       ├── sheet.tsx/.jsx
│       ├── textarea.tsx/.jsx
│       └── index.js            # Component re-exports
├── lib/
│   └── utils.ts                # cn() utility for class merging (clsx + twMerge)
├── public/
│   └── logo.png
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.js
├── package.json
└── pnpm-lock.yaml
```

## Key Configuration Files

### components.json (shadcn/ui)
```json
{
  "style": "default",
  "rsc": true,              // React Server Components enabled
  "tsx": true,              // TypeScript
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true    // Using CSS variables for theming
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### tsconfig.json
- Target: ES2017
- Module: ESNext with bundler resolution
- JSX: react-jsx (automatic runtime)
- Path alias: `@/*` maps to project root
- Strict mode enabled

### Tailwind Configuration
- Dark mode: class-based (`class` strategy)
- CSS Variables for all theme colors
- Custom animations: accordion-down, accordion-up
- Container: centered, 2rem padding, max-width 1400px
- Plugins: @tailwindcss/typography

## Important Rules & Guidelines

### 1. Package Management
**NEVER use npm or yarn**. Always use:
```bash
pnpm install <package>
pnpm add <package>
pnpm remove <package>
pnpm dev
```

Use `npx` only when specifically needed for one-off CLI commands.

### 2. Component Generation (shadcn/ui)
**NEVER manually create shadcn components**. Always use the CLI:
```bash
pnpm dlx shadcn-ui@latest add <component-name>
```

Example:
```bash
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
```

### 3. Code Quality Standards
From `.github/instructions/no retard.instructions.md`:
- No stub functionality or placeholder code
- No emoji in responses
- Be direct and concise
- No filler phrases ("I'm sorry", "As an AI")
- No hedging language ("It seems", "Maybe", "Possibly")
- No weasel words ("Up to", "Approximately")
- Use active voice over passive
- Clear, direct, and concise communication

### 4. Styling Approach
- Use Tailwind CSS utility classes
- Leverage CSS custom properties (variables) defined in `globals.css`
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Dark mode support via `.dark` class (class-based strategy)

### 5. Component Patterns
- Client components: Use `'use client'` directive when needed
- Animations: CSS only; see "Layout and the look"
- Navigation: Responsive design with desktop/mobile versions
- Icons: Lucide React (optimized via Next.js config)

## Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production (static export in prod env)
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm clean        # Remove .next and node_modules
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# API Configuration
API_BASE_URL=http://localhost:3001

# Application Configuration
NODE_ENV=development
PORT=3000

# Optional: Enable source maps in production
NEXT_PUBLIC_SOURCE_MAPS=true

# Optional: Disable worker threads
DISABLE_WORKERS=true
```

## Design System

### Colors (CSS Variables)
The design system uses HSL color values via CSS custom properties:
- Background/Foreground
- Primary/Secondary
- Muted/Accent
- Destructive
- Card/Popover
- Border/Input/Ring

All colors have dark mode variants.

### Typography
- Geist for text, Geist Mono for labels, data, addresses and endpoints, Instrument Serif italic (`.serif`) for one or two words of a headline, never a whole line (all loaded in `app/layout.tsx`)
- Headings: `font-medium`, tight negative tracking (-0.04em to -0.055em), large and left-aligned; small labels are mono, uppercase, wide tracking (`Eyebrow`)

### Layout and the look
The site is editorial and technical, not a template. Keep it that way:
- One column measure everywhere: `WRAP` in `components/site/blocks.tsx` (max 1200px, 20/32px gutters). Left-aligned; a `Section` puts its title left and its introduction beside it. Home sections are numbered (`index`/`label` on `Section`: "01 Keys").
- Structure comes from hairline rules (`border-t border-foreground/15`, rows divided by `border-b`), not boxes. No card grids of icons in squares, no pill badges, no gradient text. Buttons are pills (`ButtonLink`).
- Colour: monochrome, as the wallet: white on near-black (dark), ink on white (light), greys between. `signal` is kept as the name for emphasis (a live dot, a section's index, the classic-key bytes) and is the ink itself. `bid`, `ask` and `warn` only for meaning. No accent colour, no grain.
- Graphics are real data or the protocol's own structure, drawn with WebGPU (`components/gfx`):
  - `Sea` (`sea.wgsl`, `sea-scene.ts`): a sea of dots behind the home headline, in page heroes (`PageHero`, quieter) and the closing band. Points on a grid over a liquid surface, each printed as a round halftone dot as large as the light it catches (an ellipse lying on the surface); where rows close up below a pixel, their tone is printed through a fine 45-degree halftone screen, so everything stays dots. A low light ahead makes a glitter path that drifts with the pointer; scrolling carries the eye forward. Each testnet block from the stream drops a ripple where its hash points; a finalized epoch sends one swell in from the horizon. Nothing in it is invented: no ripples without blocks. The wallet's backdrop is a different dither (square 2-px Bayer dots on a chrome orb): keep the two distinct.
  - `KeyField` (`keyfield.wgsl`, `keyfield-scene.ts`): a validator's actual ML-DSA-65 public key, one column per byte, in monochrome chrome that brightens with each byte, the first 33 bytes (a whole secp256k1 key) solid ink.
  - One shared device (`lib/gpu.ts`); loops pause off screen; one still frame under `prefers-reduced-motion`; a lost device falls back.
  - Without WebGPU the sea shows its still frames (`public/gfx/sea-{dark,light}[-wide|-tall].png`: renders of `sea.wgsl` at time 14 with no ripples and no swell, made by drawing the effect into a vgpu `target` in a browser and reading the pixels back, then reduced to 16 greys; remake them when the shader changes) and the key field is left out.
  - Check a shader change in a browser with `--enable-unsafe-webgpu`; `npx vgpu check <file.wgsl>` validates WGSL where a GPU is available. No stock illustrations or decorative charts.
- Motion: the hero headline rises word by word (`RiseText`); sections settle in and rules draw across as they scroll in (`.reveal`, `.rule-draw`, CSS scroll timelines, so content is simply there where they are unsupported); a hairline under the nav tracks scroll; live figures roll (`RollingNumber`); hover lights follow the pointer (`.spot` with `spotlight`). Respect `prefers-reduced-motion` (every animation has an off switch in `globals.css`).
- Check every page at 390px wide: no horizontal scroll.

## Current Pages

All pages share `Navigation` and `Footer` from `app/layout.tsx` (pages do not include them).

| Route | Page |
| --- | --- |
| `/` | Home: live testnet blocks beside the headline, chain statistics, a validator's ML-DSA-65 public key and key and signature sizes to scale, the exchange with live markets, the apps, status, testnet endpoints (`components/site/home.tsx`) |
| `/trade`, `/pools`, `/stake` | Product pages with live testnet data (markets, pools, validators) and links into the apps |
| `/wallet` (`/wallet/create`) | QRDX Wallet (`components/pages/WalletPage.tsx`) |
| `/wallet/funding` | Getting QRDX: testnet has no public faucet; mainnet not launched |
| `/wallet/shielding` | Asset shielding: **planned**, from the whitepaper; clearly marked as not available |
| `/network` | Testnet live: validators and delegation, staking and governance parameters, proposals, the Doomsday Protocol's state, blocks (`components/pages/NetworkPage.tsx`, `lib/network.ts`) |
| `/explorer`, `/get-started`, `/services`, `/about`, `/docs`, `/contact` | Product overview, onboarding, what runs, mission, docs index, contact |
| `/whitepaper` | Reader for `public/QRDX-Whitepaper-v3.2.md`; contents built from its headings |
| `/terms`, `/privacy` | Legal (`components/LegalPage.tsx`). trade.qrdx.org asks visitors to accept the Terms and stores the Terms' date (`TERMS_VERSION` in qrdx-trade `lib/terms.ts`): change both when the Terms change |
| `sitemap.xml`, `robots.txt`, share image, 404 | `app/sitemap.ts` (list a new page there), `app/robots.ts`, `app/og.png/route.tsx`, `app/not-found.tsx` |

## Content and data rules

- **Say what is real.** Live means live on testnet; mainnet has not launched. Governance, the bridge, account control and multisig, QRDX names, and quantum migration with the Doomsday Protocol run on testnet (node 3.0.0). Whitepaper-only features (asset shielding beyond the bridge, wider chain adapters) are labelled planned. Check claims against qrdx-node, qrdx-trade and qrdx-wallet docs, and docs.qrdx.org.
- **No generated data.** Live numbers come from the testnet node and the trade API in the visitor's browser (`lib/live.ts`); an unreadable number shows as a dash.
- **Links live in `lib/site.ts`** (apps, docs pages, socials, contact addresses). Docs links point at docs.qrdx.org (`/docs/...` paths).
- **Theme**: monochrome tokens in `app/globals.css`, the same values as trade, explorer and the wallet (docs.qrdx.org still carries the earlier ink-and-bone tokens with Cherenkov blue). Shared page blocks are in `components/site/blocks.tsx`, motion helpers in `components/site/motion.tsx`.

## Utilities

### cn() Function (`/lib/utils.ts`)
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Used for conditional class merging with Tailwind conflict resolution.

## Development Environment

- Running in dev container (Debian 12 Bookworm)
- Available CLI tools: git, curl, wget, ssh, node, pnpm, bun
- Default shell: bash

## Production Build Notes

In production mode (`NODE_ENV=production`):
- Static export enabled (`output: 'export'`)
- Trailing slashes added to routes
- Images unoptimized (for static hosting)
- Source maps disabled by default (enable via env var)

## Common Tasks

### Add a new page
1. Create `app/newpage/page.tsx`
2. Update navigation links in `components/Navigation.tsx`

### Add a new shadcn component
```bash
pnpm dlx shadcn-ui@latest add <component-name>
```

### Add a new dependency
```bash
pnpm add <package-name>
```

### Update metadata
Edit `app/layout.tsx` metadata export

### Modify theme colors
Edit CSS variables in `app/globals.css` (`:root` and `.dark`)

## Tips for AI Assistants

1. Always check instruction files in `.github/instructions/` before making changes
2. Use pnpm exclusively for package management
3. Use shadcn CLI for adding UI components
4. Read the full context of files before editing (use large line ranges)
5. Follow the established patterns in existing components
6. Use TypeScript strictly (this is a .tsx project)
7. Follow "Layout and the look" above: graphics from real data or the protocol, motion in CSS
8. Use the `cn()` utility for className combinations
9. Maintain responsive design (mobile + desktop)
10. Keep accessibility in mind (Radix UI primitives are accessible by default)

## Project Goals

QRDX focuses on:
- Quantum-resistant cryptography solutions
- Professional, modern web presence
- Fast performance (Bun + Turbopack + static export)
- An intentional, editorial design that shows real chain data
- Clean, maintainable code structure

---

**Last Updated**: November 17, 2026
**Next.js Version**: 16.0.1
**Package Manager**: pnpm@10.6.4
**Runtime**: Bun
