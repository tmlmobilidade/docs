/* * */

import '@/styles/font.css';
import '@/styles/color.css';
import '@/styles/global.css';

/* * */

import { BaseProvider } from '@/providers/BaseProvider';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type PropsWithChildren } from 'react';

/* * */

export const metadata = {
	description: 'APIs, links, guias e recursos para a rede de transportes públicos da Área Metropolitana de Lisboa.',
	title: 'TML | GO',
};

/* * */

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<BaseProvider>
						{children}
					</BaseProvider>
				</RootProvider>
			</body>
		</html>
	);
}
