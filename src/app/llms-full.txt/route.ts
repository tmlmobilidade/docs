/* * */

import { NextResponse } from 'next/server';

/* * */

// Root path is not exposed in production (docs live under /reference)
export const GET = (request: Request) => {
	return NextResponse.redirect(new URL('/reference/llms-full.txt', request.url), 308);
};
