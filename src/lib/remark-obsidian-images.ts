import type { PhrasingContent, Root } from 'mdast';

import path from 'node:path';
import { visit } from 'unist-util-visit';

/** Resolve Obsidian image attachments from the vault's docs/files directory. */
export function remarkObsidianImages() {
	return (tree: Root, file: { path?: string }) => {
		if (!file.path) return;
		const fromDir = path.dirname(file.path);
		visit(tree, 'text', (node, index, parent) => {
			if (index === undefined || !parent) return;
			const children: PhrasingContent[] = [];
			let offset = 0;
			for (const match of node.value.matchAll(/!\[\[([^\]|]+\.(?:png|jpe?g|gif|webp|avif|svg))\]\]/gi)) {
				if (match.index > offset) children.push({ type: 'text', value: node.value.slice(offset, match.index) });
				children.push({
					alt: match[1],
					type: 'image',
					url: path.relative(fromDir, path.resolve('docs/files', match[1])).replaceAll('\\', '/'),
				});
				offset = match.index + match[0].length;
			}
			if (!offset) return;
			if (offset < node.value.length) children.push({ type: 'text', value: node.value.slice(offset) });
			parent.children.splice(index, 1, ...children);
			return index + children.length;
		});
	};
}
