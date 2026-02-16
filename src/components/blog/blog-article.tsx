/* * */

import { cn } from '@/lib/cn';

/* * */

interface BlogArticleProps {
	children: React.ReactNode
	className?: string
}

export function BlogArticle({ children, className }: BlogArticleProps) {
	return (
		<article
			className={cn(
				'prose mx-auto max-w-3xl',
				'prose-headings:font-semibold prose-headings:tracking-tight',
				'prose-p:leading-relaxed prose-p:text-fd-foreground/90',
				'prose-li:marker:text-[var(--color-brand-primary)]',
				'prose-blockquote:border-l-4 prose-blockquote:border-l-[var(--color-brand-primary)] prose-blockquote:bg-fd-muted/50 prose-blockquote:py-1 prose-blockquote:pr-4',
				'prose-table:border-collapse prose-th:border prose-th:border-fd-border prose-th:bg-fd-muted/50 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-fd-border prose-td:px-4 prose-td:py-2',
				className,
			)}
		>
			{children}
		</article>
	);
}
