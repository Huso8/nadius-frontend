import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#8b6d5c',
		},
		secondary: {
			main: '#a3d6c4',
		},
		background: {
			default: '#f5e6d3',
		},
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			fontFamily: '"Montserrat", sans-serif',
		},
		h2: {
			fontFamily: '"Montserrat", sans-serif',
		},
		h3: {
			fontFamily: '"Montserrat", sans-serif',
		},
	},
});

export default theme; 