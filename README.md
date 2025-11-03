# QRDX Website

A modern, production-ready React application with routing, built using esbuild for lightning-fast builds.

## 🚀 Features

- **React 19** - Latest version with modern React features
- **React Router DOM** - Client-side routing
- **esbuild** - Ultra-fast bundler for development and production
- **Professional Structure** - Organized directory structure for scalability
- **Hot Reload** - Live reload during development
- **Production Ready** - Optimized build for production deployment

## 📁 Project Structure

```
qrdx-website/
├── public/              # Static files
│   └── index.html       # HTML template
├── scripts/             # Build and development scripts
│   ├── dev-server.js    # Development server with hot reload
│   ├── build.js         # Production build script
│   └── README.md        # Scripts documentation
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Layout/      # Layout wrapper component
│   │   ├── Navigation/  # Navigation component
│   │   └── index.js     # Component exports
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Home page
│   │   ├── About.jsx    # About page
│   │   ├── Contact.jsx  # Contact page
│   │   ├── Pages.css    # Page styles
│   │   └── index.js     # Page exports
│   ├── styles/          # Global styles and CSS variables
│   │   ├── index.css    # Global styles
│   │   └── variables.css # CSS custom properties
│   ├── utils/           # Utility functions
│   │   └── index.js     # Helper functions
│   ├── hooks/           # Custom React hooks
│   │   └── index.js     # Custom hooks
│   ├── constants/       # Application constants
│   │   └── index.js     # Constants and config
│   ├── App.jsx          # Root application component
│   └── index.jsx        # Application entry point
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v6 or higher)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Server will start at http://localhost:3000
```

### Production Build

```bash
# Create optimized production build
pnpm build

# Output will be in the dist/ directory
```

## 📜 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Alias for dev command
- `pnpm clean` - Remove dist and node_modules directories

## 🎨 Styling

The project uses CSS with CSS custom properties (variables) for consistent theming:

- **Global styles**: `src/styles/index.css`
- **CSS variables**: `src/styles/variables.css`
- **Component styles**: Co-located with components

## 🏗️ Architecture

### Components

Reusable UI components are located in `src/components/`. Each component has its own directory with:
- Component file (`.jsx`)
- Styles (`.css`)
- Tests (when applicable)

### Pages

Page components in `src/pages/` represent different routes in the application.

### Utilities

Helper functions and utilities in `src/utils/` for common operations.

### Hooks

Custom React hooks in `src/hooks/` for reusable stateful logic.

### Constants

Application-wide constants and configuration in `src/constants/`.

## 🚀 Deployment

After running `pnpm build`, deploy the contents of the `dist/` directory to your hosting provider:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

```bash
cp .env.example .env.local
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

ISC

## 🔧 Built With

- [React](https://react.dev/) - UI library
- [React Router](https://reactrouter.com/) - Routing
- [esbuild](https://esbuild.github.io/) - Bundler
- [pnpm](https://pnpm.io/) - Package manager

https://qrdx.org/

Securing assets in a post quantum world