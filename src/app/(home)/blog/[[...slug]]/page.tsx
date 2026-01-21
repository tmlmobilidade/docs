
import { blogListGenerateMetadata } from '@/components/blog/blogListGenerateMetadata/index';
import { blogListGenerateStaticParams } from '@/components/blog/blogListGenerateStaticParams/index';
import blogListPage from '@/components/blog/blogListPage/index';
import { Metadata } from 'next';
import { PageProps } from '@/types/PageProps';

export default function Page(props: PageProps) {
  return blogListPage(props);
}

export async function generateStaticParams() {
  return blogListGenerateStaticParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  return blogListGenerateMetadata(props);
}
