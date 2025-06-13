import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Rating, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext';
import { useProduct, useReviews } from '../services/api';
import { ROUTES } from '../constants/navigation';
import OptimizedImage from '../components/common/OptimizedImage';
import Review from '../components/Reviews/Review';
import ReviewForm from '../components/Reviews/ReviewForm';
import { Review as ReviewType } from '../types/types';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const { data: product, isLoading: productLoading, error: productError } = useProduct(id || '');
	const { data: reviews, isLoading: reviewsLoading, refetch: refetchReviews } = useReviews(id || '');

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
		}
	};

	const renderReviews = () => {
		if (!product) return null;

		if (reviewsLoading) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
					<CircularProgress />
				</Box>
			);
		}

		return (
			<Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<IconButton
						onClick={() => navigate(ROUTES.MENU)}
						sx={{ mr: 1 }}
					>
						<ArrowBackIcon />
					</IconButton>
					<Typography variant="h6">Отзывы</Typography>
				</Box>

				<Box sx={{ mb: 4 }}>
					<ReviewForm
						productId={product._id}
						onReviewSubmitted={() => {
							refetchReviews();
						}}
					/>
				</Box>

				{!reviews || reviews.length === 0 ? (
					<Typography color="text.secondary">
						Пока нет отзывов. Будьте первым!
					</Typography>
				) : (
					reviews.map((review: ReviewType) => (
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
		);
	};

	if (productLoading || productError || !product) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	return (
		<Container sx={{ mt: 4 }}>
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
						{renderReviews()}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 