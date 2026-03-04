import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

const openapi = createOpenAPI({
	input: ['./docs/reference/api/openapi-spec.yaml'],
});

void generateFiles({
	includeDescription: true,
	input: openapi,
	output: './docs/reference/api',
});
