import type { Metadata } from 'next';

import { getPageImage, sourceDocs } from '@/lib/source';
import { PagePropsPromise } from '@/types/PagePropsPromise';
import { notFound } from 'next/navigation';

export async function DocsGenerateMetadata({ params }: PagePropsPromise): Promise<Metadata> {
	const resolvedParams = await params;
	const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [resolvedParams.slug];

	const page = sourceDocs.getPage(slug);
	if (!page) notFound();

	return {
		description: page.data.description,
		openGraph: {
			images: getPageImage(page).url,
		},
		title: page.data.title,
	};
}
