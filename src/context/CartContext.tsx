import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/types';

interface CartContextType {
	items: CartItem[];
	total: number;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				const parsedCart = JSON.parse(savedCart);
				return Array.isArray(parsedCart) ? parsedCart : [];
			}
		} catch (error) {
			console.error('Error loading cart from localStorage:', error);
		}
		return [];
	});

	const total = React.useMemo(
		() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
		[items]
	);

	useEffect(() => {
		try {
			localStorage.setItem('cart', JSON.stringify(items));
		} catch (error) {
			console.error('Error saving cart to localStorage:', error);
		}
	}, [items]);

	const addToCart = (product: Product) => {
		setItems(prevItems => {
			const existingItem = prevItems.find(item => item.product._id === product._id);
			if (existingItem) {
				return prevItems.map(item =>
					item.product._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: string) => {
		setItems(prevItems => prevItems.filter(item => item.product._id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity < 1) return;
		setItems(prevItems =>
			prevItems.map(item =>
				item.product._id === productId
					? { ...item, quantity }
					: item
			)
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	return (
		<CartContext.Provider value={{
			items,
			total,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart
		}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}; 