import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box, IconButton, InputAdornment } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/navigation';
import FormContainer from '../components/common/FormContainer';
import LoadingPage from '../components/common/LoadingPage';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { register, isLoading } = useAuth();
	const navigate = useNavigate();

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!name) {
			newErrors.name = 'Имя обязательно';
		} else if (name.length < 3) {
			newErrors.name = 'Имя должно содержать минимум 3 символа';
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
		} else if (!/(?=.*[A-Z])/.test(password)) {
			newErrors.password = 'Пароль должен содержать хотя бы одну заглавную букву';
		} else if (!/(?=.*[0-9])/.test(password)) {
			newErrors.password = 'Пароль должен содержать хотя бы одну цифру';
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
			await register({ email, password, name });
			navigate(ROUTES.HOME);
		} catch (err: any) {
			console.error('Registration error:', err);
			if (err.response?.data?.message) {
				setError(err.response.data.message);
			} else {
				setError('Ошибка при регистрации');
			}
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
					type={showPassword ? 'text' : 'password'}
					id="password"
					autoComplete="new-password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setErrors(prev => ({ ...prev, password: undefined }));
					}}
					error={!!errors.password}
					helperText={errors.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="confirmPassword"
					label="Подтверждение пароля"
					type={showConfirmPassword ? 'text' : 'password'}
					id="confirmPassword"
					autoComplete="new-password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						setErrors(prev => ({ ...prev, confirmPassword: undefined }));
					}}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle confirm password visibility"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									edge="end"
								>
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
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