/* * */

import { GoLogo } from '@/components/brand/GoLogo';
import { LoginButton } from '@/components/brand/LoginButton';
import { type LinkItemType } from 'fumadocs-ui/utils/link-item';

import { getCurrentEnvironment } from './environment';

/* * */

export const BASE_OPTIONS = {

	github_url: 'https://github.com/tmlmobilidade',

	go_url: getCurrentEnvironment() === 'development' ? 'http://localhost:51000/auth/login' : '/auth/login',

	title: <GoLogo />,

};

/* * */

export const NAVBAR_LINKS: LinkItemType[] = [
	{
		active: 'nested-url',
		text: 'Novidades',
		url: '/lab',
	},
	{
		active: 'nested-url',
		text: 'Documentação',
		url: '/docs',
	},
	{
		children: <LoginButton />,
		on: 'nav',
		type: 'custom',
	},
];
