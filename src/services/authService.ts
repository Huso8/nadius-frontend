import { api, API_ENDPOINTS } from './api/config';
import { LoginData, RegisterData, AuthResponse, User } from '../types/types';
import { ApiResponse } from './api/types';
import axios from 'axios';

export const authService = {
	async getCurrentUser(): Promise<User> {
		const response = await api.get<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/me`);
		return response.data.data;
	},

	async login(userData: LoginData): Promise<AuthResponse> {
		try {
			const response = await api.post<ApiResponse<AuthResponse>>(
				`${API_ENDPOINTS.AUTH}/login`,
				userData
			);
			localStorage.setItem('token', response.data.data.token);
			return response.data.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				throw new Error('Неверный email или пароль');
			}
			throw error;
		}
	},

	async register(userData: RegisterData): Promise<AuthResponse> {
		try {
			const response = await api.post<ApiResponse<AuthResponse>>(
				`${API_ENDPOINTS.AUTH}/register`,
				userData
			);
			localStorage.setItem('token', response.data.data.token);
			return response.data.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				throw new Error(error.response.data.message || 'Ошибка при регистрации');
			}
			throw error;
		}
	},

	logout(): void {
		localStorage.removeItem('token');
	}
}; 