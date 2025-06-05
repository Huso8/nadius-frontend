import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, TextField, Grid, Alert, CircularProgress, Autocomplete, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCreateOrder } from '../services/api';
import { OrderItem, CreateOrderData, Coordinates, CartItem } from '../types';
import { formatPhoneNumber } from '../utils/format';
import { debounce } from 'lodash';
import InputMask from 'react-input-mask';

const API_URL = process.env.REACT_APP_API_URL;

interface OrderFormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	comment: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
}

interface AddressSuggestion {
	label: string;
	description?: string;
	coordinates: {
		lat: string;
		lon: string;
	};
}

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

const YANDEX_API_KEY = '18f073a4-54af-4678-9260-bf48dd2a0d69';

const Checkout: React.FC = () => {
	const navigate = useNavigate();
	const { items, total, clearCart } = useCart();
	const { isAuthenticated, user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState<FormErrors>({});
	const [formData, setFormData] = useState<OrderFormData>({
		name: user?.name || '',
		email: user?.email || '',
		phone: user?.phone || '',
		address: user?.address || '',
		comment: ''
	});
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
	const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion | null>(null);
	const createOrderMutation = useCreateOrder();
	const formRef = useRef<HTMLFormElement>(null);
	const phoneInputRef = useRef<HTMLInputElement>(null);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (user) {
			setFormData(prev => ({
				...prev,
				name: user.name || '',
				email: user.email || '',
				phone: user.phone || '',
				address: user.address || ''
			}));
		}
	}, [user]);

	const fetchAddressSuggestions = async (query: string) => {
		if (query.length < 3) {
			setAddressSuggestions([]);
			return;
		}

		try {
			setLoading(true);
			const response = await fetch(`${API_URL}/address/suggest?query=${encodeURIComponent(query)}`);

			if (!response.ok) {
				throw new Error('Failed to fetch address suggestions');
			}

			const data = await response.json();

			if (data.results) {
				setAddressSuggestions(data.results.map((item: any) => ({
					label: item.title,
					description: item.subtitle,
					coordinates: {
						lat: item.lat.toString(),
						lon: item.lon.toString()
					}
				})));
			} else {
				setAddressSuggestions([]);
			}
		} catch (error) {
			console.error('Ошибка при получении адресов:', error);
			setAddressSuggestions([]);
			setError('Не удалось получить подсказки адресов. Пожалуйста, введите адрес вручную.');
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchAddresses = debounce(fetchAddressSuggestions, 300);

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Введите имя';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Введите email';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Введите корректный email';
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Введите телефон';
		} else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
			newErrors.phone = 'Введите корректный номер телефона';
		}

		if (!formData.address.trim()) {
			newErrors.address = 'Введите адрес доставки';
		} else if (!selectedAddress) {
			newErrors.address = 'Выберите адрес из списка';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		setErrors(prev => ({ ...prev, [name]: undefined }));

		if (name === 'address') {
			debouncedFetchAddresses(value);
		}
	};

	const handleAddressInputChange = (event: React.SyntheticEvent, value: string) => {
		setFormData(prev => ({
			...prev,
			address: value
		}));

		// Очищаем выбранный адрес при вводе
		setSelectedAddress(null);

		if (value.length >= 3) {
			debouncedFetchAddresses(value);
		} else {
			setAddressSuggestions([]);
		}
	};

	const handleAddressSelect = (event: React.SyntheticEvent, value: string | AddressSuggestion | null) => {
		if (value && typeof value !== 'string') {
			setSelectedAddress(value);
			setFormData(prev => ({
				...prev,
				address: value.label
			}));
			setAddressSuggestions([]); // Очищаем список после выбора
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			const orderItems = items.map((item: CartItem) => ({
				product: item.product._id,
				quantity: item.quantity,
				price: item.product.price
			}));

			const orderData: CreateOrderData = {
				items: orderItems,
				totalAmount: total,
				deliveryAddress: {
					address: formData.address,
					coordinates: selectedAddress?.coordinates ? {
						lat: Number(selectedAddress.coordinates.lat),
						lon: Number(selectedAddress.coordinates.lon)
					} : null
				},
				contactInfo: {
					name: formData.name,
					email: formData.email,
					phone: formData.phone
				},
				comment: formData.comment
			};

			const response = await createOrderMutation.mutateAsync(orderData);

			clearCart();
			navigate(`/orders/${response._id}`);
		} catch (err) {
			console.error('Ошибка при создании заказа:', err);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Произошла неизвестная ошибка при создании заказа');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	if (items.length === 0) {
		return (
			<Container maxWidth="md" sx={{ py: 8 }}>
				<Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
					<Typography variant="h5" gutterBottom>
						Корзина пуста
					</Typography>
					<Button
						variant="contained"
						onClick={() => navigate('/menu')}
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
				<Typography variant="h4" component="h1" gutterBottom>
					Оформление заказа
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" ref={formRef} onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Имя"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								error={!!errors.name}
								helperText={errors.name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								error={!!errors.email}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputMask
								mask="+7 (999) 999-99-99"
								value={formData.phone}
								onChange={handleChange}
							>
								{(inputProps: any) => (
									<TextField
										{...inputProps}
										fullWidth
										label="Телефон"
										name="phone"
										required
										error={!!errors.phone}
										helperText={errors.phone}
									/>
								)}
							</InputMask>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								freeSolo
								options={addressSuggestions}
								getOptionLabel={(option) =>
									typeof option === 'string' ? option : option.label
								}
								value={formData.address}
								onChange={handleAddressSelect}
								onInputChange={handleAddressInputChange}
								loading={isLoadingSuggestions}
								filterOptions={(x) => x} // Отключаем встроенную фильтрацию
								renderInput={(params) => (
									<TextField
										{...params}
										label="Адрес доставки"
										name="address"
										required
										fullWidth
										error={!!errors.address}
										helperText={errors.address}
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{isLoadingSuggestions ? <CircularProgress color="inherit" size={20} /> : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
									/>
								)}
								renderOption={(props, option) => (
									<ListItem {...props} key={`${option.label}-${option.coordinates.lat}-${option.coordinates.lon}`}>
										<ListItemText
											primary={option.label}
											secondary={option.description}
										/>
									</ListItem>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Комментарий к заказу"
								name="comment"
								value={formData.comment}
								onChange={handleChange}
								multiline
								rows={3}
								placeholder="Например: позвонить за час до доставки, не звонить в дверь и т.д."
							/>
						</Grid>
					</Grid>
					<Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant="h6">
							Итого: {total} ₽
						</Typography>
						<Button
							type="submit"
							variant="contained"
							size="large"
							disabled={loading}
						>
							{loading ? <CircularProgress size={24} /> : 'Оформить заказ'}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Checkout; 