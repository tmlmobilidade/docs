/* * */

import { GoLogo } from '@/components/brand/GoLogo';
import { type LinkItemType } from 'fumadocs-ui/utils/link-item';

/* * */

export const BASE_OPTIONS = {

	github_url: 'https://github.com/tmlmobilidade/docs',

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
];
