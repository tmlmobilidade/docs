/* * */

import { HomeHero } from '@/components/home/HomeHero';
// import { LabList } from '@/components/lab/LabList';
import { BASE_OPTIONS, NAVBAR_LINKS } from '@/lib/settings';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

/* * */

export default function Page() {
	return (
		<HomeLayout
			githubUrl={BASE_OPTIONS.github_url}
			links={NAVBAR_LINKS}
			nav={{ title: BASE_OPTIONS.title, url: '/' }}
			themeSwitch={{ mode: 'light-dark-system' }}
		>
			<main className="text-landing-foreground pt-6 pb-8 md:pb-16 flex flex-col gap-16">
				<HomeHero />
				{/* <LabList limit={4} withViewAllLink /> */}
			</main>
		</HomeLayout>
	);
}
