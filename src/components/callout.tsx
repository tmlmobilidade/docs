/* eslint-disable @stylistic/no-mixed-spaces-and-tabs */
import type { ComponentProps, ReactNode } from 'react';

import { CircleCheck, CircleX, Info, Lightbulb, TriangleAlert } from 'lucide-react';

import { cn } from '../lib/cn';

export type CalloutType = 'error' | 'idea' | 'info' | 'success' | 'warn' | 'warning';

const iconClass = 'size-5 -me-0.5 fill-(--callout-color) text-fd-card';

export function Callout({
	children,
	title,
	...props
}: Omit<CalloutContainerProps, 'title'> & { title?: ReactNode }) {
	return (
		<CalloutContainer {...props}>
			{title && <CalloutTitle>{title}</CalloutTitle>}
			<CalloutDescription>{children}</CalloutDescription>
		</CalloutContainer>
	);
}

export interface CalloutContainerProps extends ComponentProps<'div'> {
	/**
   * Force an icon
   */
	icon?: ReactNode

	/**
   * @defaultValue info
   */
	type?: CalloutType
}

function resolveAlias(type: CalloutType) {
	if (type === 'warn') return 'warning';
	if ((type as unknown) === 'tip') return 'info';
	return type;
}

export function CalloutContainer({
	children,
	className,
	icon,
	style,
	type: inputType = 'info',
	...props
}: CalloutContainerProps) {
	const type = resolveAlias(inputType);

	return (
		<div
			className={cn(
				'flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md',
				className,
			)}
			style={
				{
					'--callout-color': `var(--color-fd-${type}, var(--color-fd-muted))`,
					...style,
				} as object
			}
			{...props}
		>
			<div className="w-0.5 bg-(--callout-color)/50 rounded-sm" role="none" />
			{icon
			  ?? { error: <CircleX className={iconClass} />,
			  	idea: <Lightbulb className="size-5 -me-0.5 fill-(--callout-color) text-(--callout-color)" />,
			  	info: <Info className={iconClass} />,
			  	success: <CircleCheck className={iconClass} />,
			  	warning: <TriangleAlert className={iconClass} />,
			  }[type]}
			<div className="flex flex-col gap-2 min-w-0 flex-1">{children}</div>
		</div>
	);
}

export function CalloutTitle({ children, className, ...props }: ComponentProps<'p'>) {
	return (
		<p className={cn('font-medium my-0!', className)} {...props}>
			{children}
		</p>
	);
}

export function CalloutDescription({ children, className, ...props }: ComponentProps<'p'>) {
	return (
		<div
			className={cn('text-fd-muted-foreground prose-no-margin empty:hidden', className)}
			{...props}
		>
			{children}
		</div>
	);
}
