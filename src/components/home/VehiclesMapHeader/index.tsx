/* * */

import styles from './styles.module.css';

/* * */

export function VehiclesMapHeader() {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Veículos em movimento</h2>
			<p className={styles.description}>
				A rede de veículos em tempo real na Área Metropolitana de Lisboa.
			</p>
		</div>
	);
}
