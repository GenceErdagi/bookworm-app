import ServiceContainer from '@/services/concrete/ServiceContainer';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
const userService = ServiceContainer.getInstance().getUserService();

export const POST = async (request: NextRequest) => {
	const body = await request.json();
	if (!body.username || !body.password || !body.email) {
		return new Response('Username and password and email are required', {
			status: 400
		});
	}
	const { username, password, email } = body;

	const response = await userService.register(username, password, email);
	console.log(response);
	if (!response) {
		return new Response('Error during creation', { status: 400 });
	}
	const response_token = await userService.loginUser(username, password);

	cookies().set('token', response_token.access);
	cookies().set('refresh', response_token.refresh?.toString() || '');
	return new Response(JSON.stringify({ user_id: response.user_id }), {
		status: 200
	});
};
