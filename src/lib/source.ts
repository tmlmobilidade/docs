/* * */

import { blog, docs } from '#/.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';

/* * */

export const sourceDocs = loader({
	baseUrl: '/docs',
	source: docs.toFumadocsSource(),
});

export const sourceBlog = loader({
	baseUrl: '/blog',
	source: blog.toFumadocsSource(),
});

/* * */

export function getPageImage(page: InferPageType<typeof sourceDocs>) {
	const segments = [...page.slugs, 'image.png'];
	return {
		segments,
		url: `/og/docs/${segments.join('/')}`,
	};
}

export async function getLLMText(page: InferPageType<typeof sourceDocs>) {
	const processed = await page.data.getText('processed');
	return `# ${page.data.title}
${processed}`;
}

// export const blog = loader(toFumadocsSource(blogPosts, []), {
// 	baseUrl: `/blog`,
// });

export type Page = InferPageType<typeof sourceDocs>;

export { docs };
