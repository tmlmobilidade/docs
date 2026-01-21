import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Correct PageProps typing
type PageProps = {
  params: { slug: string | string[] } | Promise<{ slug: string | string[] }>;
};

export async function docsListGenerateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Important: unwrap the promise
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
