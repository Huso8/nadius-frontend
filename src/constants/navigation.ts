export const NAVIGATION_ITEMS = [
	{ text: 'Главная', path: '/' },
	{ text: 'Меню', path: '/menu' },
	{ text: 'Контакты', path: '/contacts' },
	{ text: 'Отзывы', path: '/reviews' },
	{ text: 'Мои заказы', path: '/track-order' },
] as const;

export const ROUTES = {
	// Основные маршруты
	HOME: '/',
	MENU: '/menu',
	CHECKOUT: '/checkout',
	CONTACTS: '/contacts',
	CART: '/cart',
	PROFILE: '/profile',
	LOGIN: '/login',
	REGISTER: '/register',
	SEARCH: '/search',
	PRODUCT: (id: string) => `/product/${id}`,
	ORDER_SUCCESS: '/order-success',
	REVIEWS: '/reviews',

	// Админские маршруты
	ADMIN: '/admin',
	ADMIN_DASHBOARD: '/admin/dashboard',
	ADMIN_PRODUCTS: '/admin/products',
	ADMIN_ORDERS: '/admin/orders',
	ADMIN_USERS: '/admin/users',
	ADMIN_REVIEWS: '/admin/reviews'
} as const;

export default ROUTES;