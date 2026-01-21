export function blogTags(tags: string[]) {
	return (
		<p className="mt-auto pt-4 text-xs">
			{tags?.map((tag: string, idx: number) => (
				<span
					key={idx}
					className="inline-block bg-fd-muted-foreground font-medium px-2.5 py-0.5 rounded-full"
				>
					{tag}
				</span>
			))}
		</p>
	);
}
