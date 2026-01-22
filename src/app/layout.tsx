import { Provider } from '@/components/provider';
import { LayoutProps } from '@/types/LayoutProps';

import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps) {
	return (
		<html className={inter.className} lang="en" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
