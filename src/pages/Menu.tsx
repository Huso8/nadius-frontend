import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Product } from '../types';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Menu: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const query = useQuery();
	const search = query.get('search') || '';
	const exact = query.get('exact') === '1';

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getProducts();
				setProducts(data);
			} catch (err) {
				setError('Ошибка при загрузке продуктов');
				console.error('Error fetching products:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];

	let filteredProducts = selectedCategory === 'all'
		? products
		: products.filter(product => product.category === selectedCategory);

	if (search) {
		filteredProducts = filteredProducts.filter(product =>
			exact
				? product.name.toLowerCase() === search.toLowerCase()
				: product.name.toLowerCase().includes(search.toLowerCase())
		);
	}

	const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
		setSelectedCategory(newValue);
	};

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 8 }}>
			<Typography variant="h3" component="h1" gutterBottom align="center">
				Наше Меню
			</Typography>

			<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
				<Tabs
					value={selectedCategory}
					onChange={handleCategoryChange}
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
				>
					{categories.map(category => (
						<Tab
							key={category}
							label={category.charAt(0).toUpperCase() + category.slice(1)}
							value={category}
						/>
					))}
				</Tabs>
			</Box>

			<Grid container spacing={4}>
				{filteredProducts.map((product) => (
					<Grid item key={product._id} xs={12} sm={6} md={4}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Menu; 