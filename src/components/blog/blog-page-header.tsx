import { cn } from '@/lib/cn';

interface BlogPageHeaderProps {
	className?: string
	description?: string
	title: string
}

export function BlogPageHeader({ className, description, title }: BlogPageHeaderProps) {
	return (
		<div className={cn('w-full flex flex-col mb-10 p-10 rounded-2xl border-(--color-system-border-100) bg-(--color-brand-primary) dark:bg-(--color-brand-secondary) relative', className)}>
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,var(--color-brand-contrast)_1px,transparent_1px)] bg-size-[24px_24px] opacity-30"
			/>
			<h1 className="text-3xl font-bold tracking-tight text-(--color-system-background-100) dark:text-(--color-system-text-100) md:text-4xl">{title}</h1>
			{description && <p className="text-lg text-(--color-brand-contrast)/90">{description}</p>}
		</div>
	);
}
