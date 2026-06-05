/* * */

import { GoLogo } from '@/components/brand/GoLogo';
import { LoginButton } from '@/components/brand/LoginButton';
import { LinkItemType } from 'fumadocs-ui/layouts/shared';

import { getCurrentEnvironment } from './environment';

/* * */

export const BASE_OPTIONS = {

	gforms_url: 'https://docs.google.com/forms/d/e/1FAIpQLSdYVBZ3p0tRwbtle9BeWnKw0ofs7eDC3RoYXKOJd02UEoXZgw/viewform',

	github_url: 'https://github.com/tmlmobilidade',

	go_url: getCurrentEnvironment() === 'development' ? 'http://localhost:51000/auth/login' : '/auth/login',

	title: <GoLogo />,

};

/* * */

export const NAVBAR_LINKS: LinkItemType[] = [
	// {
	// 	active: 'nested-url',
	// 	text: 'Laboratório',
	// 	url: '/lab',
	// },
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
