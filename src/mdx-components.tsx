/* * */

import { Callout } from '@/components/mdx/callout';
import * as obsidianComponents from 'fumadocs-obsidian/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { type MDXComponents } from 'mdx/types';

/* * */

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...obsidianComponents,
		...components,
	};
}
