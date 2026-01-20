import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import { NavbarMenu, NavbarMenuContent, NavbarMenuLink, NavbarMenuTrigger } from 'fumadocs-ui/layouts/home/navbar';

type LayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ slug?: string[] }> | { slug?: string[] };
};

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
