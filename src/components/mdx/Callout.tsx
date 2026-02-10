'use client';

import { cn } from '@/lib/cn';
import {
	AlertOctagon,
	AlertTriangle,
	Info,
	Lightbulb,
	MessageCircle,
	Quote,
} from 'lucide-react';
import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	useState,
} from 'react';

/* ------------------------------------------------------------------ */
/*  Type → style mapping                                               */
/* ------------------------------------------------------------------ */

const calloutConfig: Record<
	string,
	{ icon: ReactNode; colorClass: string; borderClass: string; bgClass: string }
> = {
	danger: {
		bgClass: 'bg-callout-danger/8',
		borderClass: 'border-l-callout-danger',
		colorClass: 'text-callout-danger',
		icon: <AlertOctagon className="size-5 shrink-0" />,
	},
	error: {
		bgClass: 'bg-callout-danger/8',
		borderClass: 'border-l-callout-danger',
		colorClass: 'text-callout-danger',
		icon: <AlertOctagon className="size-5 shrink-0" />,
	},
	info: {
		bgClass: 'bg-callout-info/8',
		borderClass: 'border-l-callout-info',
		colorClass: 'text-callout-info',
		icon: <Info className="size-5 shrink-0" />,
	},
	note: {
		bgClass: 'bg-callout-note/8',
		borderClass: 'border-l-callout-note',
		colorClass: 'text-callout-note',
		icon: <Info className="size-5 shrink-0" />,
	},
	quote: {
		bgClass: 'bg-callout-quote/8',
		borderClass: 'border-l-callout-quote',
		colorClass: 'text-callout-quote',
		icon: <Quote className="size-5 shrink-0" />,
	},
	success: {
		bgClass: 'bg-callout-tip/8',
		borderClass: 'border-l-callout-tip',
		colorClass: 'text-callout-tip',
		icon: <Lightbulb className="size-5 shrink-0" />,
	},
	tip: {
		bgClass: 'bg-callout-tip/8',
		borderClass: 'border-l-callout-tip',
		colorClass: 'text-callout-tip',
		icon: <Lightbulb className="size-5 shrink-0" />,
	},
	warning: {
		bgClass: 'bg-callout-warning/8',
		borderClass: 'border-l-callout-warning',
		colorClass: 'text-callout-warning',
		icon: <AlertTriangle className="size-5 shrink-0" />,
	},
};

const fallbackConfig = {
	bgClass: 'bg-callout-note/8',
	borderClass: 'border-l-callout-note',
	colorClass: 'text-callout-note',
	icon: <MessageCircle className="size-5 shrink-0" />,
};

/* ------------------------------------------------------------------ */
/*  Callout (root wrapper — replaces ObsidianCallout)                  */
/* ------------------------------------------------------------------ */

interface CalloutProps extends ComponentPropsWithoutRef<'div'> {
	type?: string;
	collapsible?: boolean;
	defaultOpen?: boolean;
}

export function Callout({
	type = 'note',
	collapsible = false,
	defaultOpen = true,
	className,
	children,
	...props
}: CalloutProps) {
	const config = calloutConfig[type.toLowerCase()] ?? fallbackConfig;
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div
			className={cn(
				'my-4 rounded-lg border-l-4 px-4 py-3',
				config.borderClass,
				config.bgClass,
				className,
			)}
			role="note"
			{...props}
		>
			{collapsible ? (
				<>
					<button
						className="flex w-full items-center gap-2 text-left"
						onClick={() => setOpen(prev => !prev)}
						type="button"
					>
						<span className={config.colorClass}>{config.icon}</span>
						<span className="flex-1 font-semibold text-sm">{getTitle(children)}</span>
						<svg
							className={cn(
								'size-4 transition-transform duration-200',
								open && 'rotate-180',
							)}
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					{open && <div className="mt-2 text-sm">{getBody(children)}</div>}
				</>
			) : (
				children
			)}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  CalloutTitle (replaces ObsidianCalloutTitle)                       */
/* ------------------------------------------------------------------ */

interface CalloutTitleProps extends ComponentPropsWithoutRef<'div'> {
	type?: string;
}

export function CalloutTitle({ type = 'note', className, children, ...props }: CalloutTitleProps) {
	const config = calloutConfig[type?.toLowerCase()] ?? fallbackConfig;

	return (
		<div className={cn('flex items-center gap-2 font-semibold text-sm', className)} {...props}>
			<span className={config.colorClass}>{config.icon}</span>
			<span>{children}</span>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  CalloutBody (replaces ObsidianCalloutBody)                         */
/* ------------------------------------------------------------------ */

export function CalloutBody({
	className,
	children,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={cn('mt-2 text-sm leading-relaxed', className)} {...props}>
			{children}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Helpers to split children for collapsible mode                     */
/* ------------------------------------------------------------------ */

function getTitle(children: ReactNode): ReactNode {
	if (!Array.isArray(children)) return children;
	return children.find(
		(child) => child?.type === CalloutTitle || child?.props?.mdxType === 'CalloutTitle',
	) ?? children[0];
}

function getBody(children: ReactNode): ReactNode {
	if (!Array.isArray(children)) return null;
	return children.filter(
		(child) => child?.type !== CalloutTitle && child?.props?.mdxType !== 'CalloutTitle',
	);
}
