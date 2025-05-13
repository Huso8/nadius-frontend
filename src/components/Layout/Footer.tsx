import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				mt: 'auto',
				backgroundColor: '#8b6d5c',
				color: 'white',
			}}
		>
			<Container maxWidth="sm">
				<Typography variant="body1" align="center">
					© 2025 Nadius — функция вкуса
				</Typography>
				<Typography variant="body2" align="center" sx={{ mt: 1 }}>
					<Link
						component={RouterLink}
						to="/contact"
						color="inherit"
						sx={{ mx: 1 }}
					>
						Контакты
					</Link>
					{' · '}
					<Link
						href="#"
						color="inherit"
						sx={{ mx: 1 }}
					>
						QR-код
					</Link>
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer; 