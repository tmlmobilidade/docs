/* * */

import { cn } from '@/lib/cn';

/* * */

export function TagBadge({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<'span'>) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
				'bg-(--color-brand-background)/80 text-(--color-brand-primary)',
				'border border-(--color-brand-primary)/20',
				'transition-colors duration-150',
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
}
