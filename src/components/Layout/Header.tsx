import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton, Fab, CircularProgress, useScrollTrigger } from '@mui/material';
import { useCart } from '../../context/CartContext';
import { useTheme } from '@mui/material/styles';
import { useProducts } from '../../services/api';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../../logo.png';
import SearchBar from './Header/SearchBar';
import Navigation from './Header/Navigation';
import AuthMenu from './Header/AuthMenu';
import MobileMenu from './Header/MobileMenu';
import { ROUTES } from '../../constants/navigation';
import { COLORS, BREAKPOINTS, SPACING } from '../../constants/theme';

const Header: React.FC = () => {
	const { items } = useCart();
	const totalItems = React.useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
	const [isLoading, setIsLoading] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.MOBILE));
	const { data: products } = useProducts();

	// Эффект для изменения хедера при скролле
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});

	// Сброс индикатора загрузки при изменении маршрута
	React.useEffect(() => {
		setIsLoading(false);
	}, [location]);

	const handleMobileMenuToggle = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					background: location.pathname === '/'
						? (trigger ? 'white' : 'transparent')
						: COLORS.BACKGROUND.GRADIENT,
					boxShadow: location.pathname === '/'
						? (trigger ? '0 2px 10px rgba(0,0,0,0.1)' : 'none')
						: '0 2px 10px rgba(0,0,0,0.1)',
					transition: 'all 0.8s ease-in-out',
					'& *': {
						color: location.pathname === '/'
							? (trigger ? COLORS.PRIMARY : 'white')
							: 'white',
						transition: 'color 0.8s ease-in-out'
					}
				}}
			>
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
						gap: 0,
						'& img': {
							width: { xs: '40px', [BREAKPOINTS.MOBILE]: '60px' },
							height: { xs: '40px', [BREAKPOINTS.MOBILE]: '60px' },
							objectFit: 'contain',
							cursor: 'pointer'
						}
					}}>
						<RouterLink to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
							<img src={logo} alt="Nadius" />
						</RouterLink>
					</Box>
					<Typography
						variant="h6"
						component={RouterLink}
						to={ROUTES.HOME}
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							fontFamily: '"JetBrains Mono", monospace',
							fontSize: { xs: '24px', [BREAKPOINTS.MOBILE]: '40px' },
							mx: { xs: 0, [BREAKPOINTS.MOBILE]: 0.5 },
							fontWeight: 400,
							letterSpacing: '0.03em'
						}}
					>
						{'Nadius'}
					</Typography>

					<Navigation />

					<Button
						component={RouterLink}
						to={ROUTES.CART}
						sx={{
							display: { xs: 'none', [BREAKPOINTS.MOBILE]: 'flex' },
							mx: 1,
							minWidth: 'auto',
							padding: '8px'
						}}
					>
						<Badge
							badgeContent={totalItems}
							color="error"
							sx={{
								'& .MuiBadge-badge': {
									backgroundColor: location.pathname === '/'
										? (trigger ? COLORS.PRIMARY : 'error.main')
										: 'error.main',
									color: location.pathname === '/'
										? (trigger ? 'white' : 'white')
										: 'white'
								}
							}}
						>
							<ShoppingCartIcon />
						</Badge>
					</Button>

					<SearchBar products={products || []} />

					<Box sx={{
						display: 'flex',
						alignItems: 'center'
					}}>
						<AuthMenu />
					</Box>

					<IconButton
						onClick={handleMobileMenuToggle}
						sx={{
							display: { xs: 'flex', [BREAKPOINTS.MOBILE]: 'none' }
						}}
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