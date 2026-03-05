/* * */

import { LabArticleCard } from '@/components/lab/LabArticleCard';
import { getName } from '@/lib/getName';
import { sourceLab } from '@/lib/source';

/* * */

interface LabListProps {
	limit?: number
	withViewAllLink?: boolean
}

/* * */

export function LabList({ limit, withViewAllLink }: LabListProps) {
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
		<section className="mx-auto mt-16 w-full max-w-[1400px] px-4 md:px-6">
			<LabListHeader />
			<LabListGrid limit={4} />

			{/* Mobile "ver todos" link */}
			<div className="mt-6 flex justify-center md:hidden">
				<Link
					className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 text-sm')}
					href="/lab"
				>
					Ver todos os artigos
					<ArrowRight className="size-3.5" />
				</Link>
			</div>
		</section>
	);
}
