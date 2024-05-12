import { NextRequest, NextResponse } from 'next/server';
import { AUTH_ROUTES, verifyJwtToken, isAuthRoute } from '@/lib/auth';

export const middleware = async (request: NextRequest) => {
	const { url, nextUrl, cookies } = request;
	const { value: token } = cookies.get('token') ?? { value: null };
	const isAuthRouteRequested = isAuthRoute(nextUrl.pathname);
	const hasVerifiedToken = token && (await verifyJwtToken(token));
	console.log('middleware', { token, isAuthRouteRequested, hasVerifiedToken });
	if (isAuthRouteRequested) {
		if (!hasVerifiedToken) {
			const response = NextResponse.next();
			return response;
		}
		return NextResponse.redirect(new URL('/', url));
	}
	if (!hasVerifiedToken) {
		const searchParams = new URLSearchParams({ next: nextUrl.pathname });

		return NextResponse.redirect(new URL(`/auth/login/${searchParams}`, url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/auth/login', '/auth/register', '/auth/profile']
};
