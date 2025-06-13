import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, CreateOrderData } from '../../types/types';
import { api, API_ENDPOINTS } from './config';

export const useOrders = () => {
	return useQuery<Order[]>({
		queryKey: ['orders'],
		queryFn: async () => {
			try {
				const response = await api.get<Order[]>(`${API_ENDPOINTS.ORDERS}/my-orders`);
				return response.data;
			} catch (error) {
				console.error('Error fetching orders:', error);
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
	return useQuery<Order[]>({
		queryKey: ['adminOrders'],
		queryFn: async () => {
			try {
				const response = await api.get<Order[]>(API_ENDPOINTS.ORDERS);
				return response.data;
			} catch (error) {
				console.error('Error fetching admin orders:', error);
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

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (orderData: CreateOrderData) => {
			const { data } = await api.post(API_ENDPOINTS.ORDERS, orderData);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
};

export const useCancelOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (orderId: string) => {
			const { data } = await api.patch(`${API_ENDPOINTS.ORDERS}/${orderId}/status`, { status: 'cancelled' });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
		},
	});
}; 