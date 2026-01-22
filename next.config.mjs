import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

// const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  // assetPrefix: isGitHubPages ? '/TML/' : '',
  // basePath: isGitHubPages ? '/TML' : '',
  output: 'export',
  reactStrictMode: true,
}

export default withMDX(config)
