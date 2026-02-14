/* * */

import { BASE_OPTIONS } from '@/lib/settings';

import styles from './styles.module.css';

/* * */

export function LoginButton() {
	return (
		<a className={styles.container} href={BASE_OPTIONS.go_url} rel="noopener noreferrer" target="_blank">
			Login
		</a>
	);
}
