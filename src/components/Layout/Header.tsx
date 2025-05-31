import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton, InputBase, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../../context/CartContext';
import Fab from '@mui/material/Fab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import logo from '../../logo.png';

const Header: React.FC = () => {
	const { items } = useCart();
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const [searchOpen, setSearchOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [focused, setFocused] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { isAuthenticated, logout } = useAuth();

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/search?q=${encodeURIComponent(search.trim())}`);
			setSearchOpen(false);
			setSearch('');
		}
	};

	const handleSelectProduct = (productName: string) => {
		setSearch(productName);
		navigate(`/search?q=${encodeURIComponent(productName)}`);
		setSearchOpen(false);
	};

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<>
			<AppBar position="static" sx={{ background: 'linear-gradient(to right, #8b6d5c, #a3d6c4)' }}>
				<Toolbar>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<img src={logo} alt="Nadius" style={{ width: '60px', height: '60px' }} />
					</Box>
					<Typography
						variant="h6"
						component={RouterLink}
						to="/"
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							color: 'white',
							fontFamily: 'JetBrains Mono',
							fontSize: '30px',
						}}
					>
						{' Nadius '}
					</Typography>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', position: 'relative' }}>
						{!searchOpen && (
							<IconButton color="inherit" onClick={() => setSearchOpen(true)}>
								<SearchIcon />
							</IconButton>
						)}
						{searchOpen && (
							<Box sx={{ position: 'relative' }}>
								<Paper component="form" onSubmit={handleSearchSubmit} sx={{ ml: 1, p: '2px 8px', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.95)', minWidth: 220 }}>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Поиск..."
										value={search}
										onChange={e => setSearch(e.target.value)}
										onFocus={() => setFocused(true)}
										onBlur={() => setTimeout(() => setFocused(false), 150)}
										autoFocus
									/>
									<IconButton type="submit" sx={{ p: 1 }}>
										<SearchIcon />
									</IconButton>
								</Paper>
								{(focused || search) && filteredProducts.length > 0 && (
									<Paper sx={{ position: 'absolute', left: 0, right: 0, zIndex: 10, mt: 0.5, maxHeight: 300, overflowY: 'auto' }}>
										<List>
											{filteredProducts.map(product => (
												<ListItem key={product._id} disablePadding>
													<ListItemButton onMouseDown={() => handleSelectProduct(product.name)}>
														<ListItemText primary={product.name} />
													</ListItemButton>
												</ListItem>
											))}
										</List>
									</Paper>
								)}
							</Box>
						)}
						<Button color="inherit" component={RouterLink} to="/" >Главная</Button>
						<Button color="inherit" component={RouterLink} to="/menu" >Меню</Button>
						<Button color="inherit" component={RouterLink} to="/checkout" >Заказать</Button>
						<Button color="inherit" component={RouterLink} to="/contacts" >Контакты</Button>
						{isAuthenticated ? (
							<>
								<Button
									color="inherit"
									component={RouterLink}
									to="/profile"
								>
									Профиль
								</Button>
								<Button
									color="inherit"
									onClick={handleLogout}
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Button
									color="inherit"
									component={RouterLink}
									to="/login"
								>
									Войти
								</Button>
								<Button
									color="inherit"
									component={RouterLink}
									to="/register"
								>
									Регистрация
								</Button>
							</>
						)}
						<Button
							color="inherit"
							component={RouterLink}
							to="/recipes"
						>
							Рецепты
						</Button>
						<Button
							color="inherit"
							component={RouterLink}
							to="/cart"
							startIcon={
								<Badge badgeContent={totalItems} color="error">
									<ShoppingCartIcon />
								</Badge>
							}
						>
							Корзина
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			{isMobile && (
				<Fab
					color="primary"
					sx={{
						position: 'fixed',
						bottom: 24,
						right: 24,
						zIndex: 1201,
						boxShadow: '0 4px 24px rgba(139,109,92,0.18)',
					}}
					onClick={() => navigate('/cart')}
				>
					<Badge badgeContent={totalItems} color="error">
						<ShoppingCartIcon />
					</Badge>
				</Fab>
			)}
		</>
	);
};

export default Header; 