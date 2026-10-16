/* * */

import { sourceReference } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

/* * */

// cached forever
export const revalidate = false;

/* * */

export const GET = async () => {
	const index = (await llms(sourceReference)
		.index())
		.replace(/\]\((\/[^)#]+)\)/g, ']($1.md)')
		.replace(/\]\(\/\)/g, '](/index.md)');

	const body = `${index}

## Full documentation

- [llms-full.txt](/llms-full.txt): Complete docs content in a single Markdown file.
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
