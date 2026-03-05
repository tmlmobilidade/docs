/* * */

import { LabListGrid } from '@/components/lab/LabListGrid';
import { LabListHeader } from '@/components/lab/LabListHeader';

/* * */

export default function Page() {
	return (
		<main className="mx-auto max-w-7xl px-4 pt-8 pb-16 md:px-6">
			<LabListHeader />
			<LabListGrid />
		</main>
	);
}
