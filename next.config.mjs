/* * */

import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
	basePath: '/hub/reference',
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				hostname: '*.carrismetropolitana.pt',
				port: '',
				protocol: 'https',
			},
			{
				hostname: '*.oraclecloud.com',
				port: '',
				protocol: 'https',
			},
		],
		unoptimized: true,
	},
	output: 'standalone',
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/index.md',           // under basePath → /hub/reference/index.md
				destination: '/llms.mdx/reference',
			},
			{
				source: '/:path*.md',
				destination: '/llms.mdx/reference/:path*',
			},
			{
				source: '.md',                 // or drop if unused
				destination: '/llms.mdx/reference',
			},
		];
	},
};

export default createMDX()(config);