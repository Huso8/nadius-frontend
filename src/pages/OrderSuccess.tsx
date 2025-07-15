import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useOrder } from '../services/api/orders';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types/types';
import OrderDetails from '../components/OrderDetails';

const OrderSuccess: React.FC = () => {
	const location = useLocation();
	const orderId = location.state?.orderId;
	const { user } = useAuth();

	const { data: order, isLoading, isError } = useOrder(orderId);

	useEffect(() => {
		// Сохраняем заказ в localStorage только для неавторизованных пользователей
		if (orderId && !user && order) {
			const guestOrders = JSON.parse(localStorage.getItem('guestOrders') || '[]');
			const alreadyExists = guestOrders.some((o: any) => o.id === orderId);
			if (!alreadyExists) {
				guestOrders.push({ id: orderId, contactInfo: order.contactInfo });
				localStorage.setItem('guestOrders', JSON.stringify(guestOrders));
			}
		}
	}, [orderId, user, order]);

	if (!orderId) {
		return (
			<Container maxWidth="sm">
				<Alert severity="warning" sx={{ mt: 4 }}>
					Информация о заказе не найдена. Возможно, вы перешли на эту страницу по прямой ссылке.
				</Alert>
			</Container>
		);
	}

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError || !order) {
		return (
			<Container maxWidth="sm">
				<Alert severity="error" sx={{ mt: 4 }}>
					Не удалось загрузить информацию о вашем заказе. Пожалуйста, проверьте почту или свяжитесь с нами.
				</Alert>
			</Container>
		);
	}

	const { _id } = order as Order;

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<Typography variant="h4" component="h1" color="primary" gutterBottom>
					Спасибо за ваш заказ!
				</Typography>
				<Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
					Заказ #{_id.slice(-6)}
				</Typography>
			</Box>

			<OrderDetails
				order={order as Order}
				showTitle={false}
				showStatus={false}
				showReturnButton={true}
				returnButtonProps={{
					as: RouterLink,
					to: '/menu',
					variant: 'contained',
				}}
			/>
		</Container>
	);
};

export default OrderSuccess; 