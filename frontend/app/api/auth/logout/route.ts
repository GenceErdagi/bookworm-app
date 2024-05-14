import ServiceContainer from '@/services/concrete/ServiceContainer';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
	cookies().delete('token');
	cookies().delete('refresh');
	return new Response('Success', {
		status: 200
	});
};
