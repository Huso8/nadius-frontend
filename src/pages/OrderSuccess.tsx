import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const AnimatedLogo = styled(motion.img)({
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
});

const OrderSuccess: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Автоматический редирект на профиль через 3 секунды
		const timer = setTimeout(() => {
			navigate('/profile');
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<Container maxWidth="lg" sx={{
			minHeight: '100vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
		}}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				<AnimatedLogo
					src="/logo_nadius.png"
					alt="Nadius logo"
					initial={{ scale: 1 }}
					animate={{
						scale: [1, 1.1, 1],
						filter: [
							'drop-shadow(0 12px 48px rgba(139,109,92,0.22))',
							'drop-shadow(0 12px 48px rgba(76,175,80,0.3))',
							'drop-shadow(0 12px 48px rgba(139,109,92,0.22))'
						]
					}}
					transition={{
						duration: 2,
						ease: "easeInOut",
						times: [0, 0.5, 1]
					}}
				/>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<Typography
						variant="h4"
						sx={{
							color: '#4CAF50',
							fontWeight: 600,
							mb: 2
						}}
					>
						Заказ успешно оформлен!
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
					>
						Сейчас вы будете перенаправлены в профиль...
					</Typography>
				</motion.div>
			</Box>
		</Container>
	);
};

export default OrderSuccess; 