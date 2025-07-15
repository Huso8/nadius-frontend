import React from 'react';
import { Typography, Box, Paper, Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { Order, OrderItem } from '../types/types';
import { formatDate } from '../utils/dateUtils';
import OrderStatusChip from './common/OrderStatusChip';

interface OrderDetailsProps {
	order: Order;
	showTitle?: boolean;
	showStatus?: boolean;
	showReturnButton?: boolean;
	returnButtonProps?: any;
	title?: React.ReactNode;
	children?: React.ReactNode;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
	order,
	showTitle = true,
	showStatus = true,
	showReturnButton = false,
	returnButtonProps,
	title,
	children,
}) => {
	const { _id, totalAmount, status, deliveryAddress, contactInfo, products, createdAt } = order;

	return (
		<Paper elevation={3} sx={{ p: 3, width: '100%' }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				{showTitle && (
					<Typography variant="h6">
						{title || `Детали заказа #${_id.slice(-6)}`}
					</Typography>
				)}
				{showStatus && <OrderStatusChip status={status} />}
			</Box>
			<Divider sx={{ my: 2 }} />
			<Grid container rowSpacing={1} columnSpacing={3}>
				<Grid item xs={12} md={6}>
					<Typography><b>Сумма:</b> {totalAmount} ₽</Typography>
					<Typography><b>Дата:</b> {formatDate(createdAt)}</Typography>
					<Typography><b>Адрес:</b> {deliveryAddress.address}</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography><b>Имя:</b> {contactInfo.name}</Typography>
					<Typography><b>Email:</b> {contactInfo.email}</Typography>
					<Typography><b>Телефон:</b> {contactInfo.phone}</Typography>
				</Grid>
			</Grid>
			<Divider sx={{ my: 3 }} />
			<Typography variant="h6" gutterBottom>Состав заказа</Typography>
			<List>
				{products.map((item: OrderItem) => (
					<ListItem key={item.product._id}>
						<ListItemAvatar>
							<Avatar src={item.product.image} variant="rounded" sx={{ width: 56, height: 56, mr: 2 }} />
						</ListItemAvatar>
						<ListItemText
							primary={item.product.name}
							secondary={`${item.quantity} шт. x ${item.price} ₽`}
						/>
						<Typography variant="body1">
							<b>{item.quantity * item.price} ₽</b>
						</Typography>
					</ListItem>
				))}
			</List>
			{children}
			{showReturnButton && (
				<Box sx={{ mt: 4, textAlign: 'center' }}>
					<Button {...returnButtonProps}>
						Вернуться в меню
					</Button>
				</Box>
			)}
		</Paper>
	);
};

export default OrderDetails; 