import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COMMON_STYLES } from '../../constants/theme';
import { ROUTES } from '../../constants/navigation';

interface ErrorPageProps {
	message?: string;
	fullScreen?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
	message = 'Что-то пошло не так...',
	fullScreen = false
}) => {
	const navigate = useNavigate();

	return (
		<Box sx={fullScreen ? COMMON_STYLES.CENTERED_FULL_SCREEN : COMMON_STYLES.CENTERED_FULL_HEIGHT}>
			<Box sx={{ textAlign: 'center' }}>
				<Typography variant="h5" color="error" gutterBottom>
					{message}
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate(ROUTES.HOME)}
					sx={{ mt: 2 }}
				>
					Вернуться на главную
				</Button>
			</Box>
		</Box>
	);
};

export default ErrorPage; 