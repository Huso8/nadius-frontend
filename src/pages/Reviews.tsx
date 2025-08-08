import React from 'react';
import {
	Container,
	Typography,
	Box,
	CircularProgress,
	Alert,
	List,
	Paper,
	Rating,
	Avatar,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, API_ENDPOINTS } from '../services/api/config';
import { Review as ReviewType } from '../types/types';
import { formatDate } from '../utils/dateUtils';
import FormContainer from '../components/common/FormContainer';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import { useOrders } from '../services/api';

const fetchReviews = async () => {
	const { data } = await api.get<ReviewType[]>(`${API_ENDPOINTS.REVIEWS}/all`);
	return data;
};

const ReviewsPage: React.FC = () => {
	const { data: reviews, isLoading, isError, error } = useQuery<ReviewType[]>({
		queryKey: ['allReviews'],
		queryFn: fetchReviews,
	});
	const { user } = useAuth();
	const { data: orders = [] } = useOrders({ enabled: !!user });
	const queryClient = useQueryClient();

	const handleReviewSubmitted = () => {
		queryClient.invalidateQueries({ queryKey: ['allReviews'] });
	};

	let canReview = false;
	let alreadyReviewed = false;
	if (user) {
		canReview = Array.isArray(orders) && orders.length > 0;
		if (canReview && reviews && user._id) {
			alreadyReviewed = reviews.some(r => r.user?._id === user._id);
		}
	} else {
		const guestOrders = JSON.parse(localStorage.getItem('guestOrders') || '[]');
		canReview = Array.isArray(guestOrders) && guestOrders.length > 0;
		if (canReview && reviews && guestOrders.length > 0) {
			const guestName = guestOrders[guestOrders.length - 1]?.contactInfo?.name;
			if (guestName) {
				alreadyReviewed = reviews.some(r => r.guestName === guestName);
			}
		}
	}

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Alert severity="error">
				Ошибка при загрузке отзывов: {error instanceof Error ? error.message : 'Произошла неизвестная ошибка'}
			</Alert>
		);
	}

	return (
		<FormContainer>
			<Container maxWidth="md">
				<Typography variant="h4" component="h1" gutterBottom align="center">
					Все отзывы
				</Typography>

				{(
					<Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
						<Typography variant="h6" component="h2" gutterBottom>
							Оставить отзыв
						</Typography>
						{alreadyReviewed ? (
							<Alert severity="info" sx={{ mt: 2 }}>
								Вы уже оставили отзыв
							</Alert>
						) : (
							<ReviewForm onReviewSubmitted={handleReviewSubmitted} canReview={canReview} />
						)}
					</Box>
				)}

				{reviews && reviews.length > 0 ? (
					<List sx={{ p: 0 }}>
						{reviews.map((review) => (
							<Paper key={review._id} sx={{ mb: 2, p: 2 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
									<Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
										{review.user?.name ? review.user.name[0] : (review.guestName ? review.guestName[0] : 'А')}
									</Avatar>
									<Box sx={{ flexGrow: 1 }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
											<Typography variant="subtitle1" component="span">
												{review.user?.name || review.guestName || 'Анонимный пользователь'}
											</Typography>
											<Typography variant="caption" color="text.secondary">
												{formatDate(review.createdAt)}
											</Typography>
										</Box>
										<Rating value={review.rating} readOnly precision={0.5} size="small" />
									</Box>
								</Box>
								<Typography variant="body2" color="text.primary" sx={{ pl: '56px' }}>
									{review.comment}
								</Typography>
							</Paper>
						))}
					</List>
				) : (
					<Typography variant="body1" align="center">
						Отзывов пока нет.
					</Typography>
				)}
			</Container>
		</FormContainer>
	);
};

export default ReviewsPage; 