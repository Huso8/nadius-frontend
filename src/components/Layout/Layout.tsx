import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SPACING, BREAKPOINTS } from '../../constants/theme';
import { ROUTES } from '../../constants/navigation';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const location = useLocation();
	const isHomePage = location.pathname === ROUTES.HOME;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				backgroundColor: 'transparent',
				position: 'relative',
				width: '100%',
				overflow: 'hidden'
			}}
		>
			<Header />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					pt: isHomePage ? 0 : {
						xs: SPACING.HEADER.HEIGHT.MOBILE,
						[BREAKPOINTS.MOBILE]: SPACING.HEADER.HEIGHT.DESKTOP
					},
					width: '100%',
					position: 'relative'
				}}
			>
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export default Layout; 