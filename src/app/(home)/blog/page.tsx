import { BlogListing } from '@/components/blog';
import { getName } from '@/lib/getName';
import { sourceBlog } from '@/lib/source';

export default function Page() {
	const posts = [...sourceBlog.getPages()].sort(
		(a, b) => new Date(b.data.date ?? getName(b.path)).getTime() - new Date(a.data.date ?? getName(a.path)).getTime(),
	);

	return (
		<main className="mx-auto max-w-7xl px-4 pt-8 pb-16 md:px-6">
			<div className="mb-12">
				<h1 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
					Novidades
				</h1>
				<p className="mt-2 text-lg text-fd-muted-foreground">
					Artigos, atualizações e recursos sobre transportes e mobilidade.
				</p>
			</div>
			<BlogListing posts={posts} />
		</main>
	);
}
