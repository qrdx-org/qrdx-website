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
- **Animations**: Framer Motion 12.23.24
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
│   ├── layout.tsx              # Root layout with Inter font
│   ├── page.tsx                # Home page (328 lines, quantum-focused hero)
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
- Animations: Framer Motion for interactive elements
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
- Font: Inter (Google Fonts)
- Loaded in root layout.tsx

### Animations
- Framer Motion animations for page transitions and interactions
- Common patterns:
  - `fadeIn(delay)`: Opacity + Y-axis fade
  - `slideIn(direction)`: Directional slide animations
  - Staggered children animations

## Current Pages

1. **Home** (`/app/page.tsx`): 328 lines
   - Hero section with quantum-resistant messaging
   - Animated with Framer Motion
   - Uses Card, Button, Icons (Shield, Lock, Zap, etc.)

2. **About** (`/app/about/page.tsx`)
3. **Services** (`/app/services/page.tsx`)
4. **Contact** (`/app/contact/page.tsx`)

## Navigation Component

Located at `/components/Navigation.tsx`:
- Fixed positioned header with blur backdrop
- Desktop: NavigationMenu with dropdowns
- Mobile: Sheet (slide-out menu)
- Animated with Framer Motion
- Icons from Lucide React

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
7. Leverage Framer Motion for animations
8. Use the `cn()` utility for className combinations
9. Maintain responsive design (mobile + desktop)
10. Keep accessibility in mind (Radix UI primitives are accessible by default)

## Project Goals

QRDX focuses on:
- Quantum-resistant cryptography solutions
- Professional, modern web presence
- Fast performance (Bun + Turbopack + static export)
- Excellent UX with smooth animations
- Clean, maintainable code structure

---

**Last Updated**: November 3, 2025
**Next.js Version**: 16.0.1
**Package Manager**: pnpm@10.6.4
**Runtime**: Bun
