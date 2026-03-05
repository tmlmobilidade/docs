/* * */

export function LabListHeader() {
	return (
		<div className="w-full flex flex-col mb-10 p-10 rounded-2xl border-(--color-system-border-100) bg-(--color-brand-primary) dark:bg-(--color-brand-secondary) relative">
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,var(--color-brand-contrast)_1px,transparent_1px)] bg-size-[24px_24px] opacity-30"
			/>
			<h1 className="text-3xl font-bold tracking-tight text-(--color-system-background-100) dark:text-(--color-system-text-100) md:text-4xl">Laboratório</h1>
			<p className="text-lg text-(--color-brand-contrast)/90">Aqui encontras informação sobre melhorias e novas funcionalidades do GO, e por vezes explorações interessantes sobre o mundo dos transportes.</p>
		</div>
	);
}
