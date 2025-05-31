import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, TextField, Grid, Alert, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCreateOrder } from '../services/api';
import { OrderItem } from '../types';

interface OrderFormData {
	name: string;
	phone: string;
	address: string;
	comment: string;
}

const Checkout: React.FC = () => {
	const navigate = useNavigate();
	const { items, total, clearCart } = useCart();
	const { isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<OrderFormData>({
		name: '',
		phone: '',
		address: '',
		comment: ''
	});
	const createOrderMutation = useCreateOrder();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		if (!isAuthenticated) {
			setError('Для оформления заказа необходимо войти в аккаунт');
			setLoading(false);
			return;
		}

		try {
			await createOrderMutation.mutateAsync({
				items: items.map(item => ({
					product: item.product._id,
					quantity: item.quantity,
					price: item.product.price
				})),
				totalAmount: total,
				...formData
			});
			clearCart();
			navigate('/profile');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка при оформлении заказа');
		} finally {
			setLoading(false);
		}
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
					Оформление заказа
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Имя"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Телефон"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Адрес доставки"
								name="address"
								value={formData.address}
								onChange={handleChange}
								required
								multiline
								rows={2}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Комментарий к заказу"
								name="comment"
								value={formData.comment}
								onChange={handleChange}
								multiline
								rows={3}
							/>
						</Grid>
					</Grid>
					<Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant="h6">
							Итого: {total} ₽
						</Typography>
						<Button
							type="submit"
							variant="contained"
							size="large"
							disabled={loading}
						>
							{loading ? <CircularProgress size={24} /> : 'Оформить заказ'}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Checkout; 