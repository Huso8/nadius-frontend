import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Link, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await login(email, password);
			navigate('/profile');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Ошибка при входе');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="sm" sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom align="center">
					Вход в аккаунт
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				<Box component="form" onSubmit={handleSubmit}>
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
					<Button
						fullWidth
						type="submit"
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
						disabled={loading}
					>
						{loading ? 'Вход...' : 'Войти'}
					</Button>
					<Box sx={{ mt: 2, textAlign: 'center' }}>
						<Typography variant="body2">
							Нет аккаунта?{' '}
							<Link component={RouterLink} to="/register">
								Зарегистрироваться
							</Link>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login; 