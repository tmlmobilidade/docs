/* * */

import { blog, reference } from '#/.source/server';
import { type InferPageType, loader, multiple } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';

import { openapi } from './openapi';

/* * */

export const sourceReference = loader(multiple({
	docs: reference.toFumadocsSource(),
	openapi: await openapiSource(openapi, {
		baseDir: 'openapi',
	}),
}), {
	baseUrl: '/docs',
	plugins: [openapiPlugin()],
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
	const processed = page.data.type === 'docs' ? await page.data.getText('processed') : '';
	return `#${page.data.title}\n\n${processed}`;
}

export type Page = InferPageType<typeof sourceReference>;
