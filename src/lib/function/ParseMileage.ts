function parseMileage(mileage: string): number {
	if (!mileage) return 0;

	// Remove non-digit/K/M characters
	let str = mileage
		.toUpperCase()
		.replace(/[^0-9KM]/g, '')
		.trim();

	let value = 0;

	if (str.includes('K')) {
		value = parseFloat(str.replace('K', '')) * 1000;
	} else {
		value = parseFloat(str);
	}

	return isNaN(value) ? 0 : value;
}
