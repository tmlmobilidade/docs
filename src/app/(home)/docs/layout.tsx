/* * */

import { baseOptions } from '@/lib/layout.shared';
import { sourceDocs } from '@/lib/source';
import { type LayoutProps } from '@/types/LayoutProps';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

/* * */

export default function Layout({ children }: LayoutProps) {
	return (
		<DocsLayout tree={sourceDocs.getPageTree()} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
