import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import Recipes from './pages/Recipes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
				<CartProvider>
					<Router>
						<Layout>
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
								<Route path="/recipes" element={<Recipes />} />
							</Routes>
						</Layout>
					</Router>
				</CartProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
