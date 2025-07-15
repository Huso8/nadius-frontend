import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, List, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useOrder } from '../services/api/orders';
import OrderDetails from '../components/OrderDetails';
import { ROUTES } from '../constants/navigation';

const TrackOrderPage: React.FC = () => {
	const [guestOrderIds, setGuestOrderIds] = useState<any[]>([]);

	useEffect(() => {
		const storedGuestOrders = JSON.parse(localStorage.getItem('guestOrders') || '[]');
		setGuestOrderIds(storedGuestOrders);
	}, []);

	const Order: React.FC<{ orderId: string }> = ({ orderId }) => {
		const { data: order, isLoading, isError } = useOrder(orderId);

		if (isLoading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
		if (isError) return <Alert severity="warning">Не удалось загрузить данные по заказу #{orderId.slice(-6)}.</Alert>;
		if (!order) return null;

		return <OrderDetails order={order} />;
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Ваши заказы
			</Typography>

			<Paper sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
				<Typography paragraph>
					Здесь отображаются заказы, которые вы оформили как гость в этом браузере. Эта информация хранится локально и будет доступна при последующих визитах.
				</Typography>
				<Typography>
					Для постоянного доступа к истории заказов со всех устройств, а также для получения персональных скидок и предложений, мы рекомендуем{' '}
					<Button component={RouterLink} to={ROUTES.REGISTER} variant="contained" size="small">
						зарегистрироваться
					</Button>
					.
				</Typography>
			</Paper>

			{guestOrderIds.length > 0 ? (
				<Box>
					<List>
						{guestOrderIds.map(obj => (
							<React.Fragment key={obj.id}>
								<Order orderId={obj.id} />
								<Divider sx={{ my: 2 }} />
							</React.Fragment>
						))}
					</List>
				</Box>
			) : (
				<Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
					У вас пока нет заказов.
				</Typography>
			)}
		</Container>
	);
};

export default TrackOrderPage; 