export function blogListHeader() {
	return (
		<div className="relative mb-8 py-10 md:py-14">
			<h1 className="mb-3 text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
				TML MOBILIDADE Blog
			</h1>
			<p className="max-w-lg text-fd-muted-foreground">
				Últimas novidades, anúncios e atualizações sobre a TML Mobilidade.
			</p>
			<div className="mt-6 h-px w-full bg-gradient-to-r from-brand/40 via-brand-secondary/20 to-transparent" />
		</div>
	);
}
