/* * */

import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

/* * */

export const revalidate = false; // it should be cached forever

export const { staticGET: GET } = createFromSource(source);
