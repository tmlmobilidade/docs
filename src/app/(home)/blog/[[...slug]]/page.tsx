import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import path from 'node:path';
import { blog } from '@/lib/source';
import { createMetadata, getSiteMetadata } from '@/lib/metadata';
import { buttonVariants } from '@/components/ui/button';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { getMDXComponents } from '@/mdx-components';
import { cn } from '@/lib/cn';
import { PathUtils } from 'fumadocs-core/source';
import { PageProps } from '@/types/PageProps'
import { getName } from '@/lib/getName';

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? [];

  // --------------------------
  // Case 1: No slug -> list all blogs
  if (slug.length === 0) {
    const posts = [...blog.getPages()].sort(
      (a, b) =>
        new Date(b.data.date ?? getName(b.path)).getTime() -
        new Date(a.data.date ?? getName(a.path)).getTime()
    );

    const { siteName } = getSiteMetadata();

    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 pb-12 md:py-12">
        <div className="relative dark aspect-[4] p-8">
          <h1 className="mb-4 text-3xl text-landing-foreground font-mono font-medium">
            {siteName} Blog
          </h1>
          <p className="text-sm font-mono text-landing-foreground-200">
            Latest announcements of {siteName}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className="flex flex-col bg-fd-card rounded-2xl border shadow-sm p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              <p className="font-medium">{post.data.title}</p>
              <p className="text-sm text-fd-muted-foreground">{post.data.description}</p>
              <p className="mt-auto pt-4 text-xs text-brand">
                {new Date(post.data.date ?? getName(post.path)).toDateString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  // --------------------------
  // Case 2: Slug exists -> show single blog
  const page = blog.getPage(slug);
  if (!page) notFound();

  const { body: Mdx, toc } = await page.data.load();

  return (
    <article className="flex flex-col mx-auto w-full max-w-[800px] px-4 py-8">
      <div className="flex flex-row gap-4 text-sm mb-8">
        <div>
          <p className="mb-1 text-fd-muted-foreground">Written by</p>
          <p className="font-medium">{page.data.author}</p>
        </div>
        <div>
          <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
          <p className="font-medium">
            {new Date(page.data.date ?? path.basename(page.path, path.extname(page.path))).toDateString()}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-4">{page.data.title}</h1>
      <p className="text-fd-muted-foreground mb-8">{page.data.description}</p>

      <div className="prose min-w-0 flex-1">
        <div className="flex flex-row gap-2 mb-8 not-prose">
          <Link
            href="/blog"
            className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }))}
          >
            Back
          </Link>
        </div>

        <InlineTOC items={toc} />
        <Mdx components={getMDXComponents()} />
      </div>
    </article>
  );
}

// --------------------------
// Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? [];

  // Case: all blogs
  if (slug.length === 0) {
    const { siteName } = getSiteMetadata();
    return { title: `${siteName} Blog` };
  }

  const page = blog.getPage(slug);
  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
  });
}

// --------------------------
// Static params for pre-rendering
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const pages = [...blog.getPages()];
  return pages.map((page) => ({
    slug: page.slugs, // full slug array
  }));
}
