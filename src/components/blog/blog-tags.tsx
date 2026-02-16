import { TagBadge } from './tag-badge';

interface BlogTagsProps {
	badgeClassName?: string
	className?: string
	limit?: number
	tags: string[]
}

export function BlogTags({ badgeClassName, className, limit, tags }: BlogTagsProps) {
	if (tags.length === 0) return null;

	const displayedTags = limit ? tags.slice(0, limit) : tags;

	return (
		<div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
			{displayedTags.map(tag => (
				<TagBadge key={tag} className={badgeClassName}>
					{tag}
				</TagBadge>
			))}
		</div>
	);
}
