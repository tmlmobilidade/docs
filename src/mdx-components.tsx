/* * */

import { Blockquote } from '@/components/mdx/Blockquote';
import { Callout, CalloutBody, CalloutTitle } from '@/components/mdx/Callout';
import { Table } from '@/components/mdx/Table';
import * as obsidianComponents from 'fumadocs-obsidian/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { type MDXComponents } from 'mdx/types';

/* * */

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...obsidianComponents,
		// Custom Obsidian-styled overrides
		blockquote: Blockquote,
		ObsidianCallout: Callout,
		ObsidianCalloutBody: CalloutBody,
		ObsidianCalloutTitle: CalloutTitle,
		table: Table,
		...components,
	};
}
