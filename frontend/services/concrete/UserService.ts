// services/concrete/UserService.ts
import { injectable } from 'tsyringe';
import IUserService from '@/services/abstract/IUserService';
import User from '@/types/User';
import fetchAPI from '@/lib/api';

@injectable()
export default class UserService implements IUserService {
	async loginUser(
		username: string,
		password: string
	): Promise<{
		access: string;
		refresh?: string | undefined;
		user_id?: number | undefined;
	}> {
		const response = await fetchAPI('token', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});

		return response;
	}
	async register(
		username: string,
		password: string,
		email: string
	): Promise<{
		access: string;
		refresh?: string;
		user_id?: number | undefined;
	}> {
		const response = await fetchAPI(`userprofiles/create/`, {
			method: 'POST',
			body: JSON.stringify({ username, password, email })
		});
		if (!response) {
			throw new Error('Error during creation');
		}
		const response_token = await fetchAPI('token', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});
		console.log(response_token);

		return response_token;
	}

	async refreshToken(
		token: string
	): Promise<{ access: string; refresh?: string | undefined }> {
		return fetchAPI('token/refresh/', {
			method: 'POST',
			body: JSON.stringify({ refresh: token })
		});
	}

	async verifyToken(token: string): Promise<any> {
		return fetchAPI('token/verify', {
			method: 'POST',
			body: JSON.stringify({ token })
		});
	}
	getUsers(): Promise<User[]> {
		return fetchAPI(`userprofiles/`);
	}
	async fetchUser(userId: number): Promise<User> {
		return fetchAPI(`userprofiles/${userId}/`);
	}

	async updateUser(userId: number, data: Partial<User>): Promise<User> {
		return fetchAPI(`userprofiles/${userId}/update/`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async deleteUser(userId: number): Promise<void> {
		await fetchAPI(`userprofiles/${userId}/delete/`, { method: 'DELETE' });
	}
}
