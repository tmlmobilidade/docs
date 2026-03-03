/* * */

import { BASE_OPTIONS } from '@/lib/settings';
import { cookies } from 'next/headers';

import styles from './styles.module.css';

/* * */

export async function LoginButton() {
	const cookieStore = await cookies();
	const hasSessionToken = Boolean(cookieStore.get('session_token'));
	const label = hasSessionToken ? 'Entrar' : 'Login';

	return (
		<a
			className={styles.container}
			href={BASE_OPTIONS.go_url}
			rel="noopener noreferrer"
			target="_blank"
		>
			{label}
		</a>
	);
}
