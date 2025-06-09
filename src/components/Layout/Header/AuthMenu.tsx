import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Typography, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../../context/AuthContext';

const AuthMenu: React.FC = () => {
	const [authMenuAnchor, setAuthMenuAnchor] = useState<null | HTMLElement>(null);
	const { isAuthenticated, logout, user } = useAuth();
	const navigate = useNavigate();

	const handleAuthClick = (event: React.MouseEvent<HTMLElement>) => {
		setAuthMenuAnchor(event.currentTarget);
	};

	const handleAuthMenuClose = () => {
		setAuthMenuAnchor(null);
	};

	const handleLogout = () => {
		logout();
		navigate('/');
		setAuthMenuAnchor(null);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<IconButton
					color="inherit"
					onClick={handleAuthClick}
					sx={{
						ml: { xs: 0.5, sm: 1 },
						mr: { xs: 0.5, sm: 1 }
					}}
				>
					<Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
						<PersonIcon />
					</Avatar>
				</IconButton>
				{isAuthenticated && user?.name && (
					<Typography
						variant="body1"
						sx={{
							color: 'white',
							display: { xs: 'none', sm: 'block' },
							fontWeight: 500
						}}
					>
						{user.name}
					</Typography>
				)}
			</Box>
			<Menu
				anchorEl={authMenuAnchor}
				open={Boolean(authMenuAnchor)}
				onClose={handleAuthMenuClose}
				disableScrollLock
				MenuListProps={{
					'aria-labelledby': 'auth-menu-button',
				}}
			>
				{isAuthenticated ? (
					<>
						<MenuItem
							component={RouterLink}
							to="/profile"
							onClick={handleAuthMenuClose}
						>
							Профиль
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							Выйти
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem
							component={RouterLink}
							to="/login"
							onClick={handleAuthMenuClose}
						>
							Войти
						</MenuItem>
						<MenuItem
							component={RouterLink}
							to="/register"
							onClick={handleAuthMenuClose}
						>
							Регистрация
						</MenuItem>
					</>
				)}
			</Menu>
		</>
	);
};

export default AuthMenu; 