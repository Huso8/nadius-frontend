import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
	const { items, total } = useCart();
	const navigate = useNavigate();

	if (items.length === 0) {
		return (
			<Container maxWidth="md" sx={{ py: 8 }}>
				<Typography variant="h5" align="center" gutterBottom>
					Ваша корзина пуста
				</Typography>
				<Box sx={{ mt: 4, textAlign: 'center' }}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => navigate('/menu')}
					>
						Перейти в меню
					</Button>
				</Box>
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Корзина
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12}>
					{items.map((item) => (
						<CartItem key={item.product._id} item={item} />
					))}
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ mt: 4, textAlign: 'right' }}>
						<Typography variant="h5" gutterBottom>
							Итого: {total} ₽
						</Typography>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => navigate('/checkout')}
							sx={{ mt: 2 }}
						>
							Оформить заказ
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Cart; 