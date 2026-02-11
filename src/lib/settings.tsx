/* * */

import { GoLogo } from '@/components/brand/GoLogo';
import { LoginButton } from '@/components/brand/LoginButton';
import { IconExternalLink } from '@tabler/icons-react';
import { type LinkItemType } from 'fumadocs-ui/utils/link-item';

/* * */

export const BASE_OPTIONS = {

	github_url: 'https://github.com/tmlmobilidade/docs',

	go_url: 'https://go.tmlmobilidade.pt',

	title: <GoLogo />,

};

/* * */

export const NAVBAR_LINKS: LinkItemType[] = [
	{
		active: 'nested-url',
		text: 'Novidades',
		url: '/blog',
	},
	{
		active: 'nested-url',
		text: 'Documentação',
		url: '/reference',
	},
	{
		children: <LoginButton />,
		on: 'nav',
		type: 'custom',
	},
];
