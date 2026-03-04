/* * */

import * as obsidianComponents from 'fumadocs-obsidian/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { type MDXComponents } from 'mdx/types';

import { APIPage } from './components/api/api-page';
/* * */

export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		APIPage,
		...obsidianComponents,
		...components,
	};
}
