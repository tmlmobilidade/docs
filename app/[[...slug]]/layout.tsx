/* * */

import { baseOptions } from '@/lib/layout.shared';
import { sourceDocs } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { type PropsWithChildren } from 'react';

/* * */

export default function Layout({ children }: PropsWithChildren) {
	return (
		<DocsLayout
			tree={sourceDocs.getPageTree()}
			{...baseOptions}
		>
			{children}
		</DocsLayout>
	);
}
