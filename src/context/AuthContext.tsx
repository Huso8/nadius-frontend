import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useApiAuth } from '../services/api';

interface AuthContextType {
	isAuthenticated: boolean;
	user: any | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any | null>(null);
	const { login: apiLogin, register: apiRegister } = useApiAuth();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			setIsAuthenticated(true);
			setUser(JSON.parse(userData));
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await apiLogin.mutateAsync({ email, password });
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			setIsAuthenticated(true);
			setUser(response.user);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const register = async (email: string, password: string, name: string) => {
		try {
			const response = await apiRegister.mutateAsync({ email, password, name });
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			setIsAuthenticated(true);
			setUser(response.user);
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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