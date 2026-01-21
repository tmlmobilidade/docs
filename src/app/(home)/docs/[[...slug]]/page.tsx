
import { docsListGenerateMetadata } from '@/components/docs/docsListGenerateMetadata/index';
import { docsListGenerateStaticParams } from '@/components/docs/docsListGenerateStaticParams/index';
import { docsListPage } from '@/components/docs/docsListPage/index';
import { Metadata } from 'next';
import { PagePropsPromise} from '@/types/PagePropsPromise'

export default function Page(props: PagePropsPromise) {
  return docsListPage(props);
}

export async function generateStaticParams() {
  return docsListGenerateStaticParams();
}

export async function generateMetadata(props: PagePropsPromise): Promise<Metadata> {
  return docsListGenerateMetadata(props);
}
