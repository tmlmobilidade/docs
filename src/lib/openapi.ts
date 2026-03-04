import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
	input: ['./docs/reference/api/openapi-spec.yaml'],
});
