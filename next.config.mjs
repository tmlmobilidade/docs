/* * */

import { createMDX } from 'fumadocs-mdx/next';

const basePath = '/hub/reference';

/** @type {import('next').NextConfig} */
const config = {
	basePath,
	env: {
		NEXT_PUBLIC_BASE_PATH: basePath,
	},
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
				source: '/index.md',
				destination: '/llms.mdx/reference',
			},
			{
				source: '/:path*.md',
				destination: '/llms.mdx/reference/:path*',
			},
		];
	},
};

export default createMDX()(config);