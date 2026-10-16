/* * */

import { sourceReference } from '@/lib/source';
// import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { getMDXComponents } from '@/mdx-components';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

/* * */

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = sourceReference.getPage(params.slug);
	if (!page) notFound();
	return {
		description: page.data.description,
		title: page.data.title,
	};
}

/* * */

export async function generateStaticParams() {
	return sourceReference.generateParams();
}

/* * */

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
	//

	//
	// A. Setup variables

	const params = await props.params;

	const page = sourceReference.getPage(params.slug);
	if (!page) notFound();

	//
	// B. Setup options

	const editOnGithubOptions = {
		owner: 'tmlmobilidade',
		path: `docs/reference/${page.path}`,
		repo: 'docs',
		sha: 'production',
	};

	// const lastUpdateOptions = await getGithubLastEdit({
	// 	owner: 'tmlmobilidade',
	// 	path: `docs/reference/${page.path}`,
	// 	repo: 'docs',
	// });

	const MDX = page.data.body;

	//
	// C. Render components

	return (
		<DocsPage
			editOnGithub={editOnGithubOptions}
			// lastUpdate={new Date(lastUpdateOptions ?? 0)}
			toc={page.data.toc}
			tableOfContent={{
				enabled: true,
				style: 'clerk',
			}}
			full
		>
			<div>
				<DocsTitle>{page.data.title}</DocsTitle>
				<DocsDescription className="text-md mb-4">{page.data.description}</DocsDescription>
			</div>
			<DocsBody>
				<MDX components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	);
}
