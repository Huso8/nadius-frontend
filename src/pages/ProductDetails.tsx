import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Rating, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useProduct, useReviews } from '../services/api';
import { ROUTES } from '../constants/navigation';
import OptimizedImage from '../components/common/OptimizedImage';
import ReviewForm from '../components/ReviewForm';
import { Review } from '../types';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();
	const [showReviews, setShowReviews] = useState(false);

	const { data: product, isLoading: productLoading, error: productError } = useProduct(id || '');
	const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useReviews(showReviews ? id || '' : '');

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
		}
	};

	if (productLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<CircularProgress />
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

	const reviewsList = reviews || [];
	const averageRating = reviewsList.length > 0
		? reviewsList.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviewsList.length
		: 0;

	return (
		<Container>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<OptimizedImage
						src={product.image}
						alt={product.name}
						style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h4" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5" color="primary" gutterBottom>
						{product.price} ₽
					</Typography>
					<Typography variant="body1" paragraph>
						{product.description}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddToCart}
						sx={{ mt: 2 }}
					>
						Добавить в корзину
					</Button>

					<Box sx={{ mt: 4 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
							<Typography variant="h6">
								Отзывы
							</Typography>
							<Button
								variant="outlined"
								onClick={() => setShowReviews(!showReviews)}
								disabled={reviewsLoading}
							>
								{showReviews ? 'Скрыть отзывы' : 'Показать отзывы'}
							</Button>
						</Box>
						{showReviews && (
							<>
								{reviewsLoading ? (
									<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
										<CircularProgress />
									</Box>
								) : reviewsList.length === 0 ? (
									<Typography color="text.secondary">
										Пока нет отзывов. Будьте первым!
									</Typography>
								) : (
									reviewsList.map((review: Review) => (
										<Box key={`${review._id}-${review.createdAt}`} sx={{ mb: 2 }}>
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
							</>
						)}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 