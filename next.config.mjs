/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: 'https://docs.qrdx.org/:path*',
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