import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { queryClient } from './services/queryClient';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Users from './pages/admin/Users';
import Checkout from './pages/checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ReviewsPage from './pages/Reviews';
import TrackOrderPage from './pages/TrackOrder';

// Ленивая загрузка компонентов
const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const Search = React.lazy(() => import('./pages/Search'));

// Админ-компоненты
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = React.lazy(() => import('./pages/admin/Products'));
const AdminOrders = React.lazy(() => import('./pages/admin/Orders'));
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
										<Route index element={<Navigate to="/admin/dashboard" replace />} />
										<Route path="dashboard" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminDashboard />
											</React.Suspense>
										} />
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
										<Route path="users" element={<Users />} />
										<Route path="reviews" element={
											<React.Suspense fallback={<LoadingFallback />}>
												<AdminReviews />
											</React.Suspense>
										} />
									</Route>

									{/* Редирект для несуществующих маршрутов */}
									<Route path="*" element={<Navigate to="/" replace />} />
									<Route path="/reviews" element={<Layout><ReviewsPage /></Layout>} />
									<Route path="/track-order" element={<Layout><TrackOrderPage /></Layout>} />
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
