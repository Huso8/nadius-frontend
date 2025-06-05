import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { useProducts } from '../../services/api';
import { useOrders } from '../../services/api';
import { getOrderStatusInRussian } from '../../constants/orderStatus';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
	const { data: products } = useProducts();
	const { data: orders = [] } = useOrders();
	const navigate = useNavigate();

	// Статистика
	const totalProducts = products?.length || 0;
	const totalOrders = orders?.length || 0;
	const totalRevenue = orders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;
	const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
	const processingOrders = orders?.filter(order => order.status === 'processing').length || 0;
	const completedOrders = orders?.filter(order => order.status === 'completed').length || 0;
	const cancelledOrders = orders?.filter(order => order.status === 'cancelled').length || 0;

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
				<Typography variant="h4">
					Дашборд
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('/menu')}
				>
					Перейти в меню
				</Button>
			</Box>
			<Grid container spacing={3}>
				{/* Статистика */}
				<Grid item xs={12} sm={6} md={3}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							background: 'linear-gradient(135deg, #8b6d5c 0%, #a3d6c4 100%)',
							color: 'white',
						}}
					>
						<Typography component="h2" variant="h6" gutterBottom>
							Всего товаров
						</Typography>
						<Typography component="p" variant="h4">
							{totalProducts}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							background: 'linear-gradient(135deg, #8b6d5c 0%, #a3d6c4 100%)',
							color: 'white',
						}}
					>
						<Typography component="h2" variant="h6" gutterBottom>
							Всего заказов
						</Typography>
						<Typography component="p" variant="h4">
							{totalOrders}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							background: 'linear-gradient(135deg, #8b6d5c 0%, #a3d6c4 100%)',
							color: 'white',
						}}
					>
						<Typography component="h2" variant="h6" gutterBottom>
							Общая выручка
						</Typography>
						<Typography component="p" variant="h4">
							{totalRevenue.toLocaleString('ru-RU')} ₽
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							background: 'linear-gradient(135deg, #8b6d5c 0%, #a3d6c4 100%)',
							color: 'white',
						}}
					>
						<Typography component="h2" variant="h6" gutterBottom>
							Ожидающие заказы
						</Typography>
						<Typography component="p" variant="h4">
							{pendingOrders}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper sx={{ p: 2, textAlign: 'center' }}>
						<Typography variant="h6" color="primary">
							{getOrderStatusInRussian('pending')}
						</Typography>
						<Typography variant="h4">{pendingOrders}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper sx={{ p: 2, textAlign: 'center' }}>
						<Typography variant="h6" color="primary">
							{getOrderStatusInRussian('processing')}
						</Typography>
						<Typography variant="h4">{processingOrders}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper sx={{ p: 2, textAlign: 'center' }}>
						<Typography variant="h6" color="primary">
							{getOrderStatusInRussian('completed')}
						</Typography>
						<Typography variant="h4">{completedOrders}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper sx={{ p: 2, textAlign: 'center' }}>
						<Typography variant="h6" color="primary">
							{getOrderStatusInRussian('cancelled')}
						</Typography>
						<Typography variant="h4">{cancelledOrders}</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard; 