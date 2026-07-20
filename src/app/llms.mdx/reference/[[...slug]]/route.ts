/* * */

import { getLLMText } from '@/lib/get-llm-text';
import { sourceReference } from '@/lib/source';
import { notFound } from 'next/navigation';

/* * */

export const revalidate = false;

/* * */

export const GET = async (_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) => {
	const { slug } = await params;
	const page = sourceReference.getPage(slug);
	if (!page) notFound();

	return new Response(await getLLMText(page), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

/* * */

export function generateStaticParams() {
	return sourceReference.generateParams();
}
