export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface OrderItem {
	product: string;
	quantity: number;
	price: number;
}

export interface Order {
	_id: string;
	items: OrderItem[];
	totalAmount: number;
	status: 'pending' | 'processing' | 'completed' | 'cancelled';
	name: string;
	phone: string;
	address: string;
	comment?: string;
	createdAt: string;
}

export interface ContactInfo {
	address: string;
	phone: string;
	email: string;
	workingHours: string;
}

export interface User {
	_id: string;
	email: string;
	name: string;
	role: 'user' | 'admin';
} 