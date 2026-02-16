/* * */

import { BlogArticle, BlogHeader } from '@/components/blog';
import { sourceBlog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation';

/* * */

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const page = sourceBlog.getPage(params.slug ? [params.slug] : undefined);
	if (!page) notFound();

	return {
		description: page.data.description,
		title: page.data.title,
	};
}

/* * */

export async function generateStaticParams() {
	return sourceBlog.generateParams('slug').map(p => ({
		slug: (p.slug ?? []).join('/'),
	}));
}

/* * */

export default async function Page(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const page = sourceBlog.getPage(params.slug ? [params.slug] : undefined);
	if (!page) notFound();

	const data = 'load' in page.data ? await page.data.load() : page.data;
	const MDX = data.body;
	const components = getMDXComponents();

	return (
		<main className="mx-auto max-w-4xl px-4 pt-8 pb-16 md:px-6">
			<BlogHeader page={page} />
			<div className="mt-12">
				<BlogArticle>
					<MDX components={components} />
				</BlogArticle>
			</div>
		</main>
	);
}
