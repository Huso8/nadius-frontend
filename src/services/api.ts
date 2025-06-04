import axios, { AxiosError } from 'axios';
import { Product, Order } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_ENDPOINTS = {
	PRODUCTS: `/products`,
	ORDERS: `/orders`,
	AUTH: `/auth`,
	REVIEWS: `/reviews`,
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

// React Query хуки
export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.PRODUCTS);
			return response.data as Product[];
		}
	});
};

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: async () => {
			const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
			return response.data as Product;
		},
		enabled: !!id
	});
};

export const useOrders = () => {
	return useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.ORDERS);
			return response.data as Order[];
		}
	});
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (orderData: Omit<Order, '_id' | 'status' | 'createdAt'>) => {
			const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
			return response.data as Order;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}
	});
};

export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
			const response = await api.patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status });
			return response.data as Order;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}
	});
};

export const useAuth = () => {
	const queryClient = useQueryClient();
	return {
		register: useMutation({
			mutationFn: async (userData: { email: string; password: string; name: string }) => {
				const response = await api.post(`${API_ENDPOINTS.AUTH}/register`, userData);
				localStorage.setItem('token', response.data.token);
				return response.data;
			}
		}),
		login: useMutation({
			mutationFn: async (credentials: { email: string; password: string }) => {
				const response = await api.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
				localStorage.setItem('token', response.data.token);
				return response.data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['user'] });
			}
		})
	};
};

export const useReviews = (productId: string) => {
	return useQuery({
		queryKey: ['reviews', productId],
		queryFn: async () => {
			const response = await api.get(`${API_ENDPOINTS.REVIEWS}/${productId}`);
			return response.data;
		},
		enabled: !!productId
	});
};

export const useAddReview = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { product: string; rating: number; comment: string }) => {
			const response = await api.post(API_ENDPOINTS.REVIEWS, data);
			return response.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['reviews', variables.product] });
		}
	});
}; 