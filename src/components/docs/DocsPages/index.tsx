import { sourceDocs } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { PagePropsPromise } from '@/types/PagePropsPromise';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';

export async function DocsPages({ params }: PagePropsPromise) {
	const resolvedParams = await params;
	const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [resolvedParams.slug];

	const page = sourceDocs.getPage(slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			tableOfContent={{
				enabled: true,
				style: 'clerk',
			}}
			full
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX
					components={getMDXComponents({
						a: createRelativeLink(sourceDocs, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}
