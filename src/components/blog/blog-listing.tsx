/* * */

import { cn } from '@/lib/cn';
import { LabArticle } from '@/types/lab-article';

import { BlogCard } from './blog-card';

/* * */

interface BlogListingProps {
	className?: string
	posts: LabArticle[]
}

export function BlogListing({ className, posts }: BlogListingProps) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
				className,
			)}
		>
			{posts.map(post => (
				<BlogCard key={post.url} post={post} />
			))}
		</div>
	);
}
