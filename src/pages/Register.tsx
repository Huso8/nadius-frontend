import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/navigation';
import FormContainer from '../components/common/FormContainer';
import LoadingPage from '../components/common/LoadingPage';
import ErrorPage from '../components/common/ErrorPage';

interface FormErrors {
	email?: string;
	password?: string;
	confirmPassword?: string;
	name?: string;
}

const Register: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const { register, isLoading } = useAuth();
	const navigate = useNavigate();

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!name) {
			newErrors.name = 'Имя обязательно';
		} else if (name.length < 2) {
			newErrors.name = 'Имя должно содержать минимум 2 символа';
		}

		if (!email) {
			newErrors.email = 'Email обязателен';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			newErrors.email = 'Введите корректный email';
		}

		if (!password) {
			newErrors.password = 'Пароль обязателен';
		} else if (password.length < 6) {
			newErrors.password = 'Пароль должен содержать минимум 6 символов';
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = 'Подтверждение пароля обязательно';
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Пароли не совпадают';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!validateForm()) {
			return;
		}

		try {
			await register(email, password, name);
			navigate(ROUTES.HOME);
		} catch (err: any) {
			console.error('Registration error:', err);
			setError(err.message || 'Ошибка при регистрации');
		}
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<FormContainer>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Регистрация
			</Typography>
			{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
			<form onSubmit={handleSubmit}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="name"
					label="Имя"
					name="name"
					autoComplete="name"
					autoFocus
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						setErrors(prev => ({ ...prev, name: undefined }));
					}}
					error={!!errors.name}
					helperText={errors.name}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setErrors(prev => ({ ...prev, email: undefined }));
					}}
					error={!!errors.email}
					helperText={errors.email}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Пароль"
					type="password"
					id="password"
					autoComplete="new-password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setErrors(prev => ({ ...prev, password: undefined }));
					}}
					error={!!errors.password}
					helperText={errors.password}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="confirmPassword"
					label="Подтверждение пароля"
					type="password"
					id="confirmPassword"
					autoComplete="new-password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						setErrors(prev => ({ ...prev, confirmPassword: undefined }));
					}}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					sx={{ mt: 3 }}
				>
					Зарегистрироваться
				</Button>
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2">
						Уже есть аккаунт?{' '}
						<RouterLink to={ROUTES.LOGIN}>
							Войти
						</RouterLink>
					</Typography>
				</Box>
			</form>
		</FormContainer>
	);
};

export default Register; 