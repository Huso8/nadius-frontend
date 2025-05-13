import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { getMyOrders } from '../services/api';

const Profile: React.FC = () => {
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const data = await getMyOrders();
				setOrders(data);
			} catch (err: any) {
				if (err.response && err.response.status === 401) {
					setError('Для просмотра истории заказов необходимо войти в аккаунт.');
				} else {
					setError('Ошибка при загрузке заказов.');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Личный кабинет
			</Typography>
			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant="h6" gutterBottom>
					История заказов
				</Typography>
				{loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}
				{error && <Alert severity="error">{error}</Alert>}
				{!loading && !error && orders.length === 0 && (
					<Typography color="text.secondary">У вас пока нет заказов.</Typography>
				)}
				{!loading && !error && orders.length > 0 && (
					<List>
						{orders.map(order => (
							<Box key={order._id}>
								<ListItem alignItems="flex-start">
									<ListItemText
										primary={`Заказ №${order._id.slice(-6).toUpperCase()} — ${new Date(order.createdAt).toLocaleString('ru-RU')}`}
										secondary={
											<Box>
												{order.items.map((item: any) => (
													<Box key={item.product?._id || item.product} sx={{ mb: 0.5 }}>
														{item.product?.name || 'Товар'} — {item.quantity} шт. × {item.price} ₽
													</Box>
												))}
												<Typography variant="body2" sx={{ mt: 1 }}>
													Итого: <b>{order.totalAmount} ₽</b>
												</Typography>
												<Typography variant="body2" color="text.secondary">
													Статус: {order.status}
												</Typography>
											</Box>
										}
									/>
								</ListItem>
								<Divider component="li" sx={{ my: 1 }} />
							</Box>
						))}
					</List>
				)}
			</Paper>
		</Container>
	);
};

export default Profile; 