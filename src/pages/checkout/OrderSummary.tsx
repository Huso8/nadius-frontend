import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CartItem } from '../../types/types';
import OptimizedImage from '../../components/common/OptimizedImage';
import { API_URL } from '../../services/api/config';

interface OrderSummaryProps {
	items: CartItem[];
	total: number;
}

const getImageSrc = (image: string | undefined) => {
	if (!image) return '/icon.jpg';
	if (image.startsWith('http') || image.startsWith('/')) return image;
	return `${API_URL}/uploads/products/${image}`;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => (
	<Box sx={{ mb: 4 }}>
		<Typography variant="h6" gutterBottom>
			Ваш заказ
		</Typography>
		<List>
			{items.map((item) => (
				<React.Fragment key={item.product._id}>
					<ListItem>
						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<OptimizedImage
								src={getImageSrc(item.product.image)}
								alt={item.product.name}
								width={72}
								height={77}
								style={{ marginRight: 3, borderRadius: 6, flexShrink: 0 }}
							/>
							<Box sx={{ flexGrow: 1 }}>
								<ListItemText
									primary={item.product.name}
									secondary={`${item.quantity} x ${item.product.price} ₽`}
								/>
							</Box>
							<Typography variant="body1">
								{item.quantity * item.product.price} ₽
							</Typography>
						</Box>
					</ListItem>
					<Divider component="li" />
				</React.Fragment>
			))}
		</List>
		<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
			<Typography variant="h6">Итого:</Typography>
			<Typography variant="h6" color="primary">{total} ₽</Typography>
		</Box>
	</Box>
);

export default OrderSummary; 