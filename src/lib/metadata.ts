import type { Metadata } from 'next/types';

import { Page } from './source';

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		alternates: {
			types: {
				'application/rss+xml': [
					{
						title: 'TML MOBILIDADE Blog',
						url: '',
					},
				],
			},
			...override.alternates,
		},
		description: override.description ?? 'Documentação sobre veículos e rede de autocarros da AML',
		openGraph: {
			description: override.description ?? 'Documentação sobre veículos e rede de autocarros da AML',
			images: '/banner.png',
			siteName: 'TML MOBILIDADE',
			title: override.title ?? 'TML MOBILIDADE',
			url: '',
			...override.openGraph,
		},
		title: override.title ?? 'TML MOBILIDADE',
		twitter: {
			card: 'summary_large_image',
			creator: '@fuma_nama',
			description: override.description ?? 'Documentação sobre veículos e rede de autocarros da AML',
			images: '/banner.png',
			title: override.title ?? 'TML MOBILIDADE',
			...override.twitter,
		},
	};
}

export function getPageImage(page: Page) {
	const segments = [...page.slugs, 'image.webp'];
	return {
		segments,
		url: `/og/${segments.join('/')}`,
	};
}

export const baseUrl = process.env.NODE_ENV === 'development' || !process.env.VERCEL_PROJECT_PRODUCTION_URL ? new URL('http://localhost:3000') : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
