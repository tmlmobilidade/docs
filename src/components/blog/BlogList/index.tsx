import { blogCard } from '@/components/blog/BlogCard';
import { blogListHeader } from '@/components/blog/BlogListHeader/index';
import { getName } from '@/lib/getName';
import { BlogPost } from '@/types/BlogPost';

export function BlogList({ posts }: { posts: BlogPost[] }) {
	posts.sort(
		(a, b) =>
			new Date(b.data.date ?? getName(b.path)).getTime() - new Date(a.data.date ?? getName(a.path)).getTime(),
	);
	return (
		<main className="mx-auto w-full max-w-[1400px] px-4 pb-12 md:py-12">
			{blogListHeader()}
			<div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
				{posts.map(post => blogCard(post))}
			</div>
		</main>
	);
}
