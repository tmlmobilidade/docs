import { getName } from '#/src/lib/getName';
import { BlogPost } from '#/src/types/BlogPost';
import { cn } from '@/lib/cn';
import { Link } from 'fumadocs-core/framework';
import Image from 'next/image';

import { TagBadge } from './tag-badge';

export function BlogCard({ post }: { post: BlogPost }) {
	const dateStr = new Date(post.data['date'] ?? getName(post.path)).toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
	const tags = (post.data.tags ?? []) as string[];
	const cover = post.data.cover as string | undefined;

	return (
		<Link
			key={post.url}
			href={post.url}
			className={cn(
				'group flex flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card',
				'shadow-sm transition-all duration-200',
				'hover:border-[var(--color-brand-primary)]/40 hover:shadow-lg hover:-translate-y-0.5',
			)}
		>
			{cover && (
				<div className="relative aspect-[16/10] w-full overflow-hidden bg-fd-muted">
					<Image
						alt=""
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
						src={cover}
						fill
					/>
				</div>
			)}
			<div className="flex flex-1 flex-col p-5">
				{tags.length > 0 && (
					<div className="mb-2 flex flex-wrap gap-1.5">
						{tags.slice(0, 3).map(tag => (
							<TagBadge key={tag} className="px-2 py-0.5 text-[10px]">
								{tag}
							</TagBadge>
						))}
					</div>
				)}
				<h3 className="font-semibold text-fd-foreground transition-colors group-hover:text-[var(--color-brand-primary)]">
					{post.data.title}
				</h3>
				<p className="mt-1.5 flex-1 text-sm leading-relaxed text-fd-muted-foreground line-clamp-2">
					{post.data.description}
				</p>
				<div className="mt-4 flex items-center justify-between border-t border-fd-border pt-4">
					<span className="text-xs font-medium text-[var(--color-brand-primary)]/80">
						{dateStr}
					</span>
					{post.data.author && (
						<span className="text-xs text-fd-muted-foreground">{post.data.author}</span>
					)}
				</div>
			</div>
		</Link>
	);
}
