import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { logout } = useAuth();

	const menuItems = [
		{ text: 'Дашборд', icon: <DashboardIcon />, path: ROUTES.ADMIN_DASHBOARD },
		{ text: 'Товары', icon: <InventoryIcon />, path: ROUTES.ADMIN_PRODUCTS },
		{ text: 'Заказы', icon: <ShoppingCartIcon />, path: ROUTES.ADMIN_ORDERS },
		{ text: 'Пользователи', icon: <PeopleIcon />, path: ROUTES.ADMIN_USERS },
		{ text: 'Отзывы', icon: <RateReviewIcon />, path: ROUTES.ADMIN_REVIEWS }
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					Админ-панель
				</Typography>
			</Toolbar>
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						onClick={() => navigate(item.path)}
						selected={location.pathname === item.path}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
				<ListItem button onClick={logout}>
					<ListItemIcon><LogoutIcon /></ListItemIcon>
					<ListItemText primary="Выйти" />
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` }
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
						keepMounted: true
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
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
					mt: '64px'
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default AdminLayout; 