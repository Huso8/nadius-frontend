import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/common/ProductCard';
import { useProducts } from '../services/api';
import { Product } from '../types/types';

const Menu: React.FC = () => {
	const { data: products = [], isLoading, error } = useProducts();

	if (isLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Typography>Загрузка...</Typography>
				</Box>
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Typography color="error">Ошибка при загрузке меню</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Наше меню
			</Typography>
			<Grid container spacing={4}>
				{products
					.filter((product: Product) => product._id)
					.map((product: Product) => (
						<Grid item key={product._id} xs={12} sm={6} md={4}>
							<ProductCard product={product} />
						</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default Menu; 