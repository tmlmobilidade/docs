import { BlogTags } from '@/components/blog/BlogTags';
import { getName } from '@/lib/getName';
import { BlogPost } from '@/types/BlogPost';
import Link from 'next/link';

export async function blogCard(post: BlogPost) {
	return (

		<Link
			key={post.url}
			className="flex flex-col bg-fd-card rounded-2xl border shadow-sm p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
			href={post.url}
		>
			<p className="font-medium">{post.data.title}</p>
			<p className="text-sm text-fd-muted-foreground">
				{post.data.description}
			</p>
			{BlogTags(post.data.tags)}
			<p className="mt-auto pt-4 text-xs text-brand">
				{post.data.author}&nbsp; - &nbsp;
				{new Date(
					post.data.date ?? getName(post.path),
				).toDateString()}
			</p>
		</Link>
	);
}
