import React from 'react';
import { Card, CardContent, Grid, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
	item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { updateQuantity, removeFromCart } = useCart();
	const { product, quantity } = item;

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={12} sm={3}>
						<img
							src={product.image}
							alt={product.name}
							style={{
								width: '100%',
								height: '100px',
								objectFit: 'cover',
								borderRadius: '4px'
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							{product.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{product.description}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<IconButton
								size="small"
								onClick={() => updateQuantity(product._id, quantity - 1)}
								disabled={quantity <= 1}
							>
								<RemoveIcon />
							</IconButton>
							<Typography sx={{ mx: 2 }}>{quantity}</Typography>
							<IconButton
								size="small"
								onClick={() => updateQuantity(product._id, quantity + 1)}
							>
								<AddIcon />
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
							<Typography variant="h6" color="primary">
								{product.price * quantity} ₽
							</Typography>
							<IconButton
								color="error"
								onClick={() => removeFromCart(product._id)}
								sx={{ mt: 1 }}
							>
								<DeleteIcon />
							</IconButton>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default CartItem; 