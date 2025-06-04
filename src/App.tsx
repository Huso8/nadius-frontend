import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import Layout from './components/Layout/Layout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { queryClient } from './services/queryClient';

// Ленивая загрузка компонентов
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const Search = React.lazy(() => import('./pages/Search'));

// Компонент загрузки
const LoadingFallback = () => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '100vh',
		}}
	>
		<CircularProgress />
	</Box>
);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>
					<CartProvider>
						<Router future={{ v7_startTransition: true }}>
							<Layout>
								<Suspense fallback={<LoadingFallback />}>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/menu" element={<Menu />} />
										<Route path="/product/:id" element={<ProductDetails />} />
										<Route path="/cart" element={<Cart />} />
										<Route path="/checkout" element={<Checkout />} />
										<Route path="/profile" element={<Profile />} />
										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Register />} />
										<Route path="/contacts" element={<Contacts />} />
										<Route path="/search" element={<Search />} />
									</Routes>
								</Suspense>
							</Layout>
						</Router>
					</CartProvider>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
