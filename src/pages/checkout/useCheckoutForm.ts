import { useState, useRef } from 'react';
import { debounce } from 'lodash';

export interface AddressSuggestion {
	label: string;
	description?: string;
	coordinates: {
		lat: string;
		lon: string;
	};
}

export interface OrderFormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	comment: string;
}

export interface FormErrors {
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export function useCheckoutForm(initialData: OrderFormData) {
	const [formData, setFormData] = useState<OrderFormData>(initialData);
	const [errors, setErrors] = useState<FormErrors>({});
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAddressSuggestions = async (query: string) => {
		if (query.length < 3) {
			setAddressSuggestions([]);
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/api/address/suggest?query=${encodeURIComponent(query)}`);
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
		} catch (err) {
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: undefined }));
		if (name === 'address') {
			debouncedFetchAddresses(value);
		}
	};

	const handleAddressInputChange = (_event: React.SyntheticEvent, value: string) => {
		setFormData(prev => ({ ...prev, address: value }));
		setSelectedAddress(null);
		if (value.length >= 3) {
			debouncedFetchAddresses(value);
		}
	};

	const handleAddressSelect = (_event: React.SyntheticEvent, value: string | AddressSuggestion | null) => {
		if (value && typeof value !== 'string') {
			setSelectedAddress(value);
			setFormData(prev => ({ ...prev, address: value.label }));
		}
	};

	return {
		formData,
		setFormData,
		errors,
		setErrors,
		validateForm,
		handleChange,
		handleAddressInputChange,
		handleAddressSelect,
		addressSuggestions,
		selectedAddress,
		setSelectedAddress,
		loading,
		setLoading,
		error,
		setError,
		debouncedFetchAddresses
	};
} 