import React from 'react';
import { Container, Paper } from '@mui/material';
import { COMMON_STYLES } from '../../constants/theme';

interface FormContainerProps {
	children: React.ReactNode;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const FormContainer: React.FC<FormContainerProps> = ({
	children,
	maxWidth = 'sm'
}) => {
	return (
		<Container maxWidth={maxWidth} sx={COMMON_STYLES.CONTAINER}>
			<Paper elevation={3} sx={COMMON_STYLES.PAPER}>
				{children}
			</Paper>
		</Container>
	);
};

export default FormContainer; 