import { Product } from '../types';

// Реальные картинки для каждой категории (по 20 на категорию)
const cakeImages = [
	'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
	'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500',
	'https://images.unsplash.com/photo-1535140728328-98d2f6f9b2c1?w=500',
	'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=500',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=501',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=502',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=503',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=504',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=505',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=506',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=507',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=508',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=509',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=510',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=511',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=512',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=513',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=514',
	'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=515',
];
const pastryImages = [
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
	'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=500',
	'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
	'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=501',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=502',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=503',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=504',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=505',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=506',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=507',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=508',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=509',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=510',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=511',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=512',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=513',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=514',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=515',
	'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=516',
];
const cookiesImages = [
	'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=501',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=502',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=503',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=504',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=505',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=506',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=507',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=508',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=509',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=510',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=511',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=512',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=513',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=514',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=515',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=516',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=517',
	'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=518',
];
const dessertImages = [
	'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=501',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=502',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=503',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=504',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=505',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=506',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=507',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=508',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=509',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=510',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=511',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=512',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=513',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=514',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=515',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=516',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=517',
	'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=518',
];

const generateProducts = (): Product[] => {
	const products: Product[] = [];
	let id = 1;

	// Торты (20 позиций)
	const cakes = [
		'Наполеон', 'Шоколадный', 'Красный бархат', 'Медовик', 'Прага',
		'Тирамису', 'Чизкейк', 'Морковный', 'Птичье молоко', 'Сметанник',
		'Пралине', 'Фруктовый', 'Кофейный', 'Лимонный', 'Кокосовый',
		'Миндальный', 'Фисташковый', 'Клубничный', 'Малиновый', 'Шоколадный мусс'
	];
	cakes.forEach((name, index) => {
		products.push({
			_id: String(id++),
			name: `Торт "${name}"`,
			description: `Классический торт "${name}" с нежным кремом и декором`,
			price: 1299 + Math.floor(Math.random() * 500),
			image: cakeImages[index],
			category: 'cake'
		});
	});

	// Выпечка (20 позиций)
	const pastries = [
		'Эклеры', 'Круассаны', 'Пирожные "Картошка"', 'Буше', 'Профитроли',
		'Крем-брюле', 'Тарт Татен', 'Штрудель', 'Кулебяка', 'Пирог с яблоками',
		'Пирог с вишней', 'Пирог с творогом', 'Пирог с капустой', 'Пирог с мясом',
		'Пирог с курицей', 'Пирог с грибами', 'Пирог с рыбой', 'Пирог с картошкой',
		'Пирог с капустой и яйцом', 'Пирог с зеленью'
	];
	pastries.forEach((name, index) => {
		products.push({
			_id: String(id++),
			name,
			description: `Свежая выпечка "${name}" из натуральных ингредиентов`,
			price: 199 + Math.floor(Math.random() * 300),
			image: pastryImages[index],
			category: 'pastry'
		});
	});

	// Печенье (20 позиций)
	const cookies = [
		'Макаруны', 'Овсяное', 'Шоколадное', 'Имбирное', 'Миндальное',
		'Кокосовое', 'Ванильное', 'Лимонное', 'Медовое', 'Ореховое',
		'Коричное', 'Курабье', 'Песочное', 'Масляное', 'Творожное',
		'Сдобное', 'Сахарное', 'Шоколадное с орехами', 'Кокосовое с шоколадом',
		'Миндальное с какао'
	];
	cookies.forEach((name, index) => {
		products.push({
			_id: String(id++),
			name,
			description: `Домашнее печенье "${name}"`,
			price: 299 + Math.floor(Math.random() * 200),
			image: cookiesImages[index],
			category: 'cookies'
		});
	});

	// Десерты (20 позиций)
	const desserts = [
		'Тирамису', 'Чизкейк', 'Панакота', 'Мусс', 'Панна-котта',
		'Крем-брюле', 'Тарт', 'Эклер', 'Профитроль', 'Буше',
		'Картошка', 'Трубочка', 'Корзиночка', 'Пралине', 'Трюфель',
		'Птичье молоко', 'Зефир', 'Мармелад', 'Пастила', 'Рахат-лукум'
	];
	desserts.forEach((name, index) => {
		products.push({
			_id: String(id++),
			name,
			description: `Классический десерт "${name}"`,
			price: 399 + Math.floor(Math.random() * 400),
			image: dessertImages[index],
			category: 'dessert'
		});
	});

	return products;
};

export const products = generateProducts(); 