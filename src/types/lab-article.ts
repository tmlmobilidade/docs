/* * */

import { sourceLab } from '@/lib/source';

/* * */

export type LabArticle = ReturnType<typeof sourceLab.getPages>[number];
