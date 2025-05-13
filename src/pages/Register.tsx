import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Link, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
	const navigate = useNavigate();
	const { register } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		setLoading(true);

		try {
			await register(email, password, name);
			navigate('/profile');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка при регистрации');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="sm" sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom align="center">
					Регистрация
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label="Имя"
						value={name}
						onChange={(e) => setName(e.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Пароль"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Подтвердите пароль"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						margin="normal"
						required
					/>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
						disabled={loading}
					>
						{loading ? 'Регистрация...' : 'Зарегистрироваться'}
					</Button>
					<Box sx={{ mt: 2, textAlign: 'center' }}>
						<Typography variant="body2">
							Уже есть аккаунт?{' '}
							<Link component={RouterLink} to="/login">
								Войти
							</Link>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Register; 