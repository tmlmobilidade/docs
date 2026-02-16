export type BlogDateStyle = 'long' | 'short';

export function formatBlogDate(date: Date | string, style: BlogDateStyle = 'long'): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: style === 'long' ? 'long' : 'short',
		year: 'numeric',
	});
}
