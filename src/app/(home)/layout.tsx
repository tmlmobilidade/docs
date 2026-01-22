import { baseOptions, linkItems } from '@/lib/layout.shared';
import { LayoutProps } from '@/types/LayoutProps';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { NavbarMenu } from 'fumadocs-ui/layouts/home/navbar';

export default function Layout({ children }: LayoutProps) {
	return (
		<HomeLayout
			{...baseOptions()}
			links={[
				{
					children: (
						<NavbarMenu />
					),
					on: 'nav',
					type: 'custom',
				},
				...linkItems,
			]}
		>
			{children}
		</HomeLayout>
	);
}
