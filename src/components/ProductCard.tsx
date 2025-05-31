import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { useReviews, useAddReview } from '../services/api';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState('');

	const { data: reviews = [] } = useReviews(product._id);
	const addReviewMutation = useAddReview();

	const handleAddToCart = () => {
		addToCart(product);
	};

	const handleReviewSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (rating && comment) {
			try {
				await addReviewMutation.mutateAsync({
					product: product._id,
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

	const averageRating = reviews.length > 0
		? reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length
		: 0;

	return (
		<Card sx={{ maxWidth: 345, m: 2 }}>
			<CardMedia
				component="img"
				height="200"
				image={product.image}
				alt={product.name}
				onClick={() => navigate(`/product/${product._id}`)}
				sx={{ cursor: 'pointer' }}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{product.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.description}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
					<Rating value={averageRating} readOnly precision={0.5} />
					<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
						({reviews.length})
					</Typography>
				</Box>
				<Typography variant="h6" color="primary" sx={{ mt: 2 }}>
					{product.price} ₽
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddToCart}
					sx={{ mt: 2 }}
				>
					В корзину
				</Button>
			</CardContent>
		</Card>
	);
};

export default ProductCard; 