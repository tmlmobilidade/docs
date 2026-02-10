import { BlogGenerateMetadata } from '@/components/blog/BlogGenerateMetadata';
import { BlogGenerateStaticParams } from '@/components/blog/BlogGenerateStaticParams';
import { BlogList } from '@/components/blog/BlogList';
import { BlogPage } from '@/components/blog/BlogPage';
import { sourceBlog } from '@/lib/source';
import { PageProps } from '@/types/PageProps';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page({ params }: PageProps) {
	//

	//
	// A. Setup variables

	const resolvedParams = await params;
	const slug = resolvedParams?.slug ?? [];

	//
	// B. Render components

	if (slug.length === 0) {
		return <BlogList posts={sourceBlog.getPages()} />;
	}

	const page = sourceBlog.getPage(slug);
	if (!page) return notFound();

	return <BlogPage page={page} />;
}

export async function generateStaticParams() {
	const postParams = await BlogGenerateStaticParams();

	return [...postParams, { slug: [] }];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	return BlogGenerateMetadata(props);
}
