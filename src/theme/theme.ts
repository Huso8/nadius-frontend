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
		fontFamily: '"Nunito", sans-serif',
		h1: {
			fontWeight: 800,
			letterSpacing: '-0.02em',
		},
		h2: {
			fontWeight: 700,
			letterSpacing: '-0.01em',
		},
		h3: {
			fontWeight: 700,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
		body1: {
			fontWeight: 400,
			letterSpacing: '0.01em',
		},
		body2: {
			fontWeight: 400,
			letterSpacing: '0.01em',
		},
		button: {
			fontWeight: 600,
			textTransform: 'none',
			letterSpacing: '0.02em',
		},
	},
});

export default theme; 