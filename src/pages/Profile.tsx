import React from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useOrders } from '../services/api';

const Profile: React.FC = () => {
	const { data: orders = [], isLoading, error } = useOrders();

	if (isLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<Alert severity="error">Ошибка при загрузке заказов</Alert>
				</Box>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Мои заказы
			</Typography>
			{orders.length === 0 ? (
				<Typography>У вас пока нет заказов</Typography>
			) : (
				<List>
					{orders.map((order) => (
						<Paper key={order._id} sx={{ mb: 2, p: 2 }}>
							<ListItem>
								<ListItemText
									primary={`Заказ #${order._id}`}
									secondary={`Дата: ${new Date(order.createdAt).toLocaleDateString('ru-RU')}`}
								/>
								<Typography variant="body1" color="primary">
									{order.totalAmount} ₽
								</Typography>
							</ListItem>
							<Divider />
							<List>
								{order.items.map((item: any) => (
									<ListItem key={item._id}>
										<ListItemText
											primary={item.product.name}
											secondary={`Количество: ${item.quantity}`}
										/>
										<Typography variant="body2">
											{item.price} ₽
										</Typography>
									</ListItem>
								))}
							</List>
							<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<Typography variant="body2" color="text.secondary">
									Статус: {order.status}
								</Typography>
								{order.status === 'pending' && (
									<Button variant="outlined" color="primary" size="small">
										Отменить заказ
									</Button>
								)}
							</Box>
						</Paper>
					))}
				</List>
			)}
		</Container>
	);
};

export default Profile; 