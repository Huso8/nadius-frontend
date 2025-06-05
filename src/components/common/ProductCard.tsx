import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { useReviews } from '../../services/api';
import { ROUTES } from '../../constants/navigation';
import { COLORS, SPACING } from '../../constants/theme';
import ReviewForm from '../ReviewForm';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const { data: reviews = [] } = useReviews(product._id ? String(product._id) : '');

	const handleAddToCart = () => {
		addToCart(product);
	};

	const averageRating = reviews.length > 0
		? reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length
		: 0;

	const productId = String(product._id);

	return (
		<Card sx={{
			maxWidth: 345,
			m: SPACING.CARD.MARGIN,
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
			<CardMedia
				component="img"
				height="200"
				image={product.image}
				alt={product.name}
				onClick={() => navigate(ROUTES.PRODUCT(productId))}
				sx={{ cursor: 'pointer' }}
			/>
			<CardContent sx={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column'
			}}>
				<Typography gutterBottom variant="h5" component="div">
					{product.name}
				</Typography>
				<Typography
					variant="body2"
					color={COLORS.TEXT.SECONDARY}
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						flexGrow: 1
					}}
				>
					{product.description}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
					<Rating value={averageRating} readOnly precision={0.5} />
					<Typography variant="body2" color={COLORS.TEXT.SECONDARY} sx={{ ml: 1 }}>
						({reviews.length})
					</Typography>
				</Box>
				<Typography variant="h6" color="primary" sx={{ mt: 2 }}>
					{product.price} ₽
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddToCart}
						fullWidth
					>
						В корзину
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => navigate(ROUTES.PRODUCT(productId))}
						fullWidth
					>
						Отзывы
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ProductCard;