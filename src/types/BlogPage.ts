import { sourceBlog } from '@/lib/source';

export type BlogPage = NonNullable<ReturnType<typeof sourceBlog.getPage>>;
