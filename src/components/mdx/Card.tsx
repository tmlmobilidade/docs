import { cn } from '@/lib/cn';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Card — Obsidian-inspired card with optional icon and link          */
/* ------------------------------------------------------------------ */

interface CardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
	/** Card title */
	title: ReactNode;
	/** Optional description text */
	description?: ReactNode;
	/** Optional icon (emoji, Lucide icon, etc.) */
	icon?: ReactNode;
	/** If provided, the card becomes a link */
	href?: string;
	/** Children rendered as card body */
	children?: ReactNode;
}

export function Card({
	title,
	description,
	icon,
	href,
	className,
	children,
	...props
}: CardProps) {
	const content = (
		<>
			{icon && (
				<span className="mb-2 flex size-10 items-center justify-center rounded-lg bg-fd-muted text-lg">
					{icon}
				</span>
			)}
			<h3 className="font-semibold text-fd-foreground text-sm">{title}</h3>
			{description && (
				<p className="mt-1 text-sm text-fd-muted-foreground leading-relaxed">
					{description}
				</p>
			)}
			{children && <div className="mt-2 text-sm text-fd-muted-foreground">{children}</div>}
		</>
	);

	const cardClasses = cn(
		'flex flex-col rounded-xl border border-fd-border bg-fd-card p-4',
		'shadow-sm transition-all duration-200',
		'hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5',
		className,
	);

	if (href) {
		return (
			<Link className={cardClasses} href={href} {...(props as ComponentPropsWithoutRef<'a'>)}>
				{content}
			</Link>
		);
	}

	return (
		<div className={cardClasses} {...props}>
			{content}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Cards — Grid container for multiple Card items                     */
/* ------------------------------------------------------------------ */

export function Cards({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={cn(
				'grid grid-cols-1 gap-4 my-4 md:grid-cols-2',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
