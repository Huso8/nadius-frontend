import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useApiAuth } from '../services/api';
import { ROUTES } from '../constants/navigation';
import axios from 'axios';

interface User {
	id: string;
	email: string;
	name: string;
	role: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { login: apiLogin, register: apiRegister } = useApiAuth();

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					setUser(response.data);
					localStorage.setItem('user', JSON.stringify(response.data));
				} catch (error) {
					console.error('Auth check error:', error);
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					setUser(null);
				}
			}
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await apiLogin.mutateAsync({ email, password });
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			setUser(response.user);
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (email: string, password: string, name: string) => {
		setIsLoading(true);
		try {
			const response = await apiRegister.mutateAsync({ email, password, name });
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			setUser(response.user);
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{
			user,
			isAuthenticated: !!user,
			login,
			register,
			logout,
			isLoading
		}}>
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