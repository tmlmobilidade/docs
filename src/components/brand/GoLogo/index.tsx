/* * */

import { LiveIcon } from '@/components/brand/LiveIcon';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

export function GoLogo() {
	return (
		<div className={styles.container}>
			<Image alt="Go Logo" className={styles.tmlmobilidade} height={24} src="/docs/brand/tmlmobilidade-icon.jpg" width={24} />
			{/* <Image alt="Go Logo" height={30} src="brand/tml.svg" width={100} /> */}
			<p className={styles.text}>GO</p>
			<LiveIcon />
		</div>
	);
}
