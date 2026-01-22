import type { MDXComponents } from 'mdx/types';

import * as ObsidianComponents from 'fumadocs-obsidian/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...ObsidianComponents,
		...components,
	};
}
