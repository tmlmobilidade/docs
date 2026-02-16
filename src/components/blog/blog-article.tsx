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
				'prose mx-auto max-w-4xl',
				className,
			)}
		>
			{children}
		</article>
	);
}
