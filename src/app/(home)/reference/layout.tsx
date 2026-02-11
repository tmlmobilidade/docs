/* * */

import { BASE_OPTIONS, NAVBAR_LINKS } from '@/lib/settings';
import { sourceReference } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { type PropsWithChildren } from 'react';

/* * */

export default function Layout({ children }: PropsWithChildren) {
	return (
		<DocsLayout
			githubUrl={BASE_OPTIONS.github_url}
			links={NAVBAR_LINKS}
			nav={{ title: BASE_OPTIONS.title }}
			themeSwitch={{ mode: 'light-dark-system' }}
			tree={sourceReference.getPageTree()}
		>
			{children}
		</DocsLayout>
	);
}
