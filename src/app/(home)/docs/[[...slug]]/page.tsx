import { DocsGenerateMetadata } from '@/components/docs/DocsGenerateMetadata/index';
import { DocsGenerateStaticParams } from '@/components/docs/DocsGenerateStaticParams/index';
import { DocsPages } from '@/components/docs/DocsPages/index';
import { PagePropsPromise } from '@/types/PagePropsPromise';
import { Metadata } from 'next';

export default function Page(props: PagePropsPromise) {
	return DocsPages(props);
}

export async function generateStaticParams() {
	return DocsGenerateStaticParams();
}

export async function generateMetadata(props: PagePropsPromise): Promise<Metadata> {
	return DocsGenerateMetadata(props);
}
