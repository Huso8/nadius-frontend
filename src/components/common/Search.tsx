import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useProducts } from '../../services/api';
import ProductCard from '../ProductCard';

const Search: React.FC = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q') || '';
	const { data: products = [], isLoading } = useProducts();

	// Используем useMemo для фильтрации продуктов
	const filteredProducts = useMemo(() => {
		if (!query) return products;

		return products.filter((product) =>
			product.name.toLowerCase().includes(query.toLowerCase()) ||
			product.description?.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, products]);

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" sx={{ mb: 3 }}>
				{query ? `Результаты поиска: "${query}"` : 'Все товары'}
			</Typography>

			{filteredProducts.length > 0 ? (
				<Grid container spacing={3}>
					{filteredProducts.map((product) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
					{query ? 'Ничего не найдено' : 'Введите поисковый запрос'}
				</Typography>
			)}
		</Box>
	);
};

export default Search; 