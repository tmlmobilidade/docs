import { formatBlogDate } from '@/lib/blog-utils';

type BlogPostMetaVariant = 'compact' | 'default';

interface BlogPostMetaProps {
	author?: string
	className?: string
	date: Date | string
	variant?: BlogPostMetaVariant
}

export function BlogPostMeta({ author, className, date, variant = 'default' }: BlogPostMetaProps) {
	const dateStr = formatBlogDate(date, variant === 'compact' ? 'short' : 'long');

	if (variant === 'compact') {
		return (
			<div
				className={`mt-4 flex items-center justify-between border-t border-fd-border pt-4 text-xs ${className ?? ''}`}
			>
				<time className="font-medium text-(--color-brand-primary)/80" dateTime={String(date)}>
					{dateStr}
				</time>
				{author && <span className="text-fd-muted-foreground">{author}</span>}
			</div>
		);
	}

	return (
		<div
			className={`flex flex-wrap items-center gap-x-6 gap-y-1 border-fd-border pt-4 text-sm text-fd-muted-foreground ${className ?? ''}`}
		>
			{author && <span className="font-medium">{author}</span>}
			<time dateTime={String(date)}>{dateStr}</time>
		</div>
	);
}
