/* * */

import { lab, reference } from '#/.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

/* * */

export const sourceReference = loader({
	baseUrl: '/reference',
	source: reference.toFumadocsSource(),
});

export const sourceLab = loader({
	baseUrl: '/lab',
	source: toFumadocsSource(lab, []),
});

/* * */

export function getPageImage(page: InferPageType<typeof sourceReference>) {
	const segments = [...page.slugs, 'image.png'];
	return {
		segments,
		url: `/og/reference/${segments.join('/')}`,
	};
}

export type Page = InferPageType<typeof sourceReference>;
