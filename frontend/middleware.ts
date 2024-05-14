import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken, isAuthRoute } from '@/lib/auth';

export const middleware = async (request: NextRequest) => {
	const { url, nextUrl, cookies } = request;
	const { value: token } = cookies.get('token') ?? { value: null };

	const hasVerifiedToken = token && (await verifyJwtToken(token));
	const isAuthPageRequested = isAuthRoute(nextUrl.pathname);

	if (isAuthPageRequested) {
		if (!hasVerifiedToken) {
			const response = NextResponse.next();
			response.cookies.delete('token');
			return response;
		}

		const response = NextResponse.redirect(new URL(`/`, url));
		return response;
	}

	if (!hasVerifiedToken) {
		const searchParams = new URLSearchParams(nextUrl.searchParams);
		searchParams.set('next', nextUrl.pathname);

		const response = NextResponse.redirect(
			new URL(`/login?${searchParams}`, url)
		);
		response.cookies.delete('token');

		return response;
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/auth/login', '/auth/profile']
};
