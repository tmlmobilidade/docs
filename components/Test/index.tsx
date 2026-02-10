/* * */

import { sourceNews } from '@/lib/source';

export function Test() {
	console.log(sourceNews.getPages());
	return (
		<div>
			<h1>Test</h1>
		</div>
	);
}
