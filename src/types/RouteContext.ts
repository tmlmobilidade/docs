export interface RouteContext {
	params: Promise<{ slug: string[] }>
	request?: Request
}
