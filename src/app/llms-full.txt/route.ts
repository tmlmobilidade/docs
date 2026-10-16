/* * */

import { getLLMText } from '@/lib/get-llm-text';
import { sourceReference } from '@/lib/source';

/* * */

// cached forever
export const revalidate = false;

/* * */

export const GET = async () => {
	const scanned = await Promise.all(sourceReference.getPages().map(getLLMText));
	return new Response(scanned.join('\n\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
