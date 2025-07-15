export const ORDER_STATUS_MAP = {
	'pending': 'Ожидает',
	'processing': 'Собираем',
	'on_the_way': 'В пути',
	'completed': 'Завершён',
	'cancelled': 'Отменён',
};

export type OrderStatus = keyof typeof ORDER_STATUS_MAP;

export const getOrderStatusInRussian = (status: OrderStatus): string => {
	return ORDER_STATUS_MAP[status] || status;
}; 