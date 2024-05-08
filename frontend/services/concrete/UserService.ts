import axios from 'axios';
import UserProfile from '@/types/User';
import IUserService from '@/services/abstract/IUserService';
import { API_URL } from '@/utils/apiConfig';

export const userService: IUserService = {
	loginUser: async (username: string, password: string) => {
		const response = await axios.post(`${API_URL}/token`, {
			username,
			password
		});
		if (response.data.access) {
			localStorage.setItem('token', response.data.access);
		}
		return response.data;
	},
	refreshToken: async (token: string) => {
		const response = await axios.post(`${API_URL}/token/refresh`, {
			refresh: token
		});
		return response.data;
	},
	verifyToken: async (token: string) => {
		const response = await axios.post(`${API_URL}/token/verify`, { token });
		return response.data;
	},
	fetchUserProfile: async (userId: number): Promise<UserProfile> => {
		const response = await axios.get(`${API_URL}/userprofiles/${userId}/`);
		return response.data;
	},
	updateUserProfile: async (userId: number, data: Partial<UserProfile>) => {
		const response = await axios.put(
			`${API_URL}/userprofiles/${userId}/update/`,
			data
		);
		return response.data;
	},
	deleteUserProfile: async (userId: number) => {
		const response = await axios.delete(
			`${API_URL}/userprofiles/${userId}/delete/`
		);
		return response.data;
	}
};

export default userService;
