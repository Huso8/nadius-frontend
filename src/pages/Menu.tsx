import React from 'react';
import { Container, Grid, Typography, Box, } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../services/api';
import { Product } from '../types/types';
import OptimizedImage from '../components/common/OptimizedImage';

const Menu: React.FC = () => {
	const { data: products = [], isLoading, error } = useProducts();
	if (isLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Box
						sx={{
							borderRadius: '48px',
							padding: '24px 48px',
							display: 'block',
							mb: 2,
							animation: 'pulse 1.8s ease-in-out infinite',
							'@keyframes pulse': {
								'0%': { transform: 'scale(1)' },
								'50%': { transform: 'scale(1.08)' },
								'100%': { transform: 'scale(1)' },
							},
							filter: 'drop-shadow(0 12px 48px rgba(139,109,92,0.22))',
							width: 'min(480px, 90vw)',
							maxWidth: '100%',
							height: 'auto',
						}}
					>
						<OptimizedImage
							src="/logo_nadius.png"
							alt="Nadius logo"
							style={{
								width: '100%',
								maxWidth: '100%',
								filter: 'drop-shadow(0 12px 48px rgba(139,109,92,0.22))',
								background: 'rgba(255,255,255,0.95)',
								borderRadius: '48px',
								padding: '24px 48px',
								display: 'block',
							}}
						/>
					</Box>
					<Typography sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 1 }}>Загрузка меню...</Typography>
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