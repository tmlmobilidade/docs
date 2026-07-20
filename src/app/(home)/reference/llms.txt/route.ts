/* * */

import { sourceReference } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

/* * */

// cached forever
export const revalidate = false;

/* * */

export const GET = () => {
	const index = llms(sourceReference)
		.index()
		// Prefer Markdown URLs under /reference/* (prod ingress path)
		.replace(/\]\((\/reference\/[^)#]+)\)/g, ']($1.md)')
		.replace(/\]\(\/reference\)/g, '](/reference/index.md)');

	const body = `${index}

## Full documentation

- [llms-full.txt](/reference/llms-full.txt): Complete docs content in a single Markdown file.
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
