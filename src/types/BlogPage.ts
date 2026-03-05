import { sourceLab } from '@/lib/source';

export type BlogPage = NonNullable<ReturnType<typeof sourceLab.getPage>>;
