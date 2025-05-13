import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { getProductReviews, addReview, getProductRating } from '../services/api';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { addToCart } = useCart();
	const [open, setOpen] = useState(false);
	const [reviews, setReviews] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState<number | null>(null);
	const [ratingInfo, setRatingInfo] = useState<{ rating: number; count: number }>({ rating: 0, count: 0 });
	const [comment, setComment] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [myRating, setMyRating] = useState<number | null>(null);

	useEffect(() => {
		if (product._id) {
			getProductRating(product._id)
				.then(setRatingInfo)
				.catch(error => {
					console.error('Error fetching rating:', error);
					setRatingInfo({ rating: 0, count: 0 });
				});
		}
	}, [product._id, success]);

	const handleOpen = async () => {
		setOpen(true);
		setLoading(true);
		try {
			const data = await getProductReviews(product._id);
			setReviews(data);
		} catch {
			setError('Ошибка при загрузке отзывов');
		} finally {
			setLoading(false);
		}
	};

	const handleAddReview = async () => {
		if (!myRating) return setError('Поставьте оценку!');
		setError(null);
		setSuccess(false);
		try {
			await addReview({ product: product._id, rating: myRating, comment });
			setSuccess(true);
			setComment('');
			setMyRating(null);
			const data = await getProductReviews(product._id);
			setReviews(data);
			getProductRating(product._id).then(setRatingInfo);
		} catch (e: any) {
			if (e.response && e.response.status === 401) setError('Только авторизованные пользователи могут оставлять отзывы.');
			else setError('Ошибка при добавлении отзыва');
		}
	};

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 420 }}>
			<CardMedia
				component="img"
				height="200"
				image={product.image}
				alt={product.name}
				sx={{ objectFit: 'cover' }}
			/>
			<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
				<div>
					<Typography gutterBottom variant="h6" component="div">
						{product.name}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{product.description}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
						<Rating value={ratingInfo.rating} precision={0.1} readOnly size="small" />
						<Typography variant="body2" color="text.secondary">
							{ratingInfo.rating ? ratingInfo.rating.toFixed(1) : '—'} ({ratingInfo.count})
						</Typography>
					</Box>
					<Button size="small" onClick={handleOpen}>Отзывы</Button>
				</div>
				<Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h6" color="primary">
						{product.price} ₽
					</Typography>
					<Button variant="contained" color="primary" onClick={() => addToCart(product)}>
						В корзину
					</Button>
				</Box>
			</CardContent>
			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle>Отзывы о товаре</DialogTitle>
				<DialogContent>
					{loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress /></Box>}
					{!loading && reviews.length === 0 && <Typography color="text.secondary">Пока нет отзывов.</Typography>}
					{!loading && reviews.length > 0 && (
						<List>
							{reviews.map((r) => (
								<ListItem key={r._id} alignItems="flex-start">
									<ListItemText
										primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<Rating value={r.rating} readOnly size="small" />
											<Typography variant="body2">{r.user?.name || 'Пользователь'}</Typography>
										</Box>}
										secondary={r.comment}
									/>
								</ListItem>
							))}
						</List>
					)}
					<Box sx={{ mt: 2 }}>
						<Typography variant="subtitle1" gutterBottom>Оставить отзыв</Typography>
						<Rating
							value={myRating}
							onChange={(_, v) => setMyRating(v)}
						/>
						<TextField
							fullWidth
							label="Комментарий"
							value={comment}
							onChange={e => setComment(e.target.value)}
							multiline
							rows={2}
							sx={{ mt: 1 }}
						/>
						{error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
						{success && <Alert severity="success" sx={{ mt: 1 }}>Спасибо за отзыв!</Alert>}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Закрыть</Button>
					<Button onClick={handleAddReview} variant="contained">Отправить</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default ProductCard; 