import { api, API_ENDPOINTS } from './api/config';
import { LoginData, RegisterData, AuthResponse, User } from '../types/types';
import { ApiResponse } from './api/types';

export const authService = {
	async getCurrentUser(): Promise<User> {
		const response = await api.get<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/me`);
		return response.data.data;
	},

	async login(userData: LoginData): Promise<AuthResponse> {
		const response = await api.post<ApiResponse<AuthResponse>>(
			`${API_ENDPOINTS.AUTH}/login`,
			userData
		);
		localStorage.setItem('token', response.data.data.token);
		return response.data.data;
	},

	async register(userData: RegisterData): Promise<AuthResponse> {
		const response = await api.post<ApiResponse<AuthResponse>>(
			`${API_ENDPOINTS.AUTH}/register`,
			userData
		);
		localStorage.setItem('token', response.data.data.token);
		return response.data.data;
	},

	logout(): void {
		localStorage.removeItem('token');
	}
}; 