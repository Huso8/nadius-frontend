import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/navigation';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const drawerWidth = 240;

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = () => {
		logout();
		navigate(ROUTES.HOME);
	};

	const menuItems = [
		{ text: 'Товары', icon: <InventoryIcon />, path: '/admin/products' },
		{ text: 'Заказы', icon: <ShoppingCartIcon />, path: '/admin/orders' },
		{ text: 'Пользователи', icon: <PeopleIcon />, path: '/admin/users' },
		{ text: 'Отзывы', icon: <RateReviewIcon />, path: '/admin/reviews' },
	];

	const drawer = (
		<div>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					Админ-панель
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						component={RouterLink}
						to={item.path}
						selected={location.pathname === item.path}
						onClick={() => isMobile && handleDrawerToggle()}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary="Выйти" />
				</ListItem>
			</List>
		</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						{menuItems.find(item => item.path === location.pathname)?.text || 'Админ-панель'}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					mt: '64px',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default AdminLayout; 