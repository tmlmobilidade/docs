import { sourceDocs } from '@/lib/source';

export async function DocsGenerateStaticParams() {
	try {
		const params = sourceDocs.generateParams();
		if (!params || !params.length) {
			console.warn('generateParams returned nothing, using fallback');
			return [{ slug: ['placeholder'] }];
		}
		return params;
	}
	catch (e) {
		console.error('Error generating params:', e);
		return [{ slug: ['placeholder'] }];
	}
}
