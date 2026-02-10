/* * */

import { applyMdxPreset, defineCollections, defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { readVaultFiles } from 'fumadocs-obsidian';
import { remarkObsidian, RemarkObsidianOptions } from 'fumadocs-obsidian/mdx';
import { type ElementContent } from 'hast';
import { type ShikiTransformer } from 'shiki';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections

export const docs = defineDocs({
	dir: 'content/docs',
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

export default defineConfig({
	mdxOptions: async () => {
		const files = await readVaultFiles({ dir: 'content' });
		return {
			remarkPlugins: plugins => [
				[
					remarkObsidian,
					{ files } satisfies RemarkObsidianOptions,
				],
				...plugins,
			],
		};
	},
});

export const blog = defineDocs({
	// async: true,
	dir: 'content/blog',
	// async mdxOptions(environment) {
	// 	const { rehypeCodeDefaultOptions } = await import('fumadocs-core/mdx-plugins/rehype-code');
	// 	const { remarkSteps } = await import('fumadocs-core/mdx-plugins/remark-steps');

	// 	return applyMdxPreset({
	// 		rehypeCodeOptions: {
	// 			inline: 'tailing-curly-colon',
	// 			themes: {
	// 				dark: 'catppuccin-mocha',
	// 				light: 'catppuccin-latte',
	// 			},
	// 			transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerEscape()],
	// 		},
	// 		remarkCodeTabOptions: {
	// 			parseMdx: true,
	// 		},
	// 		remarkNpmOptions: {
	// 			persist: {
	// 				id: 'package-manager',
	// 			},
	// 		},
	// 		remarkPlugins: [remarkSteps],
	// 	})(environment);
	// },
	// schema: frontmatterSchema.extend({
	// 	author: z.string(),
	// 	date: z.iso.date().or(z.date()),
	// 	tags: z.array(z.string()),
	// }),
	// type: 'doc',
});

function transformerEscape(): ShikiTransformer {
	return {
		code(hast) {
			function replace(node: ElementContent) {
				if (node.type === 'text') {
					node.value = node.value.replace('[\\!code', '[!code');
				}
				else if ('children' in node) {
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
