import { applyMdxPreset, defineCollections, defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { remarkObsidian, RemarkObsidianOptions } from 'fumadocs-obsidian/mdx';
import { readVaultFiles } from 'fumadocs-obsidian';
import { z } from 'zod';
import type { ShikiTransformer } from 'shiki';
import type { ElementContent } from 'hast';


// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: async () => {
    const files = await readVaultFiles({
      dir: 'content',
    });

    return {
      remarkPlugins: (plugins) => [
        [
          remarkObsidian,
          {
            files,
          } satisfies RemarkObsidianOptions,
        ],
        ...plugins,
      ],
    };
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.iso.date().or(z.date()),
  }),
  async: true,
  async mdxOptions(environment) {
    const { rehypeCodeDefaultOptions } = await import('fumadocs-core/mdx-plugins/rehype-code');
    const { remarkSteps } = await import('fumadocs-core/mdx-plugins/remark-steps');

    return applyMdxPreset({
      rehypeCodeOptions: {
        inline: 'tailing-curly-colon',
        themes: {
          light: 'catppuccin-latte',
          dark: 'catppuccin-mocha',
        },
        transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerEscape()],
      },
      remarkCodeTabOptions: {
        parseMdx: true,
      },
      remarkNpmOptions: {
        persist: {
          id: 'package-manager',
        },
      },
      remarkPlugins: [remarkSteps],
    })(environment);
  },
});

function transformerEscape(): ShikiTransformer {
  return {
    name: '@shikijs/transformers:remove-notation-escape',
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
  };
}