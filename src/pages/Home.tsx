import React from 'react';
import { Container, Typography, Box, Button, Grid, Card } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import OptimizedImage from '../components/common/OptimizedImage';

const MotionTypography = motion.create(Typography);
const MotionCard = motion.create(Card);

const StyledFeatureCard = styled(Card)(({ theme }) => ({
	height: '500px',
	display: 'flex',
	flexDirection: 'column',
	background: 'rgba(255,255,255,0.95)',
	borderRadius: '32px',
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

const ImageContainer = styled(Box)({
	width: '100%',
	height: '250px',
	position: 'relative',
	overflow: 'hidden',
	borderRadius: '32px 32px 0 0',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const CardContentWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '250px',
	padding: '32px',
	gap: '16px',
});

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
		title: 'Скидки',
		description: 'Для любимых постоянных клиентов, в честь дня рождения, и других праздников',
		image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500',
	},
];

const LOGO_URL = '/logo_nadius.png';
const HERO_BG = 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=1920';
const DESSERT_BG = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=1920';
// const DESSERT_BG = 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1920';

const Home: React.FC = () => {
	return (
		<Box sx={{ minHeight: '100vh', background: 'white' }}>
			{/* Hero Section */}
			<Box
				sx={{
					background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${HERO_BG})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					overflow: 'hidden',
					pt: '70px'
				}}
			>
				<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, gap: 4 }}>
						<OptimizedImage
							src={LOGO_URL}
							alt="Nadius logo"
							style={{
								width: 'min(480px, 90vw)',
								maxWidth: '100%',
								filter: 'drop-shadow(0 12px 48px rgba(139,109,92,0.22))',
								background: 'rgba(255,255,255,0.95)',
								borderRadius: '48px',
								padding: '24px 48px',
								display: 'block',
							}}
						/>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
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
						</motion.div>
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
									<ImageContainer>
										<OptimizedImage
											src={feature.image}
											alt={feature.title}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												objectPosition: 'center center',
											}}
										/>
									</ImageContainer>
									<CardContentWrapper>
										<Typography
											variant="h5"
											component="h3"
											sx={{
												fontWeight: 700,
												textAlign: 'center',
												width: '100%',
												mb: 1
											}}
										>
											{feature.title}
										</Typography>
										<Typography
											variant="body1"
											color="text.secondary"
											sx={{
												textAlign: 'center',
												width: '100%',
												lineHeight: 1.6,
												height: '48px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											{feature.description}
										</Typography>
									</CardContentWrapper>
								</StyledFeatureCard>
							</MotionCard>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* CTA Section */}
			<Box
				sx={{
					position: 'relative',
					height: { xs: '60vh', md: '80vh' },
					width: '100%',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${DESSERT_BG})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundAttachment: 'fixed',
					}}
				/>
				<Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							color: 'white',
							py: 8,
						}}
					>
						<MotionTypography
							variant="h2"
							align="center"
							gutterBottom
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							sx={{
								fontWeight: 700,
								mb: 3,
								textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
							}}
						>
							Закажите свой идеальный десерт
						</MotionTypography>
						<MotionTypography
							variant="h5"
							align="center"
							paragraph
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
							sx={{
								mb: 4,
								maxWidth: '800px',
								textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
							}}
						>
							Создайте незабываемый вкус праздника с нашими авторскими десертами
						</MotionTypography>
						<Box
							component={motion.div}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<Button
								variant="contained"
								size="large"
								component={RouterLink}
								to="/menu"
								sx={{
									background: 'rgba(255, 255, 255, 0.9)',
									color: '#8b6d5c',
									'&:hover': {
										background: 'rgba(255, 255, 255, 1)',
									},
									px: 4,
									py: 1.5,
									fontWeight: 600,
								}}
							>
								Перейти в меню
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};

export default Home; 