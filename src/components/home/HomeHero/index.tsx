/* * */

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { IconBook, IconNews } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function HomeHero() {
	return (
		<section className={styles.container}>
			<div className={styles.heroContainer}>

				<div aria-hidden="true" className={styles.dotGrid} />

				<h1 className={styles.title}>
					O repositório central de documentação técnica para
					{' '}<span className={styles.titleBrand}>transportes públicos</span>
					{' '}em Portugal.
				</h1>

				<p className={styles.description}>
					APIs, links, guias e recursos para a rede de transportes da Área Metropolitana de Lisboa.
				</p>

				<div className={styles.buttonsContainer}>
					<Link className={cn(buttonVariants(), styles.buttonLink)} href="/reference">
						<IconBook size={20} />
						Documentação
					</Link>
					<Link className={cn(buttonVariants({ variant: 'secondary' }), styles.buttonLink)} href="/blog">
						<IconNews size={20} />
						Novidades
					</Link>
				</div>
			</div>
		</section>
	);
}
