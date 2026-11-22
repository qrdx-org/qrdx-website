import { wgslTurbopackRule } from '@vgpu/wgsl/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // WGSL shaders (components/gfx) import as prepared vgpu modules, compiled at build time.
  turbopack: {
    rules: {
      '*.wgsl': wgslTurbopackRule({ minify: true }),
    },
  },
  webpack(config) {
    config.module.rules.push({ test: /\.wgsl$/, loader: '@vgpu/wgsl/loader-webpack', options: { minify: true } })
    return config
  },

  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  }),
  // Enable production browser source maps via env (default: false for speed)
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_SOURCE_MAPS === 'true',
  
  // Redirects configuration
  async redirects() {
    return [
      {
        source: '/docs/:path*',
        destination: 'https://docs.qrdx.org/docs/:path*',
        permanent: true,
      },
    ]
  },
  
  // Parallel build optimization
  experimental: {
    // Package import optimizations - reduces bundle size
    optimizePackageImports: ['lucide-react'],
    
    // Server Components HMR cache - faster hot reloading
    serverComponentsHmrCache: true,
    
    // Enable worker threads for parallel compilation
    workerThreads: false,
  },
}

export default nextConfig