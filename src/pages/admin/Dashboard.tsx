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

	// Подсчет заказов по статусам
	const ordersByStatus = orders?.reduce((acc, order) => {
		acc[order.status] = (acc[order.status] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const pendingCount = ordersByStatus?.['pending'] || 0;
	const processingCount = ordersByStatus?.['processing'] || 0;
	const onTheWayCount = ordersByStatus?.['on_the_way'] || 0;
	const completedCount = ordersByStatus?.['completed'] || 0;
	const cancelledCount = ordersByStatus?.['cancelled'] || 0;

	const summaryStats = [
		{ title: 'Всего товаров', value: totalProducts },
		{ title: 'Всего заказов', value: totalOrders },
		{ title: 'Общая выручка', value: `${totalRevenue.toLocaleString('ru-RU')} ₽` },
		{ title: getOrderStatusInRussian('pending'), value: pendingCount },
	];

	const statusCards = [
		{ status: 'pending', count: pendingCount },
		{ status: 'processing', count: processingCount },
		{ status: 'on_the_way', count: onTheWayCount },
		{ status: 'completed', count: completedCount },
		{ status: 'cancelled', count: cancelledCount },
	];

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
				{/* Основная статистика */}
				{summaryStats.map((stat, index) => (
					<Grid item xs={12} sm={6} md={3} key={index}>
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
								{stat.title}
							</Typography>
							<Typography component="p" variant="h4">
								{stat.value}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>

			{/* Статистика по статусам заказов */}
			<Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
				Статусы заказов
			</Typography>
			<Grid container spacing={3}>
				{statusCards.map(card => (
					<Grid item xs={12} sm={6} md={2.4} key={card.status}>
						<Paper sx={{ p: 2, textAlign: 'center' }}>
							<Typography variant="h6" color="primary">
								{getOrderStatusInRussian(card.status as any)}
							</Typography>
							<Typography variant="h4">{card.count}</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Dashboard; 