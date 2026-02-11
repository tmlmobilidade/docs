import { BlogTags } from '@/components/blog/BlogTags';
import { getMDXComponents } from '@/mdx-components';
import { BlogPage as BlogPageType } from '@/types/BlogPage';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import path from 'node:path';

export async function BlogPage({ page }: { page: BlogPageType }) {
	//

	//
	// A. Setup variables

	const tags = page.data['tags'] ?? [];
	const { body: Mdx, toc } = page.data;

	//
	// B. Render components

	return (
		<article className="flex flex-col mx-auto w-full max-w-[1400px] px-4 py-8">
			<div className="flex flex-row gap-4 text-sm mb-8">
				<div>
					<p className="mb-1 text-fd-muted-foreground">Written by</p>
					<p className="font-medium">{page.data['author']}</p>
				</div>
				<div>
					<p className="mb-1 text-sm text-fd-muted-foreground">At</p>
					<p className="font-medium">
						{new Date(
							page.data['date'] ?? path.basename(page.path, path.extname(page.path)),
						).toDateString()}
					</p>
				</div>
			</div>

			<div className="flex flex-row gap-4 text-sm mb-8">
				{BlogTags(tags)}
			</div>

			<h1 className="text-3xl font-semibold mb-4">
				{page.data.title}
			</h1>

			<p className="text-fd-muted-foreground mb-8">
				{page.data.description}
			</p>

			<div className="prose min-w-0 flex-1">

				<InlineTOC items={toc} />
				<Mdx components={getMDXComponents()} />
			</div>
		</article>
	);
}
