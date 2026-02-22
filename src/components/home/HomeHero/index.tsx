/* * */

import { IconBook, IconNews } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function HomeHero() {
	return (
		<section className={styles.container}>
			<div className={styles.heroContainer}>

				<h1 className={styles.title}>
					Gestão em
					{' '}<span className={styles.titleBrand}>tempo real</span>
					{' '}para operações de transporte público mais eficientes.
				</h1>

				<p className={styles.description}>
					APIs, links, guias e recursos para a rede de transportes públicos da Área Metropolitana de Lisboa.
				</p>

				<div className={styles.buttonsContainer}>
					<Link className={styles.button} href="/reference">
						<IconBook size={20} />
						Documentação
					</Link>
					<Link className={styles.button} href="/blog">
						<IconNews size={20} />
						Novidades
					</Link>
				</div>

			</div>
		</section>
	);
}
