// stores/useUserStore.ts
import { create } from 'zustand';
import userService from '@/services/concrete/UserService';
import UserProfile from '@/types/User';

interface UserState {
	user: UserProfile | null;
	accessToken: string | null;
	isLoading: boolean;
	error: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	refreshAccessToken: () => Promise<void>;
	fetchUser: (userId: number) => Promise<void>;
	updateUser: (userId: number, data: Partial<UserProfile>) => Promise<void>;
	deleteUser: (userId: number) => Promise<void>;
	clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	accessToken: null,
	isLoading: false,
	error: null,

	login: async (username: string, password: string) => {
		set({ isLoading: true, error: null });
		try {
			const loginData = await userService.loginUser(username, password);
			if (loginData.access) {
				localStorage.setItem('accessToken', loginData.access);
				set({ accessToken: loginData.access, user: loginData.user || null });
			}
			set({ isLoading: false });
		} catch (error) {
			console.error('Failed to login', error);
			set({ error: 'Login failed', isLoading: false });
		}
	},

	logout: () => {
		localStorage.removeItem('accessToken');
		set({ user: null, accessToken: null });
	},

	refreshAccessToken: async () => {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			set({ error: 'No access token available' });
			return;
		}

		try {
			const data = await userService.refreshToken(accessToken);
			if (data.access) {
				localStorage.setItem('accessToken', data.access);
				set({ accessToken: data.access });
			}
		} catch (error) {
			console.error('Failed to refresh access token', error);
			set({ error: 'Failed to refresh access token' });
		}
	},

	fetchUser: async (userId: number) => {
		set({ isLoading: true });
		try {
			const userProfile = await userService.fetchUserProfile(userId);
			set({ user: userProfile, isLoading: false });
		} catch (error) {
			console.error('Failed to fetch user profile', error);
			set({ error: 'Failed to fetch user profile', isLoading: false });
		}
	},

	updateUser: async (userId: number, data: Partial<UserProfile>) => {
		set({ isLoading: true });
		try {
			const updatedUser = await userService.updateUserProfile(userId, data);
			set({ user: updatedUser, isLoading: false });
		} catch (error) {
			console.error('Failed to update user profile', error);
			set({ error: 'Failed to update user profile', isLoading: false });
		}
	},

	deleteUser: async (userId: number) => {
		try {
			await userService.deleteUserProfile(userId);
			set({ user: null });
			localStorage.removeItem('accessToken');
		} catch (error) {
			console.error('Failed to delete user profile', error);
			set({ error: 'Failed to delete user profile' });
		}
	},

	clearError: () => {
		set({ error: null });
	}
}));
