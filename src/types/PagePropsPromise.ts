export interface PagePropsPromise {
	params: Promise<{ slug: string | string[] }> | { slug: string | string[] }
}
