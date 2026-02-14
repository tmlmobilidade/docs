/* * */

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/* * */

interface TagProps extends ComponentPropsWithoutRef<'span'> {
	/** The tag text (with or without leading #) */
	label: string
}

export function Tag({ className, label, ...props }: TagProps) {
	const display = label.startsWith('#') ? label : `#${label}`;

	return (
		<span
			className={cn(
				'inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5',
				'bg-tag-bg text-tag text-xs font-medium',
				'transition-colors hover:bg-tag/15',
				'cursor-default select-none',
				className,
			)}
			{...props}
		>
			{display}
		</span>
	);
}
