import axios, { AxiosError } from 'axios';
import { Product, Order } from '../types';

const API_URL = process.env.API_URL || 'http://localhost:5000';

const API_ENDPOINTS = {
	PRODUCTS: `${API_URL}/products`,
	ORDERS: `${API_URL}/orders`,
	AUTH: `${API_URL}/auth`,
	REVIEWS: `${API_URL}/reviews`
} as const;

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true
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
	(error: AxiosError) => {
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

export const getProducts = async (): Promise<Product[]> => {
	const response = await api.get(API_ENDPOINTS.PRODUCTS);
	console.log('API URL:', process.env.REACT_APP_API_URL);
	return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
	const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
	return response.data;
};

export const createOrder = async (orderData: Omit<Order, '_id' | 'status' | 'createdAt'>): Promise<Order> => {
	const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
	return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
	const response = await api.get(API_ENDPOINTS.ORDERS);
	return response.data;
};

export const getOrder = async (id: string): Promise<Order> => {
	const response = await api.get(`${API_ENDPOINTS.ORDERS}/${id}`);
	return response.data;
};

export const register = async (userData: { email: string; password: string; name: string }) => {
	const response = await api.post(`${API_ENDPOINTS.AUTH}/register`, userData);
	return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
	const response = await api.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
	return response.data;
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
	const response = await api.patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status });
	return response.data;
};

export const getMyOrders = async () => {
	const response = await api.get(`${API_ENDPOINTS.ORDERS}/my`);
	return response.data;
};

export const getProductReviews = async (productId: string) => {
	const response = await api.get(`${API_ENDPOINTS.REVIEWS}/${productId}`);
	return response.data;
};

export const addReview = async (data: { product: string; rating: number; comment: string }) => {
	const response = await api.post(API_ENDPOINTS.REVIEWS, data);
	return response.data;
};

export const getProductRating = async (productId: string) => {
	const response = await api.get(`${API_ENDPOINTS.REVIEWS}/${productId}/rating`);
	return response.data;
}; 