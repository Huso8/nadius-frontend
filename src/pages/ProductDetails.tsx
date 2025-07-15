import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext';
import { useProduct } from '../services/api';
import OptimizedImage from '../components/common/OptimizedImage';
import { ROUTES } from '../constants/navigation';

const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();
	const { data: product, isLoading: productLoading, error: productError } = useProduct(id || '');
	const navigate = useNavigate();

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
		}
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
			<Box sx={{ mb: 2 }}>
				<IconButton onClick={() => navigate(ROUTES.MENU)}>
					<ArrowBackIcon />
				</IconButton>
			</Box>
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
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProductDetails; 