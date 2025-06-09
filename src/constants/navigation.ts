export const NAVIGATION_ITEMS = [
	{ text: 'Главная', path: '/' },
	{ text: 'Меню', path: '/menu' },
	{ text: 'Контакты', path: '/contacts' }
] as const;

export const ROUTES = {
	HOME: '/',
	MENU: '/menu',
	CHECKOUT: '/checkout',
	CONTACTS: '/contacts',
	CART: '/cart',
	PROFILE: '/profile',
	LOGIN: '/login',
	REGISTER: '/register',
	SEARCH: '/search',
	PRODUCT: (id: string) => `/product/${id}`
} as const; 