import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import { NavbarMenu } from 'fumadocs-ui/layouts/home/navbar';
import { LayoutProps } from '@/types/LayoutProps';

export default function Layout({ children }: LayoutProps) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu />
          ),
        },
        ...linkItems,
      ]}
    >
      {children}
    </HomeLayout>
  );
}
