import { createMDX } from 'fumadocs-mdx/next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withMDX = createMDX()

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: __dirname,
  },
}

export default withMDX(config)
