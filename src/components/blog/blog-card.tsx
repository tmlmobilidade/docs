import { cn } from '@/lib/cn';
import { getName } from '@/lib/getName';
import { BlogPost } from '@/types/BlogPost';
import { Link } from 'fumadocs-core/framework';

import { BlogCoverImage } from './blog-cover-image';
import { BlogPostMeta } from './blog-post-meta';
import { BlogTags } from './blog-tags';

interface BlogCardProps {
	post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
	const date = post.data.date ?? getName(post.path);
	const tags = (post.data.tags ?? []) as string[];
	const cover = post.data.cover as string | undefined;

	return (
		<Link
			href={post.url}
			className={cn(
				'group flex flex-col overflow-hidden rounded-2xl border border-(--color-system-border-100) bg-fd-card',
				'shadow-sm transition-all duration-200',
			)}
		>
			{cover && <BlogCoverImage src={cover} variant="card" />}
			<div className="flex flex-1 flex-col p-5">
				<BlogTags badgeClassName="px-2 py-0.5 text-[10px]" className="mb-2 gap-1.5" limit={3} tags={tags} />

				<h3 className="font-semibold text-fd-foreground transition-colors group-hover:text-(--color-brand-primary)">
					{post.data.title}
				</h3>

				<p className="mt-1.5 flex-1 text-sm leading-relaxed text-fd-muted-foreground line-clamp-2">
					{post.data.description}
				</p>

				<BlogPostMeta author={post.data.author} date={date} variant="compact" />
			</div>
		</Link>
	);
}
