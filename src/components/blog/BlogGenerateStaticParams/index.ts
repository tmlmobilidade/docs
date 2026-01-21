import { blog } from '@/lib/source';

export async function BlogGenerateStaticParams(): Promise<{ slug: string[] }[]> {
	const pages = [...blog.getPages()];
	return pages.map(page => ({
		slug: page.slugs,
	}));
}
