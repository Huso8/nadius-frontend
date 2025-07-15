import React from 'react';
import { Chip } from '@mui/material';
import { OrderStatus } from '../../types/types';
import { getOrderStatusInRussian } from '../../constants/orderStatus';

interface OrderStatusChipProps {
	status: OrderStatus;
}

const getStatusColor = (status: OrderStatus) => {
	switch (status) {
		case 'pending':
			return 'warning';
		case 'processing':
			return 'info';
		case 'on_the_way':
			return 'primary';
		case 'completed':
			return 'success';
		case 'cancelled':
			return 'error';
		default:
			return 'default';
	}
};

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }) => {
	return (
		<Chip
			label={getOrderStatusInRussian(status)}
			color={getStatusColor(status)}
			size="small"
			sx={{ fontWeight: 'medium' }}
		/>
	);
};

export default OrderStatusChip; 