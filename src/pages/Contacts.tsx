import React from 'react';
import { Container, Typography, Box, Grid, Paper, TextField, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: '16px',
	background: 'rgba(255,255,255,0.95)',
	boxShadow: '0 3px 0 0 rgba(139,109,92,0.12)',
	border: '1.5px solid #f3e6de',
}));

const ContactInfo = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	marginBottom: theme.spacing(2),
	'& svg': {
		marginRight: theme.spacing(2),
		color: '#8b6d5c',
	},
}));

const Contacts: React.FC = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Здесь будет логика отправки формы
	};

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
					Контакты
				</MotionTypography>

				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<MotionPaper
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<StyledPaper>
								<Typography variant="h5" gutterBottom>
									Наши контакты
								</Typography>
								<Box sx={{ mt: 3 }}>
									<ContactInfo>
										<LocationOnIcon />
										<Box>
											<Typography variant="subtitle1" fontWeight="bold">
												Адрес
											</Typography>
											<Typography variant="body1">
												ул. Кондитерская, 1<br />
												г. Москва, 123456
											</Typography>
										</Box>
									</ContactInfo>
									<ContactInfo>
										<PhoneIcon />
										<Box>
											<Typography variant="subtitle1" fontWeight="bold">
												Телефон
											</Typography>
											<Typography variant="body1">
												+7 (999) 123-45-67<br />
												+7 (999) 765-43-21
											</Typography>
										</Box>
									</ContactInfo>
									<ContactInfo>
										<EmailIcon />
										<Box>
											<Typography variant="subtitle1" fontWeight="bold">
												Email
											</Typography>
											<Typography variant="body1">
												info@nadius.ru<br />
												orders@nadius.ru
											</Typography>
										</Box>
									</ContactInfo>
									<ContactInfo>
										<AccessTimeIcon />
										<Box>
											<Typography variant="subtitle1" fontWeight="bold">
												Время работы
											</Typography>
											<Typography variant="body1">
												Пн-Пт: 9:00 - 20:00<br />
												Сб-Вс: 10:00 - 19:00
											</Typography>
										</Box>
									</ContactInfo>
								</Box>
								<Divider sx={{ my: 3 }} />
								<Typography variant="h6" gutterBottom>
									Как нас найти
								</Typography>
								<Box sx={{ mt: 2, height: 300, borderRadius: '8px', overflow: 'hidden' }}>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.430481195993!2d37.61842331590136!3d55.75576898055754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1647881234567!5m2!1sru!2sru"
										width="100%"
										height="100%"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
									/>
								</Box>
							</StyledPaper>
						</MotionPaper>
					</Grid>

					<Grid item xs={12} md={6}>
						<MotionPaper
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<StyledPaper>
								<Typography variant="h5" gutterBottom>
									Напишите нам
								</Typography>
								<Typography variant="body2" color="text.secondary" paragraph>
									Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
								</Typography>
								<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
									<TextField
										fullWidth
										label="Ваше имя"
										margin="normal"
										required
									/>
									<TextField
										fullWidth
										label="Email"
										type="email"
										margin="normal"
										required
									/>
									<TextField
										fullWidth
										label="Телефон"
										type="tel"
										margin="normal"
										required
									/>
									<TextField
										fullWidth
										label="Сообщение"
										multiline
										rows={4}
										margin="normal"
										required
									/>
									<Button
										type="submit"
										variant="contained"
										size="large"
										fullWidth
										sx={{
											mt: 3,
											background: 'linear-gradient(to right, #8b6d5c, #a3d6c4)',
											'&:hover': {
												background: 'linear-gradient(to right, #7a5c4b, #92c5b3)',
											},
										}}
									>
										Отправить
									</Button>
								</Box>
							</StyledPaper>
						</MotionPaper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Contacts; 