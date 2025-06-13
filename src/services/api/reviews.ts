import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Review } from '../../types/types';
import { api, API_ENDPOINTS } from './config';

export const useReviews = (productId: string) => {
	return useQuery<Review[]>({
		queryKey: ['reviews', productId],
		queryFn: async () => {
			try {
				const response = await api.get<Review[]>(`${API_ENDPOINTS.REVIEWS}/${productId}`);
				return response.data;
			} catch (error) {
				console.error('Error fetching reviews:', error);
				throw new Error('Ошибка при загрузке отзывов');
			}
		},
		enabled: !!productId,
		retry: 3,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		staleTime: 0,
		gcTime: 30 * 60 * 1000
	});
};

interface CreateReviewData {
	rating: number;
	comment: string;
}

export const useAddReview = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ productId, review }: { productId: string; review: CreateReviewData }) => {
			const { data } = await api.post(`${API_ENDPOINTS.REVIEWS}/${productId}`, review);
			return data;
		},
		onSuccess: (_, { productId }) => {
			queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
		},
	});
}; 