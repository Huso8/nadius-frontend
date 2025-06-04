import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Rating, TextField, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useAddReview } from '../services/api';
import { ROUTES } from '../constants/navigation';

interface ReviewFormProps {
	productId: string;
	onReviewAdded?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewAdded }) => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [error, setError] = useState<string | null>(null);

	const addReviewMutation = useAddReview();

	const handleReviewSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!isAuthenticated) {
			navigate(ROUTES.LOGIN);
			return;
		}

		if (rating && comment) {
			try {
				await addReviewMutation.mutateAsync({
					product: productId,
					rating,
					comment
				});
				setRating(null);
				setComment('');
				if (onReviewAdded) {
					onReviewAdded();
				}
			} catch (error: any) {
				console.error('Error adding review:', error);
				setError(error.response?.data?.message || 'Ошибка при отправке отзыва');
			}
		}
	};

	if (!isAuthenticated) {
		return (
			<Box sx={{ mb: 2 }}>
				<Typography variant="body1" color="text.secondary" gutterBottom>
					Чтобы оставить отзыв, пожалуйста, войдите в систему
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate(ROUTES.LOGIN)}
				>
					Войти
				</Button>
			</Box>
		);
	}

	return (
		<form onSubmit={handleReviewSubmit}>
			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			<Rating
				value={rating}
				onChange={(_, value) => setRating(value)}
				sx={{ mb: 2 }}
			/>
			<TextField
				fullWidth
				multiline
				rows={4}
				label="Ваш отзыв"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				sx={{ mb: 2 }}
			/>
			<Button
				type="submit"
				variant="contained"
				disabled={!rating || !comment || addReviewMutation.isPending}
			>
				{addReviewMutation.isPending ? 'Отправка...' : 'Отправить отзыв'}
			</Button>
		</form>
	);
};

export default ReviewForm; 