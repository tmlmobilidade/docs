/* * */

import { sourceDocs } from '@/lib/source';
import { type LayoutProps } from '@/types/LayoutProps';
import { NAVBAR_LINKS } from '#/src/lib/navbar';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

/* * */

export default function Layout({ children }: LayoutProps) {
	return (
		<DocsLayout links={NAVBAR_LINKS} nav={{ title: 'TML' }} tree={sourceDocs.getPageTree()}>
			{children}
		</DocsLayout>
	);
}
