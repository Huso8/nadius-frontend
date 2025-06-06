import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useApiAuth } from '../services/api';
import { ROUTES } from '../constants/navigation';
import axios from 'axios';
import { User } from '../types';
import { ApiResponse } from '../services/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

if (!API_URL) {
	console.error('REACT_APP_API_URL is not defined in environment variables');
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
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [isLoading, setIsLoading] = useState(true);
	const { login: apiLogin, register: apiRegister } = useApiAuth();

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const response = await axios.get<ApiResponse<User>>(`${API_URL}/api/auth/me`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					if (response.data && response.data.data) {
						setUser(response.data.data);
						localStorage.setItem('user', JSON.stringify(response.data.data));
					}
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
			if (response?.token && response?.user) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
				setUser(response.user);
			} else {
				throw new Error('Неверный формат ответа от сервера');
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					throw new Error('Неверный email или пароль');
				}
				throw new Error(error.response?.data?.message || 'Ошибка при входе');
			}
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (email: string, password: string, name: string) => {
		setIsLoading(true);
		try {
			const response = await apiRegister.mutateAsync({ email, password, name });
			if (response?.token && response?.user) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
				setUser(response.user);
			} else {
				throw new Error('Неверный формат ответа от сервера');
			}
		} catch (error) {
			console.error('Registration error:', error);
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || 'Ошибка при регистрации';
				throw new Error(message);
			}
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