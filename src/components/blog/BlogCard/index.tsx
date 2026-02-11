import { BlogTags } from '@/components/blog/BlogTags';
import { getName } from '@/lib/getName';
import { BlogPost } from '@/types/BlogPost';
import Link from 'next/link';

export async function blogCard(post: BlogPost) {
	return (
		<Link
			key={post.url}
			className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-5 shadow-sm transition-all duration-200 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5"
			href={post.url}
		>
			<p className="font-semibold text-fd-foreground group-hover:text-brand transition-colors">
				{post.data.title}
			</p>
			<p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground line-clamp-3">
				{post.data.description}
			</p>
			{BlogTags(post.data['tags'] ?? [])}
			<p className="mt-auto pt-4 text-xs font-medium text-brand/70">
				{post.data['author']}
				<span className="mx-1.5 text-fd-muted-foreground">&middot;</span>
				{new Date(
					post.data['date'] ?? getName(post.path),
				).toLocaleDateString('pt-PT', {
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				})}
			</p>
		</Link>
	);
}
