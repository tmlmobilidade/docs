/* * */

import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const config = {
  basePath: '/docs',
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: '*.carrismetropolitana.pt',
        port: '',
        protocol: 'https',
      },
      {
        hostname: '*.oraclecloud.com',
        port: '',
        protocol: 'https',
      },
    ],
    unoptimized: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        basePath: false,
        destination: '/alerts',
        permanent: true,
        source: '/',
      },
    ]
  },
}

export default createMDX()(config)
