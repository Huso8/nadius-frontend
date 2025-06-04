export const COLORS = {
	PRIMARY: '#8b6d5c',
	SECONDARY: '#a3d6c4',
	BACKGROUND: {
		GRADIENT: 'linear-gradient(to right, #8b6d5c, #a3d6c4)'
	},
	TEXT: {
		PRIMARY: '#000000',
		SECONDARY: 'rgba(0, 0, 0, 0.6)'
	}
} as const;

export const BREAKPOINTS = {
	MOBILE: 'sm',
	TABLET: 'md',
	DESKTOP: 'lg'
} as const;

export const SPACING = {
	CARD: {
		MARGIN: 2,
		PADDING: 2
	},
	HEADER: {
		HEIGHT: {
			MOBILE: '64px',
			DESKTOP: '70px'
		}
	}
} as const;

export const COMMON_STYLES = {
	CENTERED: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	CENTERED_FULL_HEIGHT: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '60vh'
	},
	CENTERED_FULL_SCREEN: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh'
	},
	PAPER: {
		p: 4,
		elevation: 3
	},
	CONTAINER: {
		py: 4
	}
} as const; 