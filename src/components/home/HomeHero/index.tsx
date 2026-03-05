/* * */

import { VehicleBackground } from '@/components/home/VehicleBackground';
import { BASE_OPTIONS } from '@/lib/settings';
import { IconBolt, IconBook, IconNews } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function HomeHero() {
	return (
		<section className={styles.container}>
			<div className={styles.heroContainer}>

				<VehicleBackground />

				<h1 className={styles.title}>
					Informação em
					{' '}<span className={styles.titleBrand}>tempo real</span>
					{' '}para operações de transporte público mais eficientes.
				</h1>

				<p className={styles.description}>
					APIs, links, guias e recursos para a rede de transportes públicos da Área Metropolitana de Lisboa.
				</p>

				<div className={styles.buttonsContainer}>
					<Link className={styles.button} href="/lab">
						<IconNews size={20} />
						Laboratório
					</Link>
					<Link className={styles.button} href="/reference">
						<IconBook size={20} />
						Documentação
					</Link>
					<Link className={styles.button} href={BASE_OPTIONS.go_url}>
						<IconBolt size={20} />
						Login
					</Link>
				</div>

			</div>
		</section>
	);
}
