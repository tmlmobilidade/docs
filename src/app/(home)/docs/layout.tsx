import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { LayoutProps } from '@/types/LayoutProps';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function Layout({ children }: LayoutProps) {
	return (
		<DocsLayout tree={source.getPageTree()} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
