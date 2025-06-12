// next.config.js - Correct configuration for Next.js 15
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix cross-origin warning - correct location (not in experimental)
  allowedDevOrigins: [
    '192.168.56.1',
    '192.168.1.0/24',
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
  ],
  
  // Optional optimizations for Next.js 15
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // Configure images
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

// ALTERNATIVE: Even simpler version if you want minimal config
/*
module.exports = {
  allowedDevOrigins: ['192.168.56.1', 'localhost', '127.0.0.1']
}
*/