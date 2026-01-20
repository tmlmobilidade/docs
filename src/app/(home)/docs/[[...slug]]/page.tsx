import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

// Correct PageProps typing
type PageProps = {
  params: { slug: string | string[] } | Promise<{ slug: string | string[] }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Unwrap the promise
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [resolvedParams.slug];

  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

// Generate static params
export async function generateStaticParams() {
  try {
    const params = source.generateParams();
    if (!params || !params.length) {
      console.warn('generateParams returned nothing, using fallback');
      return [{ slug: ['placeholder'] }];
    }
    return params;
  } catch (e) {
    console.error('Error generating params:', e);
    return [{ slug: ['placeholder'] }];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
