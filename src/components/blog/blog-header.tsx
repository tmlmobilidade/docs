import { getName } from '@/lib/getName';
import { BlogPage } from '@/types/BlogPage';

import { BlogCoverImage } from './blog-cover-image';
import { BlogPostMeta } from './blog-post-meta';
import { BlogTags } from './blog-tags';

interface BlogHeaderProps {
	page: BlogPage
}

export function BlogHeader({ page }: BlogHeaderProps) {
	const date = page.data.date ?? getName(page.path);
	const tags = (page.data.tags ?? []) as string[];
	const cover = page.data.cover as string | undefined;

	return (
		<header className="relative">
			{cover && (
				<div className="relative -mx-4 mb-8 overflow-hidden rounded-2xl md:-mx-6 lg:mx-0">
					<BlogCoverImage src={cover} variant="hero" priority />
				</div>
			)}

			<div className="space-y-4">
				<BlogTags tags={tags} />

				<h1 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl lg:text-5xl">
					{page.data.title}
				</h1>

				{page.data.description && (
					<p className="text-lg text-fd-muted-foreground md:text-xl">{page.data.description}</p>
				)}

				<BlogPostMeta author={page.data.author} date={date} />
			</div>
		</header>
	);
}
