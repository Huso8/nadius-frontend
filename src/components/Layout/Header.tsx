import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Badge,
	Box,
	IconButton,
	Fab,
	CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../../context/CartContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useProducts } from '../../services/api';
import logo from '../../logo.png';
import SearchBar from './Header/SearchBar';
import Navigation from './Header/Navigation';
import AuthMenu from './Header/AuthMenu';
import MobileMenu from './Header/MobileMenu';
import { ROUTES } from '../../constants/navigation';
import { COLORS, BREAKPOINTS, SPACING } from '../../constants/theme';

const Header: React.FC = () => {
	const { items } = useCart();
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const [isLoading, setIsLoading] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.MOBILE));
	const { data: products = [] } = useProducts();

	// Сброс индикатора загрузки при изменении маршрута
	React.useEffect(() => {
		setIsLoading(false);
	}, [location]);

	const handleMobileMenuToggle = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<>
			<AppBar position="static" sx={{ background: COLORS.BACKGROUND.GRADIENT }}>
				<Toolbar sx={{
					minHeight: {
						xs: SPACING.HEADER.HEIGHT.MOBILE,
						[BREAKPOINTS.MOBILE]: SPACING.HEADER.HEIGHT.DESKTOP
					},
					px: { xs: 1, [BREAKPOINTS.MOBILE]: 2 },
					gap: { xs: 0.5, [BREAKPOINTS.MOBILE]: 1 }
				}}>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						'& img': {
							width: { xs: '40px', [BREAKPOINTS.MOBILE]: '60px' },
							height: { xs: '40px', [BREAKPOINTS.MOBILE]: '60px' },
							objectFit: 'contain'
						}
					}}>
						<img src={logo} alt="Nadius" />
					</Box>
					<Typography
						variant="h6"
						component={RouterLink}
						to={ROUTES.HOME}
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							color: 'white',
							fontFamily: 'JetBrains Mono',
							fontSize: { xs: '20px', [BREAKPOINTS.MOBILE]: '30px' },
							mx: { xs: 1, [BREAKPOINTS.MOBILE]: 2 }
						}}
					>
						{' Nadius '}
					</Typography>

					<Navigation />

					<Button
						color="inherit"
						component={RouterLink}
						to={ROUTES.CART}
						startIcon={
							<Badge badgeContent={totalItems} color="error">
								<ShoppingCartIcon />
							</Badge>
						}
						sx={{
							display: { xs: 'none', [BREAKPOINTS.MOBILE]: 'flex' },
							mx: 1
						}}
					>
						Корзина
					</Button>

					<SearchBar products={products} />

					<AuthMenu />

					<IconButton
						color="inherit"
						onClick={handleMobileMenuToggle}
						sx={{ display: { xs: 'flex', [BREAKPOINTS.MOBILE]: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<MobileMenu open={mobileMenuOpen} onClose={handleMobileMenuToggle} />

			{isLoading && (
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						zIndex: 9999,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '4px',
					}}
				>
					<CircularProgress size={20} thickness={4} />
				</Box>
			)}

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
					onClick={() => navigate(ROUTES.CART)}
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