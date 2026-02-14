import { sourceBlog } from '@/lib/source';

export async function blogGenerateStaticParams(): Promise<{ slug: string[] }[]> {
	//

	//
	// A. Setup variables

	const pages = sourceBlog.getPages();

	const params = pages.map(page => ({
		slug: page.slugs,
	}));

	params.push({ slug: [] });

	//
	// B. Render components

	return params;
}
