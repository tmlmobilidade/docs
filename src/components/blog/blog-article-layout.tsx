import type { TOCItemType } from 'fumadocs-core/toc';

import { TOCProvider, TOCScrollArea } from 'fumadocs-ui/components/toc';
import { TOCItems } from 'fumadocs-ui/components/toc/clerk';

interface BlogArticleLayoutProps {
	children: React.ReactNode
	header: React.ReactNode
	toc?: TOCItemType[]
}

export function BlogArticleLayout({ children, header, toc = [] }: BlogArticleLayoutProps) {
	const hasToc = toc.length > 0;

	const content = (
		<>
			{header}
			<div className={hasToc ? 'mt-12 flex flex-col gap-12 xl:flex-row xl:gap-12' : 'mt-12'}>
				{children}
				{hasToc && (
					<aside className="sticky top-24 hidden h-[calc(100vh-8rem)] flex-col pl-8 xl:flex xl:w-64 xl:shrink-0">
						<TOCScrollArea className="flex-1 overflow-y-auto">
							<TOCItems />
						</TOCScrollArea>
					</aside>
				)}
			</div>
		</>
	);

	return (
		<main
			className={
				hasToc
					? 'mx-auto max-w-5xl px-4 pt-8 pb-16 md:px-6 xl:max-w-7xl'
					: 'mx-auto max-w-4xl px-4 pt-8 pb-16 md:px-6'
			}
		>
			{hasToc ? <TOCProvider toc={toc}>{content}</TOCProvider> : content}
		</main>
	);
}
