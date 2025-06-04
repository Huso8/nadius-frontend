import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/navigation';
import FormContainer from '../components/common/FormContainer';
import LoadingPage from '../components/common/LoadingPage';
import ErrorPage from '../components/common/ErrorPage';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login, isLoading } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate(ROUTES.HOME);
		} catch (err) {
			setError('Неверный email или пароль');
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
			<form onSubmit={handleSubmit}>
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
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					sx={{ mt: 3 }}
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
			</form>
		</FormContainer>
	);
};

export default Login; 