import { createMetadata } from '@/lib/metadata';
import { blog } from '@/lib/source';
import { PageProps } from '@/types/PageProps';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function BlogGenerateMetadata({ params }: PageProps): Promise<Metadata> {
	const resolvedParams = await params;
	const slug = resolvedParams?.slug ?? [];

	if (slug.length === 0) {
		return { title: `TML Mobilidade Blog` };
	}

	const page = blog.getPage(slug);
	if (!page) notFound();

	return createMetadata({
		description: page.data.description,
		title: page.data.title,
	});
}
