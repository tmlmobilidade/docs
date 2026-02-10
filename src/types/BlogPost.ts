import { sourceBlog } from '@/lib/source';

export type BlogPost = ReturnType<typeof sourceBlog.getPages>[number];
