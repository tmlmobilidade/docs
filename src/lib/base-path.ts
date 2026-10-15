/* * */

/**
 * Prefix a public asset path with the Next.js basePath.
 * Absolute URLs and already-prefixed paths are left unchanged.
 */
export function withBasePath(path: string): string {
	const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
	if (!path.startsWith('/') || path.startsWith('//')) return path;
	if (base && path.startsWith(`${base}/`)) return path;
	return `${base}${path}`;
}
