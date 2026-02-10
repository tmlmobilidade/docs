import { blog } from '@/lib/source';

export type BlogPost = ReturnType<typeof blog.getPages>[number];
