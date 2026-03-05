/* * */

import { HomeHero } from '@/components/home/HomeHero';
import { LabListGrid } from '@/components/lab/LabListGrid';
import { LabListHeader } from '@/components/lab/LabListHeader';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { BASE_OPTIONS, NAVBAR_LINKS } from '@/lib/settings';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* * */

export default function Page() {
	return (
		<HomeLayout
			githubUrl={BASE_OPTIONS.github_url}
			links={NAVBAR_LINKS}
			nav={{ title: BASE_OPTIONS.title, url: '/' }}
			themeSwitch={{ mode: 'light-dark-system' }}
		>
			<main className="text-landing-foreground pt-6 pb-8 md:pb-16">

				<HomeHero />

				<section className="mx-auto mt-16 w-full max-w-[1400px] px-4 md:px-6">
					<LabListHeader />
					<LabListGrid limit={4} />

					{/* Mobile "ver todos" link */}
					<div className="mt-6 flex justify-center md:hidden">
						<Link
							className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 text-sm')}
							href="/lab"
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
