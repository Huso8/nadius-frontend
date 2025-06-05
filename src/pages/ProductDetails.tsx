import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Rating } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useProduct, useReviews } from '../services/api';
import { ROUTES } from '../constants/navigation';
import OptimizedImage from '../components/common/OptimizedImage';
import ReviewForm from '../components/ReviewForm';
import { Review } from '../types';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();

	const { data: product, isLoading: productLoading, error: productError } = useProduct(id || '');
	const { data: reviews, isLoading: reviewsLoading } = useReviews(id || '');

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
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

	const reviewsList = reviews || [];
	const averageRating = reviewsList.length > 0
		? reviewsList.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviewsList.length
		: 0;

	return (
		<Container sx={{ py: 4 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Box sx={{
						width: '500px',
						height: '300px',
						margin: '0 auto'
					}}>
						<OptimizedImage
							src={product.image}
							alt={product.name}
							width="100%"
							height="100%"
							style={{
								borderRadius: '8px',
							}}
						/>
					</Box>
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
							({reviewsList.length} отзывов)
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
						<ReviewForm productId={String(product._id)} />
					</Box>

					<Box sx={{ mt: 4 }}>
						<Typography variant="h6" gutterBottom>
							Отзывы
						</Typography>
						{reviewsList.length === 0 ? (
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
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 