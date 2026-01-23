import fs from 'fs'
import { createMDX } from 'fumadocs-mdx/next'
import path from 'path'

const withMDX = createMDX()

function getBasePath() {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'

  if (!isGitHubPages) {
    return ''
  }

  const folderName = getContentFolderName()
  const normalized = folderName.toLowerCase().replace(/\s+/g, '-')
  return `/${normalized}`
}

function getContentFolderName() {
  const contentDir = path.join(process.cwd(), 'content')

  if (!fs.existsSync(contentDir)) {
    throw new Error('Content directory does not exist')
  }

  const entries = fs.readdirSync(contentDir, { withFileTypes: true })
  const folders = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  if (folders.length === 0) {
    throw new Error('No folders found in content directory')
  }

  return folders[0]
}

const basePath = getBasePath()

/** @type {import('next').NextConfig} */
const config = {
  basePath: basePath,
  output: 'export',
  reactStrictMode: true,
}

export default withMDX(config)
