/* * */

import { BASE_OPTIONS, NAVBAR_LINKS } from '@/lib/settings';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { type PropsWithChildren } from 'react';

/* * */

export default function Layout({ children }: PropsWithChildren) {
	return (
		<HomeLayout
			githubUrl={BASE_OPTIONS.github_url}
			links={NAVBAR_LINKS}
			nav={{ title: BASE_OPTIONS.title }}
			themeSwitch={{ mode: 'light-dark-system' }}
		>
			{children}
		</HomeLayout>
	);
}
