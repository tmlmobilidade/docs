import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Blockquote — Obsidian-style with left accent border                */
/* ------------------------------------------------------------------ */

export function Blockquote({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<'blockquote'>) {
	return (
		<blockquote
			className={cn(
				'my-4 border-l-4 border-l-blockquote-border bg-blockquote-bg rounded-r-lg',
				'py-3 pl-4 pr-4',
				'italic text-fd-muted-foreground',
				'[&>p]:m-0 [&>p]:leading-relaxed',
				className,
			)}
			{...props}
		>
			{children}
		</blockquote>
	);
}
