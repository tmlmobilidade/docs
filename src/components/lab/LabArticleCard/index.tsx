/* * */

import { BlogCoverImage } from '@/components/blog/blog-cover-image';
import { BlogPostMeta } from '@/components/blog/blog-post-meta';
import { BlogTags } from '@/components/blog/blog-tags';
import { cn } from '@/lib/cn';
import { getName } from '@/lib/getName';
import { type LabArticle } from '@/types/lab-article';
import { Link } from 'fumadocs-core/framework';

/* * */

interface LabArticleCardProps {
	data: LabArticle
}

/* * */

export function LabArticleCard({ data }: LabArticleCardProps) {
	//

	//
	// A. Setup variables

	const date = data.data.date ?? getName(data.path);
	const tags = (data.data.tags ?? []) as string[];
	const cover = data.data.cover as string | undefined;

	//
	// B. Render components

	return (
		<Link
			href={data.url}
			className={cn(
				'group flex flex-col overflow-hidden rounded-2xl border border-(--color-system-border-100) bg-fd-card',
				'shadow-sm transition-all duration-200',
			)}
		>
			{cover && <BlogCoverImage src={cover} variant="card" />}
			<div className="flex flex-1 flex-col p-5">
				<BlogTags badgeClassName="px-2 py-0.5 text-[10px]" className="mb-2 gap-1.5" limit={3} tags={tags} />

				<h3 className="font-semibold text-fd-foreground transition-colors group-hover:text-(--color-brand-primary)">
					{data.data.title}
				</h3>

				<p className="mt-1.5 flex-1 text-sm leading-relaxed text-fd-muted-foreground line-clamp-2">
					{data.data.description}
				</p>

				<BlogPostMeta author={data.data.author} date={date} variant="compact" />
			</div>
		</Link>
	);
}
