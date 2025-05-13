import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

const recipes = [
	{
		id: '1',
		title: 'Классический чизкейк',
		image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600',
		description: 'Нежный чизкейк с хрустящей основой и сливочной начинкой. Пошаговый рецепт для идеального десерта дома.',
		ingredients: [
			'Песочное печенье — 200 г',
			'Сливочное масло — 100 г',
			'Творожный сыр — 400 г',
			'Сахар — 120 г',
			'Яйца — 2 шт.',
			'Ванильный экстракт — 1 ч.л.',
			'Сметана — 150 г'
		],
		steps: [
			'Измельчить печенье, смешать с растопленным маслом, выложить в форму и утрамбовать.',
			'Взбить творожный сыр с сахаром, добавить яйца, ваниль, сметану.',
			'Выложить массу на основу, выпекать при 160°C 50-60 минут.',
			'Остудить и убрать в холодильник минимум на 4 часа.'
		],
		tips: 'Для идеальной текстуры используйте сыр комнатной температуры.'
	},
	// ...другие рецепты (можно расширить по аналогии)
];

const RecipeDetails: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const recipe = recipes.find(r => r.id === id);

	if (!recipe) {
		return (
			<Container maxWidth="sm" sx={{ py: 8 }}>
				<Typography variant="h5" align="center">Рецепт не найден</Typography>
				<Button onClick={() => navigate('/recipes')} sx={{ mt: 2 }}>Назад к рецептам</Button>
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Button onClick={() => navigate('/recipes')} sx={{ mb: 2 }}>&larr; Назад к рецептам</Button>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<img src={recipe.image} alt={recipe.title} style={{ maxWidth: 400, width: '100%', borderRadius: 24, marginBottom: 24 }} />
				<Typography variant="h4" gutterBottom align="center">{recipe.title}</Typography>
				<Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>{recipe.description}</Typography>
				<Typography variant="h6" sx={{ mt: 2 }}>Ингредиенты:</Typography>
				<List>
					{recipe.ingredients.map((ing, i) => (
						<ListItem key={i}>
							<ListItemText primary={ing} />
						</ListItem>
					))}
				</List>
				<Typography variant="h6" sx={{ mt: 2 }}>Пошаговое приготовление:</Typography>
				<List>
					{recipe.steps.map((step, i) => (
						<ListItem key={i}>
							<ListItemText primary={`${i + 1}. ${step}`} />
						</ListItem>
					))}
				</List>
				{recipe.tips && (
					<Box sx={{ mt: 3, p: 2, background: '#f5e6d3', borderRadius: 2 }}>
						<Typography variant="subtitle1"><b>Совет:</b> {recipe.tips}</Typography>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default RecipeDetails; 