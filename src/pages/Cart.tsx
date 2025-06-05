import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
	const navigate = useNavigate();
	const { items, total, removeFromCart, updateQuantity } = useCart();

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
				<List>
					{items.map((item) => (
						<React.Fragment key={item.product._id}>
							<ListItem>
								<ListItemText
									primary={item.product.name}
									secondary={`${item.product.price} ₽ x ${item.quantity}`}
								/>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<IconButton
										size="small"
										onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
										disabled={item.quantity <= 1}
									>
										<RemoveIcon />
									</IconButton>
									<Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
									<IconButton
										size="small"
										onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
									>
										<AddIcon />
									</IconButton>
									<IconButton
										edge="end"
										onClick={() => removeFromCart(item.product._id)}
										sx={{ ml: 2 }}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							</ListItem>
							<Divider />
						</React.Fragment>
					))}
				</List>
				<Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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