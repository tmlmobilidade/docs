import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PagePropsPromise } from '@/types/PagePropsPromise';

export async function docsListGenerateMetadata({ params }: PagePropsPromise): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [resolvedParams.slug];

  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
