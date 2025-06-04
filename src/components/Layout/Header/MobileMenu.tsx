import React from 'react';
import { Drawer, Box, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { NAVIGATION_ITEMS, ROUTES } from '../../../constants/navigation';

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
	const { isAuthenticated, logout } = useAuth();

	const handleLogout = () => {
		logout();
		onClose();
	};

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
		>
			<Box sx={{ width: 250, pt: 2 }}>
				{NAVIGATION_ITEMS.map((item) => (
					<Button
						key={item.path}
						fullWidth
						color="inherit"
						component={RouterLink}
						to={item.path}
						onClick={onClose}
						sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
					>
						{item.text}
					</Button>
				))}
				<Divider />
				{isAuthenticated ? (
					<>
						<Button
							fullWidth
							color="inherit"
							component={RouterLink}
							to={ROUTES.PROFILE}
							onClick={onClose}
							sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
						>
							Профиль
						</Button>
						<Button
							fullWidth
							color="inherit"
							onClick={handleLogout}
							sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
						>
							Выйти
						</Button>
					</>
				) : (
					<>
						<Button
							fullWidth
							color="inherit"
							component={RouterLink}
							to={ROUTES.LOGIN}
							onClick={onClose}
							sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
						>
							Войти
						</Button>
						<Button
							fullWidth
							color="inherit"
							component={RouterLink}
							to={ROUTES.REGISTER}
							onClick={onClose}
							sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}
						>
							Регистрация
						</Button>
					</>
				)}
			</Box>
		</Drawer>
	);
};

export default MobileMenu; 