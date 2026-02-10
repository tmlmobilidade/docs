/* * */

import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

/* * */

export const docs = defineDocs({
	dir: 'content',
});

export const news = defineDocs({
	dir: 'content/news',
});

/* * */

export default defineConfig();
