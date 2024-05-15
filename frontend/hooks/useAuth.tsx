'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	FC,
	ReactNode
} from 'react';
import UserProfile from '@/types/User';
import ServiceContainer from '@/services/concrete/ServiceContainer';
import { verifyJwtToken } from '@/lib/auth';
import { eraseCookie } from '@/lib/cookies';
import { useRouter } from 'next/navigation';

interface AuthContextType {
	user: UserProfile | null;
	login: (username: string, password: string) => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logout: () => void;
}
interface AuthProviderProps {
	children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const userService = ServiceContainer.getInstance().getUserService();
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<UserProfile | null>(null);

	const login = async (username: string, password: string) => {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		if (!response.ok) {
			alert('Invalid username or password');
			return;
		}
		const { user_id } = await response.json();
		const user = await userService.fetchUser(user_id as number);
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};
	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password })
		});
		if (!response.ok) {
			alert('Invalid username or password');
			return;
		}
		const { user_id } = await response.json();
		const user = await userService.fetchUser(user_id as number);
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};

	const logout = useCallback(() => {
		localStorage.removeItem('user');
		eraseCookie('token');
		eraseCookie('refresh');
		setUser(null);
	}, []);

	useEffect(() => {
		const initializeUser = async () => {
			const user: UserProfile = JSON.parse(
				localStorage.getItem('user')?.toString() || '{}'
			);
			if (user.id) {
				setUser(user);
			} else {
				logout();
			}
		};

		initializeUser();
	}, [logout]);

	return (
		<AuthContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
