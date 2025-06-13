import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../../types/types';
import { api, API_ENDPOINTS } from './config';

export const useProducts = () => {
	return useQuery<Product[]>({
		queryKey: ['products'],
		queryFn: async () => {
			try {
				const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
				return response.data;
			} catch (error) {
				console.error('Error fetching products:', error);
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

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: async () => {
			try {
				const response = await api.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
				return response.data;
			} catch (error) {
				console.error(`Error fetching product ${id}:`, error);
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