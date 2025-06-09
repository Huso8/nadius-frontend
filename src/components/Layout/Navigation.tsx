import { Box, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { useScrollTrigger } from '@mui/material';

export const Navigation = () => {
	const location = useLocation();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	return (
		<Box sx={{
			display: { xs: 'none', [BREAKPOINTS.MOBILE]: 'flex' },
			gap: 1
		}}>
			{Object.entries(ROUTES).map(([key, route]) => (
				<Button
					key={key}
					component={RouterLink}
					to={route as string}
					sx={{
						textTransform: 'none',
						fontSize: '16px'
					}}
				>
					{key}
				</Button>
			))}
		</Box>
	);
};

export default Navigation; 