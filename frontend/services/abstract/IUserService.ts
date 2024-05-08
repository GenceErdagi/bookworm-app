// services/IUserService.ts
import UserProfile from '@/types/User';

interface IUserService {
	loginUser(
		username: string,
		password: string
	): Promise<{ access: string; refresh?: string; user?: UserProfile }>;
	refreshToken(token: string): Promise<{ access: string; refresh?: string }>;
	verifyToken(token: string): Promise<any>;
	fetchUserProfile(userId: number): Promise<UserProfile>;
	updateUserProfile(
		userId: number,
		data: Partial<UserProfile>
	): Promise<UserProfile>;
	deleteUserProfile(userId: number): Promise<void>;
}

export default IUserService;
