/* * */

import { IconBook2, IconWorld } from '@tabler/icons-react';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations:
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	githubUrl: 'https://github.com/carrismetropolitana',
	links: [
		{
			external: true,
			icon: <IconWorld />,
			text: 'Website',
			url: 'https://carrismetropolitana.pt',
		},
		{
			external: true,
			icon: <IconBook2 />,
			text: 'Blog',
			url: 'https://blog.carrismetropolitana.pt',
		},
	],
	nav: {
		title: (
			<>
				<Image alt="Carris Metropolitana" className="theme-light" height={50} src="/brands/cmet-light.svg" width={120} />
				<Image alt="Carris Metropolitana" className="theme-dark" height={50} src="/brands/cmet-dark.svg" width={120} />
			</>
		),
	},
};
