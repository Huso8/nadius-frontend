import React, { useState } from 'react';
import { Box, TextField, Button, Rating, Typography, Alert } from '@mui/material';
import { useAddReview } from '../services/api';
import { FORBIDDEN_WORDS } from '../constants/forbiddenWords';
import { useAuth } from '../context/AuthContext';

const MAX_WORDS = 50;

interface ReviewFormProps {
	onReviewSubmitted: () => void;
	canReview: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewSubmitted, canReview }) => {
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [error, setError] = useState<string | null>(null);
	const addReview = useAddReview();
	const { user } = useAuth();

	const checkForbiddenWords = (text: string): string[] => {
		const words = text.toLowerCase().split(/\s+/);
		return FORBIDDEN_WORDS.filter(word => words.includes(word.toLowerCase()));
	};

	const countWords = (text: string): number => {
		return text.trim().split(/\s+/).filter(word => word.length > 0).length;
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newComment = e.target.value;
		const wordCount = countWords(newComment);
		if (wordCount <= MAX_WORDS) {
			setComment(newComment);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!rating) return;
		setError(null);

		const wordCount = countWords(comment);
		if (wordCount > MAX_WORDS) {
			setError(`Отзыв не должен превышать ${MAX_WORDS} слов`);
			return;
		}

		const forbiddenWords = checkForbiddenWords(comment);
		if (forbiddenWords.length > 0) {
			setError(`Пожалуйста, не используйте запрещенные слова: ${forbiddenWords.join(', ')}`);
			return;
		}

		try {
			let reviewPayload: any = {
				review: {
					rating,
					comment
				}
			};
			if (!user) {
				const guestOrders = JSON.parse(localStorage.getItem('guestOrders') || '[]');
				const lastOrder = guestOrders[guestOrders.length - 1];
				if (lastOrder && lastOrder.contactInfo) {
					reviewPayload.review.guestName = lastOrder.contactInfo.name;
					reviewPayload.review.guestEmail = lastOrder.contactInfo.email;
					reviewPayload.review.guestPhone = lastOrder.contactInfo.phone;
				}
			}
			await addReview.mutateAsync(reviewPayload);
			setRating(null);
			setComment('');
			onReviewSubmitted();
		} catch (error: any) {
			console.error('Error submitting review:', error);
			if (error.response?.data?.message) {
				setError(error.response.data.message);
			} else {
				setError('Ошибка при отправке отзыва');
			}
		}
	};

	if (!canReview) {
		return (
			<Alert severity="info" sx={{ mt: 2 }}>
				Чтобы оставить отзыв, вам нужно сделать заказ
			</Alert>
		);
	}

	if (error) {
		return (
			<Alert severity="error" sx={{ mt: 2 }}>
				{error}
			</Alert>
		);
	}

	const wordCount = countWords(comment);
	const isWordLimitExceeded = wordCount > MAX_WORDS;

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
			<Box sx={{ mb: 2 }}>
				<Typography component="legend">Оценка</Typography>
				<Rating
					value={rating}
					onChange={(_, newValue) => setRating(newValue)}
					precision={1}
					max={5}
				/>
			</Box>
			<TextField
				fullWidth
				multiline
				rows={4}
				value={comment}
				onChange={handleCommentChange}
				placeholder="Напишите ваш отзыв..."
				sx={{ mb: 1 }}
				error={isWordLimitExceeded}
				helperText={`${wordCount}/${MAX_WORDS} слов`}
			/>
			<Button
				type="submit"
				variant="contained"
				disabled={!rating || addReview.isPending || isWordLimitExceeded}
			>
				{addReview.isPending ? 'Отправка...' : 'Отправить отзыв'}
			</Button>
		</Box>
	);
};

export default ReviewForm; 