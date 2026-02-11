/* * */

import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
}

export default createMDX()(config)
