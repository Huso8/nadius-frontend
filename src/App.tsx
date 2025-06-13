import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { queryClient } from './services/queryClient';
import ProtectedRoute from './components/common/ProtectedRoute';

// Ленивая загрузка компонентов
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const OrderSuccess = React.lazy(() => import('./pages/OrderSuccess'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const Search = React.lazy(() => import('./pages/Search'));

// Админ-компоненты
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = React.lazy(() => import('./pages/admin/Products'));
const AdminOrders = React.lazy(() => import('./pages/admin/Orders'));
const AdminUsers = React.lazy(() => import('./pages/admin/Users'));
const AdminReviews = React.lazy(() => import('./pages/admin/Reviews'));

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
				<CartProvider>
					<Router future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true
					}}>
						<AuthProvider>
							<Suspense fallback={<LoadingFallback />}>
								<Routes>
									{/* Публичные маршруты */}
									<Route path="/" element={<Layout><Home /></Layout>} />
									<Route path="/menu" element={<Layout><Menu /></Layout>} />
									<Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
									<Route path="/cart" element={<Layout><Cart /></Layout>} />
									<Route path="/checkout" element={<Layout><Checkout /></Layout>} />
									<Route path="/order-success" element={<OrderSuccess />} />
									<Route path="/profile" element={<Layout><Profile /></Layout>} />
									<Route path="/login" element={<Layout><Login /></Layout>} />
									<Route path="/register" element={<Layout><Register /></Layout>} />
									<Route path="/contacts" element={<Layout><Contacts /></Layout>} />
									<Route path="/search" element={<Layout><Search /></Layout>} />

									{/* Админ-маршруты */}
									<Route path="/admin" element={
										<ProtectedRoute>
											<AdminLayout>
												<Outlet />
											</AdminLayout>
										</ProtectedRoute>
									}>
										<Route index element={<Navigate to="/admin/products" replace />} />
										<Route path="products" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminProducts />
											</React.Suspense>
										} />
										<Route path="orders" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminOrders />
											</React.Suspense>
										} />
										<Route path="users" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminUsers />
											</React.Suspense>
										} />
										<Route path="reviews" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminReviews />
											</React.Suspense>
										} />
									</Route>

									{/* Редирект для несуществующих маршрутов */}
									<Route path="*" element={<Navigate to="/" replace />} />
								</Routes>
							</Suspense>
						</AuthProvider>
					</Router>
				</CartProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
