import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { PagePropsPromise } from '@/types/PagePropsPromise';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';

export async function docsListPage({ params }: PagePropsPromise) {
	const resolvedParams = await params;
	const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [resolvedParams.slug];

	const page = source.getPage(slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage full={page.data.full} toc={page.data.toc}>
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
