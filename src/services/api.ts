import axios, { AxiosError } from 'axios';
import { Product, Order, Review, User, CreateOrderData } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API Types
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

export interface ApiError {
	message: string;
	code?: string;
	details?: unknown;
}

const API_URL = process.env.REACT_APP_API_URL;

const API_ENDPOINTS = {
	PRODUCTS: `api/products`,
	ORDERS: `api/orders`,
	AUTH: `api/auth`,
	REVIEWS: `api/reviews`,
} as const;

const api = axios.create({
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

// React Query хуки
export const useProducts = () => {
	return useQuery<Product[]>({
		queryKey: ['products'],
		queryFn: async () => {
			try {
				const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
				return response.data;
			} catch (error) {
				console.error('Error fetching products:', error);
				if (axios.isAxiosError(error)) {
					console.error('Response data:', error.response?.data);
					console.error('Response status:', error.response?.status);
				}
				throw new Error('Ошибка при загрузке продуктов');
			}
		},
		enabled: true,
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (product: Omit<Product, '_id'>) => {
			const { data } = await api.post(`${API_ENDPOINTS.PRODUCTS}`, product);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ _id, ...product }: Product) => {
			const { data } = await api.put(`${API_ENDPOINTS.PRODUCTS}/${_id}`, product);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (_id: string) => {
			await api.delete(`${API_ENDPOINTS.PRODUCTS}/${_id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
};

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: async () => {
			try {
				const response = await api.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
				return response.data;
			} catch (error) {
				console.error(`Error fetching product ${id}:`, error);
				if (axios.isAxiosError(error)) {
					console.error('Response data:', error.response?.data);
					console.error('Response status:', error.response?.status);
				}
				throw new Error('Ошибка при загрузке продукта');
			}
		},
		enabled: !!id,
		initialData: null,
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

export const useOrders = () => {
	return useQuery<Order[]>({
		queryKey: ['orders'],
		queryFn: async () => {
			try {
				const response = await api.get<Order[]>(`${API_ENDPOINTS.ORDERS}/user`);
				return response.data;
			} catch (error) {
				console.error('Error fetching orders:', error);
				if (axios.isAxiosError(error)) {
					console.error('Response data:', error.response?.data);
					console.error('Response status:', error.response?.status);
				}
				throw new Error('Ошибка при загрузке заказов');
			}
		},
		enabled: true,
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

export const useAdminOrders = () => {
	const queryClient = useQueryClient();
	return useQuery<Order[]>({
		queryKey: ['adminOrders'],
		queryFn: async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('Требуется авторизация');
				}

				const response = await api.get<Order[]>(API_ENDPOINTS.ORDERS, {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				return response.data;
			} catch (error) {
				console.error('Error fetching admin orders:', error);
				if (axios.isAxiosError(error)) {
					console.error('Response data:', error.response?.data);
					console.error('Response status:', error.response?.status);
				}
				throw new Error('Ошибка при загрузке заказов');
			}
		},
		enabled: true,
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
			const { data } = await api.patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
		},
	});
};

export const useAuth = () => {
	const queryClient = useQueryClient();
	return {
		register: useMutation({
			mutationFn: async (userData: { email: string; password: string; name: string }) => {
				try {
					const response = await api.post<ApiResponse<{ token: string; user: User }>>(`${API_ENDPOINTS.AUTH}/register`, userData);
					if (response.data?.data?.token && response.data?.data?.user) {
						localStorage.setItem('token', response.data.data.token);
						return response.data.data;
					} else {
						throw new Error('Токен или данные пользователя не получены от сервера');
					}
				} catch (error) {
					console.error('Registration error:', error);
					if (axios.isAxiosError(error)) {
						throw new Error(error.response?.data?.message || 'Ошибка при регистрации');
					}
					throw error;
				}
			}
		}),
		login: useMutation({
			mutationFn: async (credentials: { email: string; password: string }) => {
				try {
					const response = await api.post<ApiResponse<{ token: string; user: User }>>(`${API_ENDPOINTS.AUTH}/login`, credentials);
					if (response.data?.data?.token) {
						localStorage.setItem('token', response.data.data.token);
						return response.data.data;
					} else {
						throw new Error('Токен не получен от сервера');
					}
				} catch (error) {
					if (axios.isAxiosError(error)) {
						if (error.response?.status === 401) {
							return Promise.reject(new Error('Неверный email или пароль'));
						}
						return Promise.reject(new Error(error.response?.data?.message || 'Ошибка при входе'));
					}
					return Promise.reject(error);
				}
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
			try {
				const response = await api.get<Review[]>(`${API_ENDPOINTS.REVIEWS}/${productId}`);
				if (!Array.isArray(response.data)) {
					console.error('Invalid reviews response format:', response.data);
					return [];
				}
				return response.data;
			} catch (error) {
				console.error(`Error fetching reviews for product ${productId}:`, error);
				if (axios.isAxiosError(error)) {
					console.error('Response data:', error.response?.data);
					console.error('Response status:', error.response?.status);
				}
				return [];
			}
		},
		enabled: !!productId,
		initialData: [],
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

export const useAddReview = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { product: string; rating: number; comment: string }) => {
			try {
				const response = await api.post<Review>(API_ENDPOINTS.REVIEWS, data);
				return response.data;
			} catch (error) {
				console.error('Error adding review:', error);
				if (axios.isAxiosError(error)) {
					throw new Error(error.response?.data?.message || 'Ошибка при добавлении отзыва');
				}
				throw error;
			}
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['reviews', variables.product] });
		}
	});
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (orderData: CreateOrderData) => {
			try {
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				const { data } = await api.post<Order>(API_ENDPOINTS.ORDERS, orderData, config);
				return data;
			} catch (error: unknown) {
				console.error('Error creating order:', error);
				if (axios.isAxiosError(error)) {
					console.error('Error details:', error.response?.data);
					console.error('Error status:', error.response?.status);
					console.error('Error headers:', error.response?.headers);
					throw new Error(error.response?.data?.message || 'Ошибка при создании заказа');
				}
				throw new Error('Неизвестная ошибка при создании заказа');
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
		},
	});
};

export const useUsers = () => {
	return useQuery<User[]>({
		queryKey: ['users'],
		queryFn: async () => {
			const { data } = await api.get(`${API_ENDPOINTS.AUTH}/users`);
			return data;
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (userId: string) => {
			await api.delete(`${API_ENDPOINTS.AUTH}/users/${userId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};

export const useCancelOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (orderId: string) => {
			const { data } = await api.patch(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, {
				status: 'cancelled'
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
}; 