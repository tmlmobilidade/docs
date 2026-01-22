import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  assetPrefix: isGitHubPages ? '/docs/' : '',
  basePath: isGitHubPages ? '/docs' : '',
  output: 'export',
  reactStrictMode: true,
}

export default withMDX(config)
