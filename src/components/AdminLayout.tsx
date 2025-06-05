import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

interface AdminLayoutProps {
	children: React.ReactNode;
}

const drawerWidth = 240;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const menuItems = [
		{ text: 'Товары', icon: <RestaurantMenuIcon />, path: '/admin/products' },
		{ text: 'Заказы', icon: <ShoppingCartIcon />, path: '/admin/orders' },
		{ text: 'Пользователи', icon: <PeopleIcon />, path: '/admin/users' },
		{ text: 'Отзывы', icon: <RateReviewIcon />, path: '/admin/reviews' },
	];

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Админ-панель
					</Typography>
					<Button color="inherit" onClick={() => navigate('/menu')} sx={{ mr: 2 }}>
						Перейти в меню
					</Button>
					<Button color="inherit" onClick={handleLogout}>
						Выйти
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						marginTop: '64px', // Высота AppBar
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
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
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
				{children}
			</Box>
		</Box>
	);
};

export default AdminLayout; 