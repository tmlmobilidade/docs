import { docs } from '@/lib/source';
import { RouteContext } from '@/types/RouteContext';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { Key } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext) {
	// Await the params promise
	const resolvedParams = await params;

	// Normalize slug: ensure it's always an array
	const slug = Array.isArray(resolvedParams.slug)
		? resolvedParams.slug
		: [resolvedParams.slug];

	// Convert slug array to a key (e.g., ['getting', 'started'] => 'getting-started')
	const key = slug.join('-');

	// Safely find the page in docs
	const page = Object.values(docs).find(p => p.slug === key);
	if (!page) notFound();

	return new ImageResponse(
		<DefaultImage description={page.data.description} site="TML" title={page.data.title} />,
		{
			height: 630,
			width: 1200,
		},
	);
}

// Generate static params for all docs
export function generateStaticParams() {
	return Object.keys(docs).map(key => ({
		slug: key.split('-'), // safe because key is the filename
	}));
}
