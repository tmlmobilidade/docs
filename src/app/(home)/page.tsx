import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { getName } from '@/lib/getName';
import { sourceBlog } from '@/lib/source';
import { NAVBAR_LINKS } from '#/src/lib/navbar';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, BookOpen, Rss } from 'lucide-react';
import Link from 'next/link';

/* * */

export default function Page() {
	const posts = [...sourceBlog.getPages()]
		.sort((a, b) => new Date(b.data.date ?? getName(b.path)).getTime() - new Date(a.data.date ?? getName(a.path)).getTime())
		.slice(0, 4);

	return (
		<HomeLayout links={NAVBAR_LINKS} nav={{ title: 'TML' }}>
			<main className="text-landing-foreground pt-6 pb-8 md:pb-16">
				{/* ── Hero Section ─────────────────────────────────── */}
				<section className="relative mx-auto max-w-[1400px] px-4">
					<div className="relative flex min-h-[280px] flex-col justify-center overflow-hidden rounded-2xl border border-fd-border bg-gradient-to-br from-brand/5 via-fd-background to-brand-secondary/10 px-6 py-12 md:px-16 md:py-16">
						{/* Decorative dot grid */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 opacity-[0.03]"
							style={{
								backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
								backgroundSize: '24px 24px',
							}}
						/>

						<h1 className="relative z-10 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl xl:text-5xl">
							Descobre a melhor
							<br className="md:hidden" />{' '}
							<span className="text-brand">documentação</span> sobre veículos,
							<br className="hidden md:block" />
							{' '}tudo sobre a rede de autocarros da AML.
						</h1>

						<p className="relative z-10 mt-4 max-w-2xl text-fd-muted-foreground md:text-lg">
							Documentação técnica, guias e recursos para a rede de transportes da Área Metropolitana de Lisboa.
						</p>

						<div className="relative z-10 mt-8 flex flex-row flex-wrap items-center gap-3">
							<Link className={cn(buttonVariants(), 'gap-2 max-sm:text-sm')} href="/docs">
								<BookOpen className="size-4" />
								Começar a ler
							</Link>
							<Link
								className={cn(buttonVariants({ variant: 'secondary' }), 'gap-2 max-sm:text-sm')}
								href="/blog"
							>
								<Rss className="size-4" />
								Ver Blog
							</Link>
						</div>
					</div>
				</section>

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
							<Link
								key={post.url}
								className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-5 shadow-sm transition-all duration-200 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5"
								href={post.url}
							>
								<p className="font-semibold text-fd-foreground group-hover:text-brand transition-colors">
									{post.data.title}
								</p>
								<p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground line-clamp-2">
									{post.data.description}
								</p>
								<p className="mt-auto pt-4 text-xs font-medium text-brand/70">
									{new Date(post.data.date ?? getName(post.path)).toLocaleDateString('pt-PT', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})}
								</p>
							</Link>
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
