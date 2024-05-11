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

	const login = async (username: string, password: string) => {};

	const logout = useCallback(() => {}, []);

	useEffect(() => {}, [logout]);

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
