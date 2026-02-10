import type { MDXComponents } from 'mdx/types';

import { Blockquote } from '@/components/mdx/Blockquote';
import { Callout, CalloutBody, CalloutTitle } from '@/components/mdx/Callout';
import { Table } from '@/components/mdx/Table';
import * as ObsidianComponents from 'fumadocs-obsidian/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		...ObsidianComponents,
		// Custom Obsidian-styled overrides
		blockquote: Blockquote,
		ObsidianCallout: Callout,
		ObsidianCalloutBody: CalloutBody,
		ObsidianCalloutTitle: CalloutTitle,
		table: Table,
		...components,
	};
}
