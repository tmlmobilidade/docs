import { applyMdxPreset, defineCollections, defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { remarkObsidian, RemarkObsidianOptions } from 'fumadocs-obsidian/mdx';
import { readVaultFiles } from 'fumadocs-obsidian';
import { z } from 'zod';


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
        transformers: [...(rehypeCodeDefaultOptions.transformers ?? [])],
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