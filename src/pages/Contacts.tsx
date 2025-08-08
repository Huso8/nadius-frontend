import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, TextField, Button, Divider, Fade, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

declare global {
	interface Window {
		ymaps: any;
	}
}

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
	const [isMapLoaded, setIsMapLoaded] = useState(false);

	useEffect(() => {
		// Загружаем API Яндекс Карт
		const script = document.createElement('script');
		script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
		script.async = true;
		script.onload = () => {
			window.ymaps.ready(() => {
				setIsMapLoaded(true);
			});
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (isMapLoaded) {
			const map = new window.ymaps.Map('map', {
				center: [55.581826, 37.680311], // Москва
				zoom: 15,
				controls: ['zoomControl', 'fullscreenControl']
			});

			const placemark = new window.ymaps.Placemark([55.581826, 37.680311], {
				balloonContent: 'Кондитерская "Надиус"'
			}, {
				preset: 'islands#redDotIcon'
			});

			map.geoObjects.add(placemark);
		}
	}, [isMapLoaded]);

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
				<Fade in timeout={800}>
					<Typography
						variant="h3"
						align="center"
						gutterBottom
						sx={{ mb: 6 }}
					>
						Контакты
					</Typography>
				</Fade>

				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Grow in timeout={800}>
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
												г. Москва, Остафьево<br />
												ул. Любучанская 2к1
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
												+7 (910) 450-00-10<br />
												+7 (903) 188-88-23
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
												unavoyan96@mail.ru<br />
												info@nadius.ru
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
									<div id="map" style={{ width: '100%', height: '100%' }}></div>
								</Box>
							</StyledPaper>
						</Grow>
					</Grid>

					<Grid item xs={12} md={6}>
						<Grow in timeout={800}>
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
						</Grow>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Contacts; 