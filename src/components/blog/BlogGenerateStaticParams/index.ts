import { blog } from '@/lib/source';

export async function BlogGenerateStaticParams(): Promise<{ slug: string[] }[]> {
	const pages = blog.getPages();

	const params = pages.map(page => ({
		slug: page.slugs,
	}));

	params.push({ slug: [] });

	return params;
}
