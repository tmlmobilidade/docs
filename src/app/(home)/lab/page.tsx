import { BlogListing, BlogPageHeader } from '@/components/blog';
import { getName } from '@/lib/getName';
import { sourceBlog } from '@/lib/source';

export default function Page() {
	const posts = [...sourceBlog.getPages()].sort(
		(a, b) => new Date(b.data.date ?? getName(b.path)).getTime() - new Date(a.data.date ?? getName(a.path)).getTime(),
	);

	return (
		<main className="mx-auto max-w-7xl px-4 pt-8 pb-16 md:px-6">
			<BlogPageHeader
				description="Artigos, atualizações e recursos sobre transportes e mobilidade."
				title="Novidades"
			/>
			<BlogListing posts={posts} />
		</main>
	);
}
