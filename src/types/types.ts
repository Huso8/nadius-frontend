export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	available: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface OrderItem {
	_id: string;
	product: Product;
	quantity: number;
	price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'on_the_way' | 'completed' | 'cancelled';

export interface Coordinates {
	lat: number;
	lon: number;
}

export interface DeliveryAddress {
	address: string;
	coordinates: Coordinates | null;
}

export interface ContactInfo {
	name: string;
	email: string;
	phone: string;
}

export interface Order {
	_id: string;
	products: OrderItem[];
	totalAmount: number;
	status: OrderStatus;
	deliveryAddress: DeliveryAddress;
	contactInfo: ContactInfo;
	comment?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateOrderData {
	items: {
		productId: string;
		quantity: number;
		price: number;
	}[];
	deliveryAddress: DeliveryAddress;
	contactInfo: ContactInfo;
	comment?: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	phone?: string;
	address?: string;
}

export interface Review {
	_id: string;
	user?: {
		_id: string;
		name: string;
	};
	product?: string;
	rating: number;
	comment: string;
	guestName?: string;
	images?: string[];
	createdAt: string;
	updatedAt: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData extends LoginData {
	name: string;
}

export interface AuthResponse {
	token: string;
	user: User;
} 