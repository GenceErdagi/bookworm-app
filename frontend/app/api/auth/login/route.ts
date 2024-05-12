import ServiceContainer from '@/services/concrete/ServiceContainer';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
const userService = ServiceContainer.getInstance().getUserService();

export const POST = async (request: NextRequest) => {
	const body = await request.json();
	if (!body.username || !body.password) {
		return new Response('Username and password are required', { status: 400 });
	}
	const { username, password } = body;

	const response = await userService.loginUser(username, password);
	if (!response) {
		return new Response('Invalid username or password', { status: 400 });
	}
	cookies().set('token', response.access);
	cookies().set('refresh', response.refresh?.toString() || '');
	return new Response(JSON.stringify({ user_id: response.user_id }), {
		status: 200
	});
};
