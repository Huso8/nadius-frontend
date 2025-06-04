import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import OptimizedImage from '../components/common/OptimizedImage';

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionCard = motion(Card);

const StyledFeatureCard = styled(Card)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'center',
	background: 'rgba(255,255,255,0.95)',
	borderRadius: '32px',
	boxShadow: '0 3px 0 0 rgba(139,109,92,0.12)',
	padding: theme.spacing(0, 0, 2, 0),
	border: '1.5px solid #f3e6de',
	overflow: 'hidden',
	transition: 'transform 0.3s, box-shadow 0.3s',
	'&:hover': {
		transform: 'translateY(-10px) scale(1.03)',
		boxShadow: '0 3px 0 0 rgba(139,109,92,0.18)',
		borderColor: '#e0cfc2',
	},
}));

const features = [
	{
		title: 'Свежая выпечка',
		description: 'Ежедневно свежая выпечка из натуральных ингредиентов',
		image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
	},
	{
		title: 'Авторские торты',
		description: 'Уникальные рецепты и индивидуальный подход к каждому заказу',
		image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
	},
	{
		title: 'Доставка',
		description: 'Быстрая доставка по всему городу',
		image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500',
	},
];

const LOGO_URL = '/logo_nadius.png';
const HERO_BG = 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=1920';

const Home: React.FC = () => {
	return (
		<Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)' }}>
			{/* Hero Section */}
			<Box
				sx={{
					background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${HERO_BG})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: { xs: '80vh', md: '90vh' },
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, position: 'relative', zIndex: 2 }}>
						<OptimizedImage
							src={LOGO_URL}
							alt="Nadius logo"
							style={{
								width: 'min(480px, 90vw)',
								maxWidth: '100%',
								marginBottom: 40,
								filter: 'drop-shadow(0 12px 48px rgba(139,109,92,0.22))',
								background: 'rgba(255,255,255,0.95)',
								borderRadius: '48px',
								padding: '24px 48px',
								display: 'block',
								position: 'relative',
								zIndex: 2,
							}}
						/>
					</Box>
					<MotionTypography
						variant="h2"
						color="white"
						gutterBottom
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						sx={{
							fontWeight: 700,
							textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
							textAlign: 'center',
						}}
					>
					</MotionTypography>
					<MotionTypography
						variant="h5"
						color="white"
						paragraph
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.3)', textAlign: 'center' }}
					>
					</MotionTypography>
					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
						<Button
							variant="contained"
							size="large"
							component={RouterLink}
							to="/menu"
							sx={{
								background: 'linear-gradient(to right, #8b6d5c, #a3d6c4)',
								'&:hover': {
									background: 'linear-gradient(to right, #7a5c4b, #92c5b3)',
								},
								px: 4,
								py: 1.5,
							}}
						>
							Смотреть меню
						</Button>
					</Box>
				</Container>
			</Box>

			{/* Features Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<MotionTypography
					variant="h3"
					align="center"
					gutterBottom
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					sx={{ mb: 6 }}
				>
					Почему выбирают нас
				</MotionTypography>
				<Grid container spacing={4}>
					{features.map((feature, index) => (
						<Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
							<MotionCard
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', background: 'none', boxShadow: 'none' }}
							>
								<StyledFeatureCard>
									<OptimizedImage
										src={feature.image}
										alt={feature.title}
										style={{
											width: '100%',
											height: 180,
											objectFit: 'cover',
											borderRadius: '32px 32px 0 0',
											marginBottom: 0
										}}
									/>
									<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3 }}>
										<Typography variant="h5" component="h3" gutterBottom align="center" sx={{ fontWeight: 700 }}>
											{feature.title}
										</Typography>
										<Typography variant="body1" color="text.secondary" align="center">
											{feature.description}
										</Typography>
									</CardContent>
								</StyledFeatureCard>
							</MotionCard>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* CTA Section */}
			<Box
				sx={{
					background: 'linear-gradient(to right, #8b6d5c, #a3d6c4)',
					py: 8,
					color: 'white',
				}}
			>
				<Container maxWidth="md">
					<MotionTypography
						variant="h3"
						align="center"
						gutterBottom
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						Закажите свой идеальный десерт
					</MotionTypography>
					<MotionTypography
						variant="h6"
						align="center"
						paragraph
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						sx={{ mb: 4 }}
					>
						Мы создадим для вас уникальный десерт, который запомнится надолго
					</MotionTypography>
					<Box sx={{ textAlign: 'center' }}>
						<Box component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
							<Button
								variant="contained"
								size="large"
								component={RouterLink}
								to="/checkout"
								sx={{
									background: 'white',
									color: '#8b6d5c',
									'&:hover': {
										background: '#f5f5f5',
									},
									px: 4,
									py: 1.5,
								}}
							>
								Сделать заказ
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};

export default Home; 