/* * */

import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
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
				source: '/reference/index.md',
				destination: '/llms.mdx/reference',
			},
			{
				source: '/reference/:path*.md',
				destination: '/llms.mdx/reference/:path*',
			},
			// local / direct access; prod ingress only exposes /reference/*
			{
				source: '/reference.md',
				destination: '/llms.mdx/reference',
			},
		];
	},
};

export default createMDX()(config);
