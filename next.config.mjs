/* * */

import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const config = {
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
}

export default createMDX()(config)
