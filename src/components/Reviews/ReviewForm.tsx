import React, { useState } from 'react';
import { Box, TextField, Button, Rating, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useAddReview } from '../../services/api';

interface ReviewFormProps {
	productId: string;
	onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const { isAuthenticated } = useAuth();
	const addReview = useAddReview();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!rating) return;

		try {
			await addReview.mutateAsync({
				productId,
				review: {
					rating,
					comment
				}
			});
			setRating(null);
			setComment('');
			onReviewSubmitted();
		} catch (error) {
			console.error('Error submitting review:', error);
		}
	};

	if (!isAuthenticated) {
		return (
			<Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
				Войдите, чтобы оставить отзыв
			</Typography>
		);
	}

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
			<Box sx={{ mb: 2 }}>
				<Typography component="legend">Оценка</Typography>
				<Rating
					value={rating}
					onChange={(_, newValue) => setRating(newValue)}
					precision={0.5}
				/>
			</Box>
			<TextField
				fullWidth
				multiline
				rows={4}
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder="Напишите ваш отзыв..."
				sx={{ mb: 2 }}
			/>
			<Button
				type="submit"
				variant="contained"
				disabled={!rating || addReview.isPending}
			>
				{addReview.isPending ? 'Отправка...' : 'Отправить отзыв'}
			</Button>
		</Box>
	);
};

export default ReviewForm; 