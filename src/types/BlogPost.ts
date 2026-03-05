import { sourceLab } from '@/lib/source';

export type BlogPost = ReturnType<typeof sourceLab.getPages>[number];
