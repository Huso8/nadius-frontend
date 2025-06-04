import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/navigation';
import FormContainer from '../components/common/FormContainer';
import LoadingPage from '../components/common/LoadingPage';
import ErrorPage from '../components/common/ErrorPage';

const Register: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const { register, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		try {
			await register(email, password, name);
			navigate(ROUTES.HOME);
		} catch (err) {
			setError('Ошибка при регистрации');
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
					onChange={(e) => setName(e.target.value)}
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
					onChange={(e) => setEmail(e.target.value)}
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
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="confirmPassword"
					label="Подтвердите пароль"
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
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