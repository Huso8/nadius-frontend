import React from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { BREAKPOINTS } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';

const Navigation: React.FC = () => {
	const { user } = useAuth();

	const navItems = user
		? NAVIGATION_ITEMS.filter(item => item.path !== '/track-order')
		: NAVIGATION_ITEMS;

	return (
		<Box sx={{
			display: { xs: 'none', [BREAKPOINTS.MOBILE]: 'flex' },
			gap: 1,
			mx: 1
		}}>
			{navItems.map((item) => (
				<Button
					key={item.path}
					color="inherit"
					component={RouterLink}
					to={item.path}
					sx={{
						fontSize: { xs: '16px', [BREAKPOINTS.MOBILE]: '18px' },
						fontWeight: 600
					}}
				>
					{item.text}
				</Button>
			))}
		</Box>
	);
};

export default Navigation; 