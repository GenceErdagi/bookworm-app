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
import User from '@/types/User';
import ServiceContainer from '@/services/concrete/ServiceContainer';

interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}
interface AuthProviderProps {
	children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const userService = ServiceContainer.getInstance().getUserService();
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (username: string, password: string) => {
		try {
			const response = await userService.loginUser(username, password);

			if (response.access && response.user_id) {
				localStorage.setItem('token', response.access);
				const { user_id } = response;
				const user = await userService.fetchUser(user_id);
				setUser(user);
				localStorage.setItem('user', JSON.stringify(user));
			} else {
				// Handle the case where login is unsuccessful or user data is missing
				console.error('Failed to login or retrieve user data.');
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		setUser(null);
	}, []);

	useEffect(() => {
		const initializeUser = async () => {
			const user: User = JSON.parse(
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
		<AuthContext.Provider value={{ user, login, logout }}>
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
