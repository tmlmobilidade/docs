import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import { NavbarMenu, NavbarMenuContent, NavbarMenuLink, NavbarMenuTrigger } from 'fumadocs-ui/layouts/home/navbar';
import { Book, ComponentIcon, Link } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: 'Documentation',
          items: [
            {
              text: 'Getting Started',
              url: '/docs',
              icon: <Book />,
            },
            {
              text: 'Components',
              url: '/docs/ui/components',
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs">Documentation</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs" className="md:row-span-2">
                  <div className="-mx-3 -mt-3"></div>
                  <p className="font-medium">Getting Started</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn documentation to intelligent beings.
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...linkItems,
      ]}
    >
      {children}
    </HomeLayout>
  );
}
