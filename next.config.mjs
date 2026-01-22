import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

// const isGitHubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',      // gera site estático
  reactStrictMode: true,
  trailingSlash: true,
}

export default withMDX(config)
