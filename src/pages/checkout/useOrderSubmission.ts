import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from '../../services/api';
import { CreateOrderData, CartItem } from '../../types/types';
import { AddressSuggestion, OrderFormData, FormErrors } from './useCheckoutForm';

export function useOrderSubmission(items: CartItem[], formData: OrderFormData, selectedAddress: AddressSuggestion | null, onSuccess: (orderId: string) => void) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errors, setErrors] = useState<FormErrors>({});
	const createOrderMutation = useCreateOrder();
	const navigate = useNavigate();

	const validateForm = () => {
		const newErrors: FormErrors = {};
		if (!formData.name.trim()) {
			newErrors.name = 'Введите имя (обязательно)';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Введите email (обязательно)';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Введите корректный email';
		}
		if (!formData.phone.trim()) {
			newErrors.phone = 'Введите телефон (обязательно)';
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		if (!selectedAddress) {
			setErrors(prev => ({ ...prev, address: 'Выберите адрес из списка' }));
			return;
		}
		setLoading(true);
		setError(null);
		const orderItems = items.map((item: CartItem) => ({
			productId: item.product._id,
			quantity: item.quantity,
			price: item.product.price
		}));
		const orderData: CreateOrderData = {
			items: orderItems,
			deliveryAddress: {
				address: selectedAddress.label,
				coordinates: {
					lat: parseFloat(selectedAddress.coordinates.lat),
					lon: parseFloat(selectedAddress.coordinates.lon)
				}
			},
			contactInfo: {
				name: formData.name,
				email: formData.email,
				phone: formData.phone
			},
			comment: formData.comment
		};
		createOrderMutation.mutate(orderData, {
			onSuccess: (createdOrder) => {
				setLoading(false);
				onSuccess(createdOrder._id);
			},
			onError: (err) => {
				setLoading(false);
				setError('Произошла ошибка при создании заказа. Пожалуйста, попробуйте еще раз.');
			}
		});
	};

	return { handleSubmit, loading, error, errors, setErrors };
} 