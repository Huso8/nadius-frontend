import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Grid, Rating, TextField, Alert, CircularProgress } from '@mui/material';
import { getProduct, getProductReviews, addReview } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const { isAuthenticated } = useAuth();
	const [product, setProduct] = useState<any>(null);
	const [reviews, setReviews] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [reviewError, setReviewError] = useState<string | null>(null);
	const [reviewSuccess, setReviewSuccess] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				if (!id) return;
				const data = await getProduct(id);
				setProduct(data);
				const reviewsData = await getProductReviews(id);
				setReviews(reviewsData);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Ошибка при загрузке продукта');
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
		}
	};

	const handleAddReview = async () => {
		if (!isAuthenticated) {
			setReviewError('Для добавления отзыва необходимо войти в аккаунт');
			return;
		}

		if (!rating) {
			setReviewError('Поставьте оценку');
			return;
		}

		try {
			await addReview({ product: id!, rating, comment });
			setReviewSuccess(true);
			setRating(null);
			setComment('');
			setReviewError(null);
			const reviewsData = await getProductReviews(id!);
			setReviews(reviewsData);
		} catch (err: any) {
			setReviewError(err.response?.data?.message || 'Ошибка при добавлении отзыва');
		}
	};

	if (loading) {
		return (
			<Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
				<CircularProgress />
			</Container>
		);
	}

	if (error || !product) {
		return (
			<Container sx={{ py: 8 }}>
				<Alert severity="error">{error || 'Продукт не найден'}</Alert>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 8 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ p: 3, height: '100%' }}>
						<img
							src={product.image}
							alt={product.name}
							style={{
								width: '100%',
								height: 'auto',
								borderRadius: '8px',
								marginBottom: '16px'
							}}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ p: 3 }}>
						<Typography variant="h4" component="h1" gutterBottom>
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
							size="large"
							onClick={handleAddToCart}
							sx={{ mt: 2 }}
						>
							Добавить в корзину
						</Button>
					</Paper>

					<Paper elevation={3} sx={{ p: 3, mt: 4 }}>
						<Typography variant="h6" gutterBottom>
							Отзывы
						</Typography>
						{reviewError && <Alert severity="error" sx={{ mb: 2 }}>{reviewError}</Alert>}
						{reviewSuccess && <Alert severity="success" sx={{ mb: 2 }}>Отзыв успешно добавлен</Alert>}

						<Box sx={{ mb: 3 }}>
							<Typography variant="subtitle1" gutterBottom>
								Добавить отзыв
							</Typography>
							<Rating
								value={rating}
								onChange={(_, newValue) => setRating(newValue)}
								sx={{ mb: 2 }}
							/>
							<TextField
								fullWidth
								multiline
								rows={3}
								label="Комментарий"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								sx={{ mb: 2 }}
							/>
							<Button
								variant="contained"
								onClick={handleAddReview}
								disabled={!rating}
							>
								Отправить отзыв
							</Button>
						</Box>

						{reviews.length > 0 ? (
							reviews.map((review) => (
								<Box key={review._id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
									<Rating value={review.rating} readOnly sx={{ mb: 1 }} />
									<Typography variant="body2" color="text.secondary">
										{new Date(review.createdAt).toLocaleDateString('ru-RU')}
									</Typography>
									{review.comment && (
										<Typography variant="body1" sx={{ mt: 1 }}>
											{review.comment}
										</Typography>
									)}
								</Box>
							))
						) : (
							<Typography color="text.secondary">
								Пока нет отзывов
							</Typography>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 