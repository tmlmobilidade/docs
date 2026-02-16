/* * */

import { BlogArticle, BlogHeader } from '@/components/blog';
import { sourceBlog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { TOCItems } from 'fumadocs-ui/components/toc/clerk';
import { TOCProvider, TOCScrollArea } from 'fumadocs-ui/components/toc/index';
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
	const toc = (data.toc ?? []) as import('fumadocs-core/toc').TOCItemType[];
	const hasToc = toc.length > 0;

	const content = (
		<>
			<BlogHeader page={page} />
			<div
				className={
					hasToc
						? 'mt-12 flex flex-col gap-12 xl:flex-row xl:gap-12'
						: 'mt-12'
				}
			>
				<BlogArticle>
					<MDX components={components} />
				</BlogArticle>
				{hasToc && (
					<div className="sticky top-24 hidden h-[calc(100vh-8rem)] flex-col pl-8 xl:flex xl:w-64 xl:shrink-0">
						<TOCScrollArea className="flex-1 overflow-y-auto">
							<TOCItems />
						</TOCScrollArea>
					</div>
				)}
			</div>
		</>
	);

	return (
		<main
			className={
				hasToc
					? 'mx-auto max-w-5xl px-4 pt-8 pb-16 md:px-6 xl:max-w-7xl'
					: 'mx-auto max-w-4xl px-4 pt-8 pb-16 md:px-6'
			}
		>
			{hasToc ? (
				<TOCProvider toc={toc}>{content}</TOCProvider>
			) : (
				content
			)}
		</main>
	);
}
