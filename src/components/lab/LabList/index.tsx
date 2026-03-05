/* * */

import { LabListGrid } from '@/components/lab/LabListGrid';
import { LabListHeader } from '@/components/lab/LabListHeader';

import styles from './styles.module.css';

/* * */

interface LabListProps {
	limit?: number
	withViewAllLink?: boolean
}

/* * */

export function LabList({ limit, withViewAllLink }: LabListProps) {
	return (
		<section className={styles.container}>
			<LabListHeader withViewAllLink={withViewAllLink} />
			<LabListGrid limit={limit} />
		</section>
	);
}
