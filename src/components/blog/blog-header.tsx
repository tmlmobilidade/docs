/* * */

import { getName } from '@/lib/getName';
import { BlogPage } from '@/types/BlogPage';
import Image from 'next/image';

import { TagBadge } from './tag-badge';

/* * */

interface BlogHeaderProps {
	page: BlogPage
}

export function BlogHeader({ page }: BlogHeaderProps) {
	const dateStr = new Date(page.data.date ?? getName(page.path)).toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const tags = (page.data.tags ?? []) as string[];
	const cover = page.data.cover as string | undefined;

	return (
		<header className="relative">
			{/* Cover image */}
			{cover && (
				<div className="relative -mx-4 mb-8 overflow-hidden rounded-2xl md:-mx-6 lg:mx-0">
					<div className="aspect-[21/9] w-full bg-fd-muted">
						<Image
							alt=""
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 900px"
							src={cover}
							fill
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-fd-background/60 via-transparent to-transparent" />
					</div>
				</div>
			)}

			<div className="space-y-4">
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{tags.map(tag => (
							<TagBadge key={tag}>{tag}</TagBadge>
						))}
					</div>
				)}

				<h1 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl lg:text-5xl">
					{page.data.title}
				</h1>

				{page.data.description && (
					<p className="text-lg text-fd-muted-foreground md:text-xl">
						{page.data.description}
					</p>
				)}

				<div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-fd-border pt-4 text-sm text-fd-muted-foreground">
					{page.data.author && (
						<span className="font-medium">{page.data.author}</span>
					)}
					<time dateTime={String(page.data.date)}>{dateStr}</time>
				</div>
			</div>
		</header>
	);
}
