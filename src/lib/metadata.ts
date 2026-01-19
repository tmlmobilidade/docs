import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next/types';
import { Page } from './source';

/**
 * Type definition for your Obsidian metadata file
 */
export type SiteMetadataFile = {
  siteName: string;
  description?: string;
  theme?: string;
};

/**
 * Reads site.metadata.json from Docker / build folder
 */
export function getSiteMetadata(): SiteMetadataFile {
  const metadataPath = path.join(process.cwd(), 'content', '.metadata.json');

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Missing .metadata.json file at ${metadataPath}`);
  }

  const raw = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(raw) as SiteMetadataFile;
}



/**
 * Creates Next.js Metadata object, using Obsidian metadata as default
 */
export function createMetadata(override: Metadata): Metadata {
  const site = getSiteMetadata();

  return {
    ...override,
    title: override.title ?? site.siteName,
    description: override.description ?? site.description,
    openGraph: {
      title: override.title ?? site.siteName,
      description: override.description ?? site.description,
      url: '',
      images: '/banner.png',
      siteName: site.siteName,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@fuma_nama',
      title: override.title ?? site.siteName,
      description: override.description ?? site.description,
      images: '/banner.png',
      ...override.twitter,
    },
    alternates: {
      types: {
        'application/rss+xml': [
          {
            title: `${site.siteName} Blog`,
            url: '',
          },
        ],
      },
      ...override.alternates,
    },
  };
}

/**
 * Helper to get OG image URL for a page
 */
export function getPageImage(page: Page) {
  const segments = [...page.slugs, 'image.webp'];
  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}

/**
 * Base URL detection
 */
export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
