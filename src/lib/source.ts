/* * */

import { blog, reference } from '#/.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';

/* * */

export const sourceReference = loader({
	baseUrl: '/reference',
	source: reference.toFumadocsSource(),
});

export const sourceBlog = loader({
	baseUrl: '/blog',
	source: blog.toFumadocsSource(),
});

/* * */

export function getPageImage(page: InferPageType<typeof sourceReference>) {
	const segments = [...page.slugs, 'image.png'];
	return {
		segments,
		url: `/og/reference/${segments.join('/')}`,
	};
}

export async function getLLMText(page: InferPageType<typeof sourceReference>) {
	const processed = await page.data.getText('processed');
	return `#${page.data.title}\n\n${processed}`;
}

export type Page = InferPageType<typeof sourceReference>;
