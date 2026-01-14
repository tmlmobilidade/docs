import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { remarkObsidian, RemarkObsidianOptions } from 'fumadocs-obsidian/mdx';
import { readVaultFiles } from 'fumadocs-obsidian';


// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content',
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
