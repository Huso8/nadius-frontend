import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Rating, TextField, Alert } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useProduct, useReviews, useAddReview } from '../services/api';
import OptimizedImage from '../components/OptimizedImage';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');

	const { data: product, isLoading: productLoading, error: productError } = useProduct(id || '');
	const { data: reviews = [], isLoading: reviewsLoading } = useReviews(id || '');
	const addReviewMutation = useAddReview();

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
		}
	};

	const handleReviewSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (rating && comment && id) {
			try {
				await addReviewMutation.mutateAsync({
					product: id,
					rating,
					comment
				});
				setRating(null);
				setComment('');
			} catch (error) {
				console.error('Error adding review:', error);
			}
		}
	};

	if (productLoading || reviewsLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Typography>Загрузка...</Typography>
				</Box>
			</Container>
		);
	}

	if (productError || !product) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Typography color="error">Ошибка при загрузке продукта</Typography>
				</Box>
			</Container>
		);
	}

	const averageRating = reviews.length > 0
		? reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length
		: 0;

	return (
		<Container sx={{ py: 4 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<OptimizedImage
						src={product.image}
						alt={product.name}
						style={{
							width: '100%',
							height: 'auto',
							borderRadius: '8px',
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h4" component="h1" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="body1" paragraph>
						{product.description}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
						<Rating value={averageRating} readOnly precision={0.5} />
						<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
							({reviews.length} отзывов)
						</Typography>
					</Box>
					<Typography variant="h5" color="primary" gutterBottom>
						{product.price} ₽
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={handleAddToCart}
						sx={{ mt: 2 }}
					>
						В корзину
					</Button>

					<Box sx={{ mt: 4 }}>
						<Typography variant="h6" gutterBottom>
							Оставить отзыв
						</Typography>
						<form onSubmit={handleReviewSubmit}>
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
								disabled={!rating || !comment}
							>
								Отправить отзыв
							</Button>
						</form>
					</Box>

					<Box sx={{ mt: 4 }}>
						<Typography variant="h6" gutterBottom>
							Отзывы
						</Typography>
						{reviews.length === 0 ? (
							<Typography color="text.secondary">
								Пока нет отзывов. Будьте первым!
							</Typography>
						) : (
							reviews.map((review: { _id: string; rating: number; comment: string; user?: { name: string } }) => (
								<Box key={review._id} sx={{ mb: 2 }}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
										<Rating value={review.rating} readOnly size="small" />
										<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
											{review.user?.name || 'Пользователь'}
										</Typography>
									</Box>
									<Typography variant="body1">{review.comment}</Typography>
								</Box>
							))
						)}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 