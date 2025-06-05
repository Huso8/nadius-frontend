export const ORDER_STATUS_MAP = {
	'pending': 'ожидает',
	'processing': 'в обработке',
	'completed': 'выполнен',
	'cancelled': 'отменен'
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_MAP;

export const getOrderStatusInRussian = (status: OrderStatus): string => {
	return ORDER_STATUS_MAP[status];
}; 