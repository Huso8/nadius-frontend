import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, API_ENDPOINTS } from './config';
import { User } from '../../types/types';

export const useUsers = () => {
	return useQuery<User[]>({
		queryKey: ['users'],
		queryFn: async () => {
			try {
				const response = await api.get<User[]>(`${API_ENDPOINTS.AUTH}/users`);
				return response.data;
			} catch (error) {
				console.error('Error fetching users:', error);
				throw new Error('Ошибка при загрузке пользователей');
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