'use client';

import { cn } from '@/lib/cn';
import { Check, Copy } from 'lucide-react';
import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';

/* ------------------------------------------------------------------ */
/*  CodeBlock — Obsidian-inspired wrapper for <pre> blocks             */
/* ------------------------------------------------------------------ */

interface CodeBlockProps extends ComponentPropsWithoutRef<'div'> {
	/** Language label shown in the header bar */
	lang?: string;
	/** Title / filename shown in the header bar */
	title?: string;
	/** The <pre><code> content rendered by Shiki / fumadocs */
	children: ReactNode;
}

export function CodeBlock({ lang, title, className, children, ...props }: CodeBlockProps) {
	const label = title || lang;
	const codeRef = useRef<HTMLDivElement>(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		const text = codeRef.current?.textContent ?? '';
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, []);

	return (
		<div
			className={cn(
				'group relative my-4 overflow-hidden rounded-lg border border-code-border bg-code-surface',
				className,
			)}
			{...props}
		>
			{/* Header bar */}
			{label && (
				<div className="flex items-center justify-between border-b border-code-border bg-code-surface px-4 py-1.5">
					<span className="text-xs font-mono text-fd-muted-foreground select-none">
						{label}
					</span>
					<CopyButton copied={copied} onClick={handleCopy} />
				</div>
			)}

			{/* If no header, show floating copy button on hover */}
			{!label && (
				<div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
					<CopyButton copied={copied} onClick={handleCopy} />
				</div>
			)}

			{/* Code content */}
			<div ref={codeRef} className="overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0">
				{children}
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Copy button                                                        */
/* ------------------------------------------------------------------ */

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
	return (
		<button
			aria-label="Copy code"
			className={cn(
				'inline-flex items-center justify-center rounded-md p-1.5 text-fd-muted-foreground transition-colors',
				'hover:bg-fd-accent hover:text-fd-accent-foreground',
			)}
			onClick={onClick}
			type="button"
		>
			{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
		</button>
	);
}
