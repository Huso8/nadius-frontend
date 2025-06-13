import axios, { AxiosError } from 'axios';
import { ApiError } from './types';

export const API_URL = process.env.REACT_APP_API_URL;

export const API_ENDPOINTS = {
	PRODUCTS: `api/products`,
	ORDERS: `api/orders`,
	AUTH: `api/auth`,
	REVIEWS: `api/reviews`,
} as const;

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	}
});

// Добавляем токен к запросам, если он есть
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Обработка ошибок
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiError>) => {
		if (error.response?.status === 401) {
			// Очищаем токен только если это не страница логина
			if (!window.location.pathname.includes('/login')) {
				localStorage.removeItem('token');
				window.location.href = '/login';
			}
		}
		console.error('API Error:', {
			url: error.config?.url,
			method: error.config?.method,
			status: error.response?.status,
			message: error.message,
			response: error.response?.data
		});
		return Promise.reject(error);
	}
); 