import React, { useEffect } from 'react';
import { Container, Paper, Typography, Button, TextField, Grid, CircularProgress } from '@mui/material';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useCheckoutForm, OrderFormData } from './useCheckoutForm';
import { useOrderSubmission } from './useOrderSubmission';
import AddressAutocomplete from './AddressAutocomplete';
import OrderSummary from './OrderSummary';
import ErrorAlert from './ErrorAlert';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
	const { items, total, clearCart } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	const initialFormData: OrderFormData = {
		name: user?.name || '',
		email: user?.email || '',
		phone: user?.phone || '',
		address: '',
		comment: ''
	};

	const {
		formData,
		setFormData,
		errors,
		handleChange,
		handleAddressInputChange,
		handleAddressSelect,
		addressSuggestions,
		selectedAddress,
		loading: addressLoading,
		error: addressError,
	} = useCheckoutForm(initialFormData);

	useEffect(() => {
		if (user) {
			setFormData(prev => ({
				...prev,
				name: user.name || '',
				email: user.email || '',
				phone: user.phone || '',
				address: ''
			}));
		}
	}, [user, setFormData]);

	const onOrderSuccess = (orderId: string) => {
		clearCart();
		navigate('/order-success', { state: { orderId } });
	};

	const {
		handleSubmit,
		loading: orderLoading,
		error: orderError
	} = useOrderSubmission(items, formData, selectedAddress, onOrderSuccess);

	if (items.length === 0) {
		return (
			<Container maxWidth="md" sx={{ py: 8 }}>
				<Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
					<Typography variant="h5" gutterBottom>
						Корзина пуста
					</Typography>
					<Button
						variant="contained"
						onClick={() => window.location.href = '/menu'}
						sx={{ mt: 2 }}
					>
						Перейти в меню
					</Button>
				</Paper>
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom align="center">
					Оформление заказа
				</Typography>
				<ErrorAlert error={orderError || addressError} />
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								label="Имя"
								name="name"
								value={formData.name}
								onChange={handleChange}
								fullWidth
								required
								error={!!errors.name}
								helperText={errors.name}
								sx={{ mb: 2 }}
							/>
							<TextField
								label="Email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								fullWidth
								required
								error={!!errors.email}
								helperText={errors.email}
								sx={{ mb: 2 }}
							/>
							<InputMask
								mask="+7 (999) 999-99-99"
								value={formData.phone}
								onChange={handleChange}
							>
								{(inputProps) => (
									<TextField
										{...inputProps}
										label="Телефон"
										name="phone"
										fullWidth
										required
										error={!!errors.phone}
										helperText={errors.phone}
										sx={{ mb: 2 }}
									/>
								)}
							</InputMask>
							<AddressAutocomplete
								formData={formData}
								addressSuggestions={addressSuggestions}
								selectedAddress={selectedAddress}
								handleAddressInputChange={handleAddressInputChange}
								handleAddressSelect={handleAddressSelect}
								loading={addressLoading}
								errors={errors}
							/>
							<TextField
								label="Комментарий к заказу"
								name="comment"
								value={formData.comment}
								onChange={handleChange}
								fullWidth
								multiline
								rows={3}
								sx={{ mt: 2 }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<OrderSummary items={items} total={total} />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								size="large"
								disabled={orderLoading || addressLoading}
							>
								{orderLoading ? <CircularProgress size={24} /> : 'Оформить заказ'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Checkout; 