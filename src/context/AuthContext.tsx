import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LoginData, RegisterData } from '../types/types';
import { authService } from '../services/authService';
import { useCart } from './CartContext';

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (data: LoginData) => Promise<void>;
	register: (data: RegisterData) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { clearCart } = useCart();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			authService.getCurrentUser()
				.then(user => {
					setUser(user);
				})
				.catch(() => {
					authService.logout();
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}, []);

	const login = async (userData: LoginData) => {
		try {
			const response = await authService.login(userData);
			setUser(response.user);
			clearCart();
			navigate('/');
		} catch (error) {
			throw error;
		}
	};

	const register = async (userData: RegisterData) => {
		try {
			const response = await authService.register(userData);
			setUser(response.user);
			clearCart();
			navigate('/');
		} catch (error) {
			throw error;
		}
	};

	const logout = () => {
		authService.logout();
		setUser(null);
		clearCart();
		navigate('/login');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated: !!user,
				login,
				register,
				logout
			}}
		>
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