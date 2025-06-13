import React, { useState } from 'react';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip
} from '@mui/material';
import { useAdminOrders, useUpdateOrderStatus } from '../../services/api';
import { Order, OrderStatus, OrderItem } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface OrderStatusActionsProps {
	order: Order;
	onStatusChange: (order: Order, status: Order['status']) => void;
}

const OrderStatusActions: React.FC<OrderStatusActionsProps> = ({ order, onStatusChange }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const getStatusColor = (status: Order['status']) => {
		switch (status) {
			case 'completed':
				return 'success';
			case 'processing':
				return 'info';
			case 'cancelled':
				return 'error';
			default:
				return 'warning';
		}
	};

	const getStatusText = (status: Order['status']) => {
		switch (status) {
			case 'completed':
				return 'Завершен';
			case 'processing':
				return 'В обработке';
			case 'cancelled':
				return 'Отменен';
			default:
				return 'Ожидает';
		}
	};

	return (
		<Box>
			<Chip
				label={getStatusText(order.status)}
				color={getStatusColor(order.status)}
				size="small"
				onClick={() => setIsDialogOpen(true)}
				sx={{ cursor: 'pointer' }}
				icon={<KeyboardArrowDownIcon />}
			/>

			<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
				<DialogTitle>Изменить статус заказа</DialogTitle>
				<DialogContent>
					<FormControl fullWidth sx={{ mt: 2 }}>
						<InputLabel>Статус</InputLabel>
						<Select
							value={order.status}
							label="Статус"
							onChange={(e) => {
								onStatusChange(order, e.target.value as Order['status']);
								setIsDialogOpen(false);
							}}
						>
							<MenuItem value="pending">Ожидает</MenuItem>
							<MenuItem value="processing">В обработке</MenuItem>
							<MenuItem value="completed">Завершен</MenuItem>
							<MenuItem value="cancelled">Отменен</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsDialogOpen(false)}>Отмена</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

const Orders: React.FC = () => {
	const { data: orders, isLoading, error } = useAdminOrders();
	const updateOrderStatus = useUpdateOrderStatus();

	const handleStatusChange = async (order: Order, status: Order['status']) => {
		try {
			await updateOrderStatus.mutateAsync({
				id: order._id,
				status,
			});
		} catch (error) {
			console.error('Error updating order status:', error);
		}
	};

	if (isLoading) {
		return <Typography>Загрузка...</Typography>;
	}

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Управление заказами
			</Typography>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Дата</TableCell>
							<TableCell>Покупатель</TableCell>
							<TableCell>Адрес</TableCell>
							<TableCell>Статус и действия</TableCell>
							<TableCell>Сумма</TableCell>
							<TableCell>Товары</TableCell>
							<TableCell>Комментарий</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders?.sort((a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						).map((order) => (
							<TableRow key={order._id}>
								<TableCell>#{order._id.slice(-6)}</TableCell>
								<TableCell>
									{formatDate(order.createdAt)}
								</TableCell>
								<TableCell>
									<Box>
										<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
											{order.contactInfo?.name || 'Не указано'}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{order.contactInfo?.email || 'Не указано'}
										</Typography>
									</Box>
								</TableCell>
								<TableCell>
									<Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										{order.deliveryAddress?.address || 'Не указан'}
									</Typography>
								</TableCell>
								<TableCell>
									<OrderStatusActions order={order} onStatusChange={handleStatusChange} />
								</TableCell>
								<TableCell>
									<Typography
										variant="body1"
										sx={{
											fontWeight: 'bold',
											color: 'primary.main'
										}}
									>
										{(order.totalAmount || 0).toLocaleString('ru-RU')} ₽
									</Typography>
								</TableCell>
								<TableCell>
									{order.products.map((item) => (
										<Box key={`${order._id}-${item._id}`} sx={{ mb: 0.5 }}>
											{item.product?.name || 'Товар недоступен'} x {item.quantity}
										</Box>
									))}
								</TableCell>
								<TableCell>
									{order.comment ? (
										<Typography
											variant="body2"
											sx={{
												maxWidth: 200,
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												color: 'text.secondary'
											}}
										>
											{order.comment}
										</Typography>
									) : (
										<Typography variant="body2" color="text.secondary">
											Нет комментария
										</Typography>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Orders; 