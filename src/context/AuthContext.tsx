import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';
import { User } from '../types';

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
	}, [token]);

	const login = async (email: string, password: string) => {
		const response = await apiLogin({ email, password });
		setToken(response.token);
		setUser(response.user);
	};

	const register = async (email: string, password: string, name: string) => {
		const response = await apiRegister({ email, password, name });
		setToken(response.token);
		setUser(response.user);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{
			user,
			token,
			login,
			register,
			logout,
			isAuthenticated: !!token
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