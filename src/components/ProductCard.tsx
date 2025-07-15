import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types/types';
import { ROUTES } from '../constants/navigation';
import { COLORS, SPACING } from '../constants/theme';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart(product);
	};

	const productId = String(product._id);

	return (
		<Card sx={{
			maxWidth: 345,
			m: SPACING.CARD.MARGIN,
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: 200,
					overflow: 'hidden',
					borderRadius: '8px',
					mb: 1,
					'&:hover img': {
						transform: 'scale(1.05)'
					}
				}}
			>
				<CardMedia
					component="img"
					height="200"
					image={product.image}
					alt={product.name}
					onClick={() => navigate(ROUTES.PRODUCT(productId))}
					sx={{
						cursor: 'pointer',
						transition: 'transform 0.3s ease',
						objectFit: 'cover',
						width: '100%',
						height: '100%'
					}}
				/>
			</Box>
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
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
					<Typography variant="h6" color="primary">
						{product.price} ₽
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddToCart}
					>
						В корзину
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ProductCard;