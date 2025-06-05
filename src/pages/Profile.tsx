import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import { useOrders, useCancelOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrderStatusInRussian } from '../constants/orderStatus';
import { Order } from '../types';

type OrderStatusType = Order['status'];

const OrderStatus: React.FC<{ status: OrderStatusType }> = ({ status }) => {
	const getStatusColor = (status: OrderStatusType) => {
		switch (status) {
			case 'pending':
				return 'warning';
			case 'processing':
				return 'info';
			case 'completed':
				return 'success';
			case 'cancelled':
				return 'error';
			default:
				return 'default';
		}
	};

	return (
		<Chip
			label={getOrderStatusInRussian(status)}
			color={getStatusColor(status)}
			size="small"
			sx={{ fontWeight: 'medium' }}
		/>
	);
};

const OrderItem: React.FC<{ order: Order; onCancel: (orderId: string) => void }> = ({ order, onCancel }) => (
	<Paper sx={{ p: 2, mb: 2 }}>
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
			<Box>
				<Typography variant="h6">
					Заказ #{order._id.slice(-6)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Дата: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
					Адрес: {order.deliveryAddress?.address || 'Не указан'}
				</Typography>
				{order.comment && (
					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
						Комментарий: {order.comment}
					</Typography>
				)}
			</Box>
			<Typography variant="h6" color="primary">
				{order.totalAmount} ₽
			</Typography>
		</Box>
		<Divider sx={{ mb: 2 }} />
		<Box>
			{order.items.map((item: any) => (
				<Box key={`${order._id}-${item._id}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
					<Box>
						<Typography variant="body1">
							{item.product?.name || 'Товар недоступен'}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Количество: {item.quantity}
						</Typography>
					</Box>
					<Typography variant="body2">
						{item.price} ₽
					</Typography>
				</Box>
			))}
		</Box>
		<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<OrderStatus status={order.status} />
			{order.status === 'pending' && (
				<Button
					variant="outlined"
					color="error"
					size="small"
					onClick={() => onCancel(order._id)}
				>
					Отменить заказ
				</Button>
			)}
		</Box>
	</Paper>
);

const OrdersList: React.FC<{ orders: any[]; onCancel: (orderId: string) => void }> = ({ orders, onCancel }) => {
	if (orders.length === 0) {
		return <Typography>У вас пока нет заказов</Typography>;
	}

	// Сортируем заказы по дате создания в обратном порядке
	const sortedOrders = [...orders].sort((a, b) =>
		new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	return (
		<Box>
			{sortedOrders.map((order) => (
				<OrderItem key={order._id} order={order} onCancel={onCancel} />
			))}
		</Box>
	);
};

const Profile: React.FC = () => {
	const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useOrders();
	const { user, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();
	const cancelOrder = useCancelOrder();
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

	useEffect(() => {
		if (!authLoading && !user) {
			navigate('/login');
		}
	}, [user, authLoading, navigate]);

	const handleCancelClick = (orderId: string) => {
		setSelectedOrderId(orderId);
		setCancelDialogOpen(true);
	};

	const handleCancelConfirm = async () => {
		if (selectedOrderId) {
			try {
				await cancelOrder.mutateAsync(selectedOrderId);
				setCancelDialogOpen(false);
				setSelectedOrderId(null);
			} catch (error) {
				console.error('Error cancelling order:', error);
			}
		}
	};

	if (authLoading || ordersLoading) {
		return (
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<Container sx={{ py: 4 }}>
			<Box sx={{ mb: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Профиль
				</Typography>
				<Paper sx={{ p: 3, mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						Информация о пользователе
					</Typography>
					<Typography>Имя: {user.name}</Typography>
					<Typography>Email: {user.email}</Typography>
					{user.role === 'admin' && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate('/admin')}
							sx={{ mt: 2 }}
						>
							Перейти в админ-панель
						</Button>
					)}
				</Paper>
			</Box>

			<Typography variant="h5" gutterBottom>
				Мои заказы
			</Typography>
			{ordersError ? (
				<Alert severity="error" sx={{ mb: 2 }}>Ошибка при загрузке заказов</Alert>
			) : (
				<OrdersList orders={orders} onCancel={handleCancelClick} />
			)}

			<Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
				<DialogTitle>Подтверждение отмены заказа</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите отменить этот заказ? Это действие нельзя отменить.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setCancelDialogOpen(false)}>Отмена</Button>
					<Button onClick={handleCancelConfirm} color="error" variant="contained">
						Отменить заказ
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Profile; 