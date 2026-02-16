/* * */

import { BlogCard } from '#/src/components/blog/blog-card';
import { HomeHero } from '@/components/home/HomeHero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { getName } from '@/lib/getName';
import { BASE_OPTIONS, NAVBAR_LINKS } from '@/lib/settings';
import { sourceBlog } from '@/lib/source';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* * */

export default function Page() {
	const posts = [...sourceBlog.getPages()]
		.sort((a, b) => new Date(b.data['date'] ?? getName(b.path)).getTime() - new Date(a.data['date'] ?? getName(a.path)).getTime())
		.slice(0, 4);

	return (
		<HomeLayout
			githubUrl={BASE_OPTIONS.github_url}
			links={NAVBAR_LINKS}
			nav={{ title: BASE_OPTIONS.title, url: '/' }}
			themeSwitch={{ mode: 'light-dark-system' }}
		>

			<main className="text-landing-foreground pt-6 pb-8 md:pb-16">

				<HomeHero />

				{/* ── Blog Posts Section ───────────────────────────── */}
				<section className="mx-auto mt-16 w-full max-w-[1400px] px-4 md:px-6">
					<div className="mb-8 flex items-end justify-between">
						<div>
							<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
								Últimos artigos
							</h2>
							<p className="mt-1 text-fd-muted-foreground">
								Novidades e atualizações sobre a TML Mobilidade.
							</p>
						</div>
						<Link
							className="hidden items-center gap-1 text-sm font-medium text-brand hover:text-brand-secondary md:flex"
							href="/blog"
						>
							Ver todos
							<ArrowRight className="size-3.5" />
						</Link>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
						{posts.map(post => (
							<BlogCard key={post.url} post={post} />
						))}
					</div>

					{/* Mobile "ver todos" link */}
					<div className="mt-6 flex justify-center md:hidden">
						<Link
							className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 text-sm')}
							href="/blog"
						>
							Ver todos os artigos
							<ArrowRight className="size-3.5" />
						</Link>
					</div>
				</section>
			</main>
		</HomeLayout>
	);
}
