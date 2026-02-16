import Image from 'next/image';

type BlogCoverImageVariant = 'card' | 'hero';

interface BlogCoverImageProps {
	alt?: string
	className?: string
	priority?: boolean
	src: string
	variant?: BlogCoverImageVariant
}

const variantStyles: Record<BlogCoverImageVariant, { aspect: string, sizes: string }> = {
	card: {
		aspect: 'aspect-[16/10]',
		sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw',
	},
	hero: {
		aspect: 'aspect-[21/9]',
		sizes: '(max-width: 1024px) 100vw, 900px',
	},
};

export function BlogCoverImage({
	alt = '',
	className,
	priority = false,
	src,
	variant = 'card',
}: BlogCoverImageProps) {
	const { aspect, sizes } = variantStyles[variant];

	return (
		<div className={`relative w-full overflow-hidden bg-fd-muted ${aspect} ${className ?? ''}`}>
			<Image
				alt={alt}
				className="object-cover"
				priority={priority}
				sizes={sizes}
				src={src}
				fill
			/>
			{variant === 'hero' && (
				<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-fd-background/60 via-transparent to-transparent" />
			)}
		</div>
	);
}
