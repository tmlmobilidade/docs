/* * */

import { LabArticleCard } from '@/components/lab/LabArticleCard';
import { getName } from '@/lib/getName';
import { sourceLab } from '@/lib/source';

/* * */

interface LabArticlesGridProps {
	limit?: number
}

/* * */

export function LabArticlesGrid({ limit }: LabArticlesGridProps) {
	//

	//
	// A. Transform data

	const sortedLabArticles = sourceLab.getPages()
		.filter(page => page.data.published)
		.sort((a, b) => getName(b.path).localeCompare(getName(a.path)));

	const slicedLabArticles = typeof limit === 'number'
		? sortedLabArticles.slice(0, limit)
		: sortedLabArticles;

	//
	// B. Render components

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
			{slicedLabArticles.map(item => (
				<LabArticleCard key={item.url} data={item} />
			))}
		</div>
	);
}
