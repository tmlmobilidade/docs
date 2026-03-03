/* * */

import { blog, reference } from '#/.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

/* * */

export const sourceReference = loader({
	baseUrl: '/docs',
	source: reference.toFumadocsSource(),
});

export const sourceBlog = loader({
	baseUrl: '/lab',
	source: toFumadocsSource(blog, []),
});

/* * */

export function getPageImage(page: InferPageType<typeof sourceReference>) {
	const segments = [...page.slugs, 'image.png'];
	return {
		segments,
		url: `/og/docs/${segments.join('/')}`,
	};
}

export async function getLLMText(page: InferPageType<typeof sourceReference>) {
	const processed = await page.data.getText('processed');
	return `#${page.data.title}\n\n${processed}`;
}

export type Page = InferPageType<typeof sourceReference>;
