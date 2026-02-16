import { cn } from '#/src/lib/cn';

interface BlogPageHeaderProps {
	className?: string
	description?: string
	title: string
}

export function BlogPageHeader({ className, description, title }: BlogPageHeaderProps) {
	return (
		<div className={cn('w-full flex flex-col gap-2 mb-10 p-10 rounded-2xl border-(--color-system-border-100) bg-fd-primary relative', className)}>
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,var(--color-brand-contrast)_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"
			/>
			<h1 className="text-3xl font-bold tracking-tight text-(--color-brand-contrast) md:text-4xl">{title}</h1>
			{description && <p className="text-lg text-(--color-brand-contrast)/80">{description}</p>}
		</div>
	);
}
