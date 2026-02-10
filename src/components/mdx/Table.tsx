import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Table — Obsidian-inspired clean table with responsive scroll       */
/* ------------------------------------------------------------------ */

export function Table({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<'table'>) {
	return (
		<div className="my-4 w-full overflow-x-auto rounded-lg border border-fd-border">
			<table
				className={cn(
					'w-full border-collapse text-sm',
					/* Header styling */
					'[&_thead]:bg-fd-muted/50',
					'[&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-fd-foreground',
					'[&_th]:border-b [&_th]:border-fd-border',
					/* Body styling */
					'[&_td]:px-4 [&_td]:py-2.5 [&_td]:text-fd-foreground',
					'[&_td]:border-b [&_td]:border-fd-border/50',
					/* Alternating rows */
					'[&_tbody_tr:nth-child(even)]:bg-fd-muted/25',
					/* Hover */
					'[&_tbody_tr]:transition-colors',
					'[&_tbody_tr:hover]:bg-fd-accent/50',
					/* Remove last row border */
					'[&_tbody_tr:last-child_td]:border-b-0',
					className,
				)}
				{...props}
			>
				{children}
			</table>
		</div>
	);
}
