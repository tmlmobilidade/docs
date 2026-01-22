import { createMDX } from 'fumadocs-mdx/next'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'

const withMDX = createMDX()

// ESM replacement for __dirname
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  assetPrefix: isGitHubPages ? '/carrismetropolitana/' : '',
  basePath: isGitHubPages ? '/carrismetropolitana' : '',
  // experimental: {
  //   outputFileTracingRoot: __dirname,
  // },
  output: 'export',
  reactStrictMode: true,
}

export default withMDX(config)
