import { getName } from '#/src/lib/getName';
import { sourceBlog } from '#/src/lib/source';

export default function Page() {
	const posts = [...sourceBlog.getPages()]
		.sort((a, b) => new Date(b.data.date ?? getName(b.path)).getTime() - new Date(a.data.date ?? getName(a.path)).getTime())
		.slice(0, 4);
	return (
		<div>
			{posts.map(post => (
				<div key={post.url}>
					<h2>{post.data.title}</h2>
					<p>{post.data.description}</p>
				</div>
			))}
		</div>
	);
}
