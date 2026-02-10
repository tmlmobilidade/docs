import { Tag } from '@/components/mdx/Tag';

export function BlogTags(tags?: string | string[]) {
	if (!Array.isArray(tags) || tags.length === 0) return null;

	return (
		<div className="mt-3 flex flex-wrap gap-1.5">
			{tags.map((tag, idx) => (
				<Tag key={idx} label={String(tag)} />
			))}
		</div>
	);
}
