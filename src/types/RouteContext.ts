export interface RouteContext {
	params: Promise<{ slug: string | string[] }>
	request?: Request
}
