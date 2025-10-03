import { getCars } from '$lib/server/db';
import type { CarSpec } from '$lib/types/car';

export const load = async () => {
	const cars = await getCars();
    console.log("cars", cars)
	return {
		cars: cars as CarSpec[]
	};
};
