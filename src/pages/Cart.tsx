import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart: React.FC = () => {
	const navigate = useNavigate();
	const { items, total } = useCart();

	const handleCheckout = () => {
		navigate('/checkout');
	};

	if (items.length === 0) {
		return (
			<Container maxWidth="md" sx={{ py: 8 }}>
				<Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
					<Typography variant="h5" gutterBottom>
						Корзина пуста
					</Typography>
					<Button
						variant="contained"
						onClick={() => navigate('/menu')}
						sx={{ mt: 2 }}
					>
						Перейти в меню
					</Button>
				</Paper>
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Корзина
				</Typography>
				<Box sx={{ mb: 4 }}>
					{items.map((item) => (
						<CartItem key={item.product._id} item={item} />
					))}
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h6">
						Итого: {total} ₽
					</Typography>
					<Button
						variant="contained"
						size="large"
						onClick={handleCheckout}
					>
						Оформить заказ
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default Cart; 