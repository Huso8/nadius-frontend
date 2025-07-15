import React, { useState, useCallback } from 'react';
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
}

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoading } = useAuth();
	const navigate = useNavigate();

	const validateForm = useCallback((): boolean => {
		const newErrors: FormErrors = {};

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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [email, password]);

	const handleLogin = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setError('');
		setErrors({});

		if (!validateForm()) {
			return;
		}

		try {
			await login({ email, password });
			setTimeout(() => {
				navigate(ROUTES.HOME, { replace: true });
			}, 0);
		} catch (err: any) {
			console.error('Login error:', err);
			setError(err.message || 'Ошибка при входе');
		}
	}, [email, password, login, navigate, validateForm]);

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleLogin(e as any);
		}
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<FormContainer>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Вход
			</Typography>
			{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
			<Box>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setErrors(prev => ({ ...prev, email: undefined }));
					}}
					onKeyPress={handleKeyPress}
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
					autoComplete="current-password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setErrors(prev => ({ ...prev, password: undefined }));
					}}
					onKeyPress={handleKeyPress}
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
				<Button
					fullWidth
					variant="contained"
					color="primary"
					sx={{ mt: 3 }}
					onClick={handleLogin}
					type="button"
				>
					Войти
				</Button>
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2">
						Нет аккаунта?{' '}
						<RouterLink to={ROUTES.REGISTER}>
							Зарегистрироваться
						</RouterLink>
					</Typography>
				</Box>
			</Box>
		</FormContainer>
	);
};

export default Login; 