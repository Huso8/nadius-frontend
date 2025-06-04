import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { COMMON_STYLES } from '../../constants/theme';

interface LoadingPageProps {
	fullScreen?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ fullScreen = false }) => {
	return (
		<Box sx={fullScreen ? COMMON_STYLES.CENTERED_FULL_SCREEN : COMMON_STYLES.CENTERED_FULL_HEIGHT}>
			<CircularProgress />
		</Box>
	);
};

export default LoadingPage; 