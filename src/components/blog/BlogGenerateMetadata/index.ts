import { createMetadata } from '@/lib/metadata';
import { blog } from '@/lib/source';
import { PageProps } from '@/types/PageProps';
import { Metadata } from 'next';

export async function BlogGenerateMetadata({ params }: PageProps): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const resolvedParams = await params;
	const slug = resolvedParams?.slug ?? [];

	//
	// B. Render components

	if (slug.length === 0) {
		return { title: `TML Mobilidade Blog` };
	}

	const page = blog.getPage(slug);
	if (!page) return createMetadata({
		title: 'Blog',
	});

	return createMetadata({
		description: page.data.description,
		title: page.data.title,
	});
}
