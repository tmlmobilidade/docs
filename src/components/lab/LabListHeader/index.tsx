/* * */

import { IconArrowRight } from '@tabler/icons-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface LabHeaderProps {
	withViewAllLink?: boolean
}

/* * */

export function LabListHeader({ withViewAllLink = true }: LabHeaderProps) {
	return (
		<div className={styles.container}>

			<h2 className={styles.title}>
				Laboratório
			</h2>

			<p className={styles.description}>
				Aqui encontras informação sobre melhorias e novas funcionalidades do GO, e por vezes explorações interessantes sobre o mundo dos transportes.
			</p>

			{withViewAllLink &&	(
				<Link className={styles.link} href="/lab">
					Ver tudo
					<IconArrowRight size={14} />
				</Link>
			)}

		</div>
	);
}
