/* * */

import { sourceNews } from '@/lib/source';
import Image from 'next/image';
import Link from 'next/link';

/* * */

type NewsPage = ReturnType<typeof sourceNews.getPages>[number];

interface Frontmatter {
	cover?: string
	date?: string
	image?: string
	thumbnail?: string
}

function formatDateFromSlug(slug?: string) {
	if (!slug || !/^[0-9]{8}$/.test(slug)) return null;

	const year = Number(slug.slice(0, 4));
	const month = Number(slug.slice(4, 6)) - 1;
	const day = Number(slug.slice(6, 8));

	const date = new Date(Date.UTC(year, month, day));

	return new Intl.DateTimeFormat('pt-PT', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

function getCoverImage(page: NewsPage) {
	const frontmatter = (page.data._exports?.frontmatter ?? {}) as Frontmatter;
	return frontmatter.cover ?? frontmatter.image ?? frontmatter.thumbnail ?? null;
}

function getDateLabel(page: NewsPage) {
	const frontmatter = (page.data._exports?.frontmatter ?? {}) as Frontmatter;
	if (frontmatter.date) return frontmatter.date;
	return formatDateFromSlug(page.slugs?.[0]);
}

export function NewsList() {
	const pages = sourceNews
		.getPages()
		.filter(page => page.path !== 'index.mdx')
		.sort((a, b) => {
			const aSlug = a.slugs?.[0] ?? '';
			const bSlug = b.slugs?.[0] ?? '';
			return bSlug.localeCompare(aSlug);
		});

	if (pages.length === 0) {
			return <p className="text-sm text-neutral-600 dark:text-neutral-400">Sem novidades por agora.</p>;
	}

	return (
		<div className="grid gap-6">
			{pages.map((page) => {
				const cover = getCoverImage(page);
				const dateLabel = getDateLabel(page);

				return (
					<Link
						key={page.url}
						className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
						href={page.url}
					>
						{cover ? (
							<div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
								<Image
									alt={page.data.title ?? 'Noticia'}
									className="object-cover transition duration-300 group-hover:scale-[1.02]"
									sizes="(max-width: 768px) 100vw, 640px"
									src={cover}
									fill
								/>
							</div>
						) : null}
						<div className="flex flex-col gap-2">
							{dateLabel ? (
								<span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
									{dateLabel}
								</span>
							) : null}
							<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{page.data.title}</h3>
							{page.data.description ? (
								<p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{page.data.description}</p>
							) : null}
							<span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Ler mais</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
