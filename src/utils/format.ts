export const formatPhoneNumber = (value: string) => {
	const numbers = value.replace(/\D/g, '');
	if (numbers.length === 0) return '';
	const limitedNumbers = numbers.slice(0, 10);
	if (limitedNumbers.length <= 3) {
		return `+7 (${limitedNumbers}`;
	} else if (limitedNumbers.length <= 6) {
		return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3)}`;
	} else if (limitedNumbers.length <= 8) {
		return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6)}`;
	} else {
		return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6, 8)}-${limitedNumbers.slice(8)}`;
	}
}; 