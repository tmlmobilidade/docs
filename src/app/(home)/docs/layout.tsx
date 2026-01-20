import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export type LayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ slug?: string[] }> | { slug?: string[] };
};

export default function Layout({ children }: LayoutProps) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
