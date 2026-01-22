import { blog } from '@/lib/source';

export type BlogPage = NonNullable<ReturnType<typeof blog.getPage>>;
