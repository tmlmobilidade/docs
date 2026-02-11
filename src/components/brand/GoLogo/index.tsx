/* * */

import { LiveIcon } from '@/components/brand/LiveIcon';

import styles from './styles.module.css';

/* * */

export function GoLogo() {
	return (
		<div className={styles.container}>
			<p className={styles.text}>GO</p>
			<LiveIcon />
		</div>
	);
}
