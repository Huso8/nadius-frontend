import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Review } from '../../types/types';
import { api, API_ENDPOINTS } from './config';
import { useAuth } from '../../context/AuthContext';

export const useReviews = () => {
	return useQuery<Review[]>({
		queryKey: ['allReviews'],
		queryFn: async () => {
			try {
				const response = await api.get<Review[]>(`${API_ENDPOINTS.REVIEWS}/all`);
				return response.data;
			} catch (error) {
				console.error('Error fetching reviews:', error);
				throw new Error('Ошибка при загрузке отзывов');
			}
		},
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
	const { user } = useAuth();
	return useMutation({
		mutationFn: async ({ review }: { review: CreateReviewData }) => {
			const url = user ? `${API_ENDPOINTS.REVIEWS}/general` : API_ENDPOINTS.REVIEWS;
			const { data } = await api.post(url, review);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['allReviews'] });
		},
	});
}; 