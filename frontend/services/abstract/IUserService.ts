// services/IUserService.ts
import User from '@/types/User';

interface IUserService {
	loginUser(
		username: string,
		password: string
	): Promise<{
		access: string;
		refresh?: string;
		user_id?: number | undefined;
	}>;
	register(
		username: string,
		password: string,
		email: string
	): Promise<{
		access: string;
		refresh?: string;
		user_id?: number | undefined;
	}>;
	refreshToken(token: string): Promise<{ access: string; refresh?: string }>;
	verifyToken(token: string): Promise<any>;
	fetchUser(userId: number): Promise<User>;
	getUsers(): Promise<User[]>;
	updateUser(userId: number, data: Partial<User>): Promise<User>;
	deleteUser(userId: number): Promise<void>;
}

export default IUserService;
