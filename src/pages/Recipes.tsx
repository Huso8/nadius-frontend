import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

const StyledCard = styled(Card)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	background: 'rgba(255,255,255,0.95)',
	borderRadius: '16px',
	boxShadow: '0 3px 0 0 rgba(139,109,92,0.12)',
	border: '1.5px solid #f3e6de',
	overflow: 'hidden',
	transition: 'transform 0.3s, box-shadow 0.3s',
	'&:hover': {
		transform: 'translateY(-10px) scale(1.03)',
		boxShadow: '0 3px 0 0 rgba(139,109,92,0.18)',
		borderColor: '#e0cfc2',
	},
}));

const recipes = [
	{
		title: 'Классический шоколадный торт',
		description: 'Нежный шоколадный бисквит с насыщенным шоколадным кремом',
		image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
		time: '2 часа',
		difficulty: 'Средняя'
	},
	{
		title: 'Тирамису',
		description: 'Итальянский десерт с кофейным вкусом и нежным кремом',
		image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
		time: '1.5 часа',
		difficulty: 'Легкая'
	},
	{
		title: 'Красный бархат',
		description: 'Яркий бисквит с крем-чизом и нежным вкусом',
		image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
		time: '2.5 часа',
		difficulty: 'Сложная'
	},
	{
		title: 'Медовик',
		description: 'Классический торт с медовыми коржами и сметанным кремом',
		image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500',
		time: '3 часа',
		difficulty: 'Средняя'
	},
	{
		title: 'Чизкейк',
		description: 'Нежный десерт с творожно-сливочным кремом',
		image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
		time: '2 часа',
		difficulty: 'Средняя'
	},
	{
		title: 'Наполеон',
		description: 'Классический торт с хрустящими коржами и заварным кремом',
		image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500',
		time: '4 часа',
		difficulty: 'Сложная'
	}
];

const Recipes: React.FC = () => {
	return (
		<Box sx={{
			minHeight: '100vh',
			background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
			py: 8
		}}>
			<Container maxWidth="lg">
				<MotionTypography
					variant="h3"
					align="center"
					gutterBottom
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					sx={{ mb: 6 }}
				>
					Рецепты
				</MotionTypography>

				<Grid container spacing={4}>
					{recipes.map((recipe, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<MotionCard
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
							>
								<StyledCard>
									<CardMedia
										component="img"
										height="200"
										image={recipe.image}
										alt={recipe.title}
									/>
									<CardContent>
										<Typography variant="h5" component="h2" gutterBottom>
											{recipe.title}
										</Typography>
										<Typography variant="body2" color="text.secondary" paragraph>
											{recipe.description}
										</Typography>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
											<Typography variant="body2" color="text.secondary">
												Время: {recipe.time}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Сложность: {recipe.difficulty}
											</Typography>
										</Box>
										<Button
											variant="contained"
											fullWidth
											sx={{ mt: 2 }}
										>
											Подробнее
										</Button>
									</CardContent>
								</StyledCard>
							</MotionCard>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Recipes; 