/** @type {import('next').NextConfig} */

const nextConfig = {
  // Ensure stable builds
  swcMinify: true,
  
  // Optimize for production builds
  compress: true,
  
  // Webpack configuration for better builds
  webpack: (config, { isServer }) => {
    // Ensure proper handling of client components
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Prevent build issues with dynamic imports
  transpilePackages: ['framer-motion'],
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
