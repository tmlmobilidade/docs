export function BlogTags(tags?: unknown) {
	if (!Array.isArray(tags) || tags.length === 0) return null;

	return (
		<p className="mt-auto pt-4 text-xs flex flex-wrap gap-1">
			{tags.map((tag, idx) => (
				<span
					key={idx}
					className="inline-block bg-fd-muted-foreground font-medium px-2.5 py-0.5 rounded-full"
				>
					{String(tag)}
				</span>
			))}
		</p>
	);
}
