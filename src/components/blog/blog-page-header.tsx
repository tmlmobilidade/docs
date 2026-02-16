interface BlogPageHeaderProps {
	className?: string
	description?: string
	title: string
}

export function BlogPageHeader({ className, description, title }: BlogPageHeaderProps) {
	return (
		<div className={`mb-12 ${className ?? ''}`}>
			<h1 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">{title}</h1>
			{description && <p className="mt-2 text-lg text-fd-muted-foreground">{description}</p>}
		</div>
	);
}
