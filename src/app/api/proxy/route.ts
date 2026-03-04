import { openapi } from '@/lib/openapi';

export const { DELETE, GET, HEAD, PATCH, POST, PUT } = openapi.createProxy();
