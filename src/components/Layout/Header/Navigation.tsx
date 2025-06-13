import React from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import { BREAKPOINTS } from '../../../constants/theme';

const Navigation: React.FC = () => {
	return (
		<Box sx={{
			display: { xs: 'none', [BREAKPOINTS.MOBILE]: 'flex' },
			gap: 1,
			mx: 1
		}}>
			{NAVIGATION_ITEMS.map((item) => (
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