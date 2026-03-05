/* * */

import { defineCollections, defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { readVaultFiles } from 'fumadocs-obsidian';
import { remarkObsidian, RemarkObsidianOptions } from 'fumadocs-obsidian/mdx';
import { type ElementContent } from 'hast';
import path from 'node:path';
import { type ShikiTransformer } from 'shiki';
import { visit } from 'unist-util-visit';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections

export const reference = defineDocs({
	dir: 'docs/reference',
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
		},
		schema: frontmatterSchema,
	},
	meta: {
		schema: metaSchema,
	},
});

/** Doc roots: [dir under docs, URL path prefix] — wikilinks under each dir become /{urlPrefix}/... */
const DOC_ROOTS: [string, string][] = [
	['docs/reference', 'docs'],
	['docs/lab', 'lab'],
];

/** Rewrites Obsidian wikilink hrefs to Fumadocs paths (no .mdx), for reference, lab, etc. */
function remarkRewriteWikilinkUrls() {
	return (tree: import('mdast').Root, file: { path?: string }) => {
		if (!file.path) return;
		const fromDir = path.dirname(path.normalize(file.path));
		visit(tree, 'link', (node: import('mdast').Link & { data?: { isWikiLink?: boolean } }) => {
			if (!node.data?.isWikiLink || !node.url || node.url.startsWith('#')) return;
			const resolved = path.normalize(path.join(fromDir, node.url)).replaceAll('\\', '/');
			const slug = resolved.replace(/\.mdx$/, '');
			for (const [dirRoot, urlPrefix] of DOC_ROOTS) {
				const re = new RegExp(`(?:^|/)${dirRoot.replace(/[/\\]/g, '/')}/(.+)$`);
				const match = slug.match(re);
				if (match) {
					(node as import('mdast').Link).url = `/${urlPrefix}/${match[1]}`;
					break;
				}
			}
		});
	};
}

export default defineConfig({
	mdxOptions: async () => {
		const files = await readVaultFiles({ dir: 'docs' });
		return {
			addLanguageClass: true,
			rehypeCodeOptions: {
				themes: {
					dark: 'github-dark',
					light: 'github-light',
				},
				transformers: [transformerEscape()],
			},
			remarkPlugins: plugins => [
				[
					remarkObsidian,
					{ files } satisfies RemarkObsidianOptions,
				],
				remarkRewriteWikilinkUrls,
				...plugins,
			],
		};
	},
});

export const lab = defineCollections({
	async: true,
	dir: 'docs/lab',
	schema: frontmatterSchema.extend({
		author: z.string(),
		cover: z.string(),
		date: z.iso.date().or(z.date()),
		tags: z.array(z.string()),
	}),
	type: 'doc',
});

function transformerEscape(): ShikiTransformer {
	return {
		code(hast) {
			function replace(node: ElementContent) {
				if (node.type === 'text') {
					node.value = node.value.replace('[\\!code', '[!code');
				} else if ('children' in node) {
					for (const child of node.children) {
						replace(child);
					}
				}
			}

			replace(hast);
			return hast;
		},
		name: '@shikijs/transformers:remove-notation-escape',
	};
}
