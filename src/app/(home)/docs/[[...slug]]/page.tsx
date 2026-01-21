
import { docsListGenerateMetadata } from '@/components/docs/docsListGenerateMetadata/index';
import { docsListGenerateStaticParams } from '@/components/docs/docsListGenerateStaticParams/index';
import { docsListPage } from '@/components/docs/docsListPage/index';
import { Metadata } from 'next';

// Correct PageProps typing
type PageProps = {
  params: { slug: string | string[] } | Promise<{ slug: string | string[] }>;
};

export default function Page(props: PageProps) {
  return docsListPage(props);
}

export async function generateStaticParams() {
  return docsListGenerateStaticParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  return docsListGenerateMetadata(props);
}
