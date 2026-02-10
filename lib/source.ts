/* * */

import { docs, news } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

/* * */

export const sourceDocs = loader({
	baseUrl: '/',
	source: docs.toFumadocsSource(),
});

export const sourceNews = loader({
	baseUrl: '/',
	source: news.toFumadocsSource(),
});
