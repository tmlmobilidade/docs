/* * */

import { sourceReference } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

/* * */

export const revalidate = false; // it should be cached forever

export const { GET } = createFromSource(sourceReference, {
	// https://docs.orama.com/docs/orama-js/supported-languages
	buildIndex: page => ({
		description: page.data.description,
		id: page.url,
		structuredData: page.data.structuredData,
		title: page.data.title,
		url: page.url,
	}),
	language: 'portuguese',
});
