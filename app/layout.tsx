/* * */

import './global.css';

/* * */

import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { type PropsWithChildren } from 'react';

/* * */

const inter = Inter({
	subsets: ['latin'],
});

/* * */

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html className={inter.className} lang="en" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
