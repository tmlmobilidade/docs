import { type InferPageType, loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blog as blogPosts, docs } from 'fumadocs-mdx:collections/server';

import { getBasePath } from './getBasePath';

const basePath = getBasePath();

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
	baseUrl: `${basePath}/docs`,
	plugins: [],
	source: docs.toFumadocsSource(),
});

export function getPageImage(page: InferPageType<typeof source>) {
	const segments = [...page.slugs, 'image.png'];

	return {
		segments,
		url: `/og/docs/${segments.join('/')}`,
	};
}

export async function getLLMText(page: InferPageType<typeof source>) {
	const processed = await page.data.getText('processed');

	return `# ${page.data.title}

${processed}`;
}

export const blog = loader(toFumadocsSource(blogPosts, []), {
	baseUrl: `${basePath}/blog`,
});

export type Page = InferPageType<typeof source>;

export { docs };
