import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_HOSTNAME ||
          'lavocat-dev.s3.amazonaws.com',
      },
    ], // Allow images from this domain
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/appointments',
        permanent: false, // use `true` for 308 permanent redirect
      },
    ]
  },
}

export default nextConfig
