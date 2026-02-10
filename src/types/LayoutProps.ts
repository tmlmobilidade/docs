export interface LayoutProps {
	children: React.ReactNode
	params?: Promise<{ slug?: string[] }> | { slug?: string[] }
}
