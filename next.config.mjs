import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',      // gera site estático
  reactStrictMode: true,
  basePath: isGithubPages ? '/docs' : '',
  assetPrefix: isGithubPages ? '/docs/' : '',
}

export default withMDX(config)
