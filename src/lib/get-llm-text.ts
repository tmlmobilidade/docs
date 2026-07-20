/* * */

import { type InferPageType } from 'fumadocs-core/source';

import { sourceReference } from './source';

/* * */

export async function getLLMText(page: InferPageType<typeof sourceReference>) {
	const processed = await page.data.getText('processed');

	return `# ${page.data.title} (${page.url})

${processed}`;
}
