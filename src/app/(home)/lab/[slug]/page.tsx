import type { TOCItemType } from 'fumadocs-core/toc';

import { BlogArticle, BlogArticleLayout, BlogHeader } from '@/components/blog';
import { sourceLab } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const page = sourceLab.getPage(params.slug ? [params.slug] : undefined);
	if (!page) notFound();

	return {
		description: page.data.description,
		title: page.data.title,
	};
}

export async function generateStaticParams() {
	return sourceLab.generateParams('slug').map(p => ({
		slug: (p.slug ?? []).join('/'),
	}));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const page = sourceLab.getPage(params.slug ? [params.slug] : undefined);
	if (!page) notFound();

	const data = 'load' in page.data ? await page.data.load() : page.data;
	const MDX = data.body;
	const components = getMDXComponents();
	const toc = (data.toc ?? []) as TOCItemType[];

	return (
		<BlogArticleLayout
			header={<BlogHeader page={page} />}
			toc={toc}
		>
			<BlogArticle>
				<MDX components={components} />
			</BlogArticle>
		</BlogArticleLayout>
	);
}
