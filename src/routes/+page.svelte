<script lang="ts">
	import { Card, Button, Checkbox } from 'flowbite-svelte';

	const conditionColors: Record<string, string> = {
		New: 'bg-green-100 text-green-800',
		Used: 'bg-yellow-100 text-yellow-800',
		Recon: 'bg-blue-100 text-blue-800'
	};

	let cars = [
		{
			id: 1,
			condition: 'Used',
			brand: 'BMW',
			year: 2022,
			model: 'G30 530e',
			type: 'Sedan',
			price: 183000,
			fuel: 'Hybrid',
			mileage: '10-15K (KM)',
			img: '/image/bmw-530e.jpg',
			link: 'https://www.carlist.my/listings/details?id=17574198&controller=used-cars-for-sale-malaysia&slug=bmw-530e-2-0-a-m-sport-lci-original-facelift-full-service-record-12k-under-warranty-until-2027-battery-warranty-until-2030-local-bmw-unit',
			drivetrain: 'RWD',
			engine: { displacement: 2.0, cylinders: 4, hp: 248, nm: 350 }
		},
		{
			id: 2,
			condition: 'New',
			brand: 'Jaecoo',
			year: 2025,
			model: 'J7',
			type: 'SUV',
			price: 138000,
			fuel: 'Petrol',
			mileage: '0 (KM)',
			img: '/image/jaecoo-j7.jpg',
			link: 'https://www.omodajaecoo.com.my/modelj7',
			drivetrain: 'FWD',
			engine: { displacement: 1.6, cylinders: 4, hp: 194, nm: 290 }
		},
		{
			id: 3,
			condition: 'Recon',
			brand: 'BMW',
			year: 2019,
			model: 'G30 523i',
			type: 'Wagon',
			price: 168000,
			fuel: 'Petrol',
			mileage: '30-35K(KM)',
			img: '/image/bmw-523i.jpg',
			link: 'https://www.carlist.my/listings/details?id=17773470&controller=recon-cars-for-sale-malaysia&slug=2019-bmw-523i-2-0-m-sport-full-spec-free-6-year-warranty',
			drivetrain: 'FWD',
			engine: { displacement: 2.0, cylinders: 4, hp: 250, nm: 290 }
		},
		{
			id: 4,
			condition: 'New',
			brand: 'Jaecoo',
			year: 2025,
			model: 'J7 PHEV',
			type: 'SUV',
			price: 158000,
			fuel: 'Hybrid',
			mileage: '0 (KM)',
			img: '/image/jaecoo-j7.jpg',
			link: 'https://www.omodajaecoo.com.my/modelj7phev',
			drivetrain: 'FWD',
			engine: { displacement: 1.5, cylinders: 4, hp: 346, nm: 525 }
		},
		{
			id: 5,
			condition: 'New',
			brand: 'Omoda',
			year: 2025,
			model: 'C9',
			type: 'SUV',
			price: 168000,
			fuel: 'Petrol',
			mileage: '0 (KM)',
			img: '/image/omoda-c9.jpg',
			link: 'https://www.omodajaecoo.com.my/modelc9',
			drivetrain: 'FWD',
			engine: { displacement: 2.0, cylinders: 4, hp: 257, nm: 400 }
		},
        {
			id: 6,
			condition: 'New',
			brand: 'Proton',
			year: 2025,
			model: 'S70',
			type: 'Sedan',
			price: 89800,
			fuel: 'Petrol',
			mileage: '0 (KM)',
			img: '/image/proton-s70.jpg',
			link: 'https://www.proton.com/en/models/protons70',
			drivetrain: 'FWD',
			engine: { displacement: 1.5, cylinders: 3, hp: 150, nm: 226 }
		}
	];
	let sortOrder: 'high' | 'low' = 'high';

	// reactive sorted array
	$: sortedCars = [...cars].sort((a, b) =>
		sortOrder === 'high' ? b.price - a.price : a.price - b.price
	);

	let selectedForCompare: number[] = [];
	let selectedBrand: string | null = null;

	const toggleCompare = (id: number) => {
		if (selectedForCompare.includes(id)) {
			selectedForCompare = selectedForCompare.filter((x) => x !== id);
		} else {
			selectedForCompare.push(id);
		}
	};

	const brands = Array.from(new Set(cars.map((car) => car.brand)));
</script>

<!-- Brand Filter Buttons -->
<section class="flex flex-wrap gap-2 bg-gray-50 p-4">
    <h2 class="w-full font-semibold">Brand Filter</h2>
	{#each brands as brand}
		<Button
			color={selectedBrand === brand ? 'dark' : 'light'}
			onclick={() => (selectedBrand = selectedBrand === brand ? null : brand)}
			size="sm"
		>
			<img
				src={`/image/${brand.toLowerCase()}.png`}
				alt={brand}
				class=" max-h-8 max-w-13"
			/>
			<!-- {#if brand !== 'Jaecoo' && brand !== 'Omoda' && brand !== 'Proton'}
				{brand}
			{/if} -->
		</Button>
	{/each}
</section>

<!-- Sort Button -->
<section class="flex gap-2 bg-gray-50 p-4">
	<button
		class="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
		on:click={() => (sortOrder = sortOrder === 'high' ? 'low' : 'high')}
	>
		Sort Price: {sortOrder === 'high' ? 'High → Low' : 'Low → High'}
	</button>
</section>

<section class="flex flex-col gap-4 p-4">
	{#each sortedCars.filter((car) => !selectedBrand || car.brand === selectedBrand) as car}
		<Card
			class="flex flex-col items-start gap-4 rounded-lg p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:flex-row"
		>
			<!-- Car Image -->
			<img src={car.img} alt={car.model} class="h-32 w-full rounded-lg object-contain sm:w-40" />

			<!-- Car Info -->
			<div class="flex min-w-0 flex-1 flex-col justify-between">
				<!-- Price & Model -->
				<div class="mb-2">
					<h2 class="mb-1 truncate text-xl font-bold text-green-600">
						RM{car.price.toLocaleString()}
					</h2>
					<h3 class="truncate text-lg font-semibold">{car.brand} {car.model} ({car.year})</h3>
					<p class="mt-1 text-sm">
						Condition:
						<span
							class={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${conditionColors[car.condition]}`}
						>
							{car.condition}
						</span>
					</p>
				</div>

				<!-- Engine Info -->
				<div class="mb-2">
					<p class="text-sm font-semibold">Engine:</p>
					<p class="pl-1 text-sm text-gray-700">
						Fuel: {car.fuel} | {car.engine.displacement}cc, {car.engine.hp}HP, {car.engine.nm}Nm, {car
							.engine.cylinders} Cylinders
					</p>
				</div>

				<!-- Mileage -->
				<p class="mb-2 text-sm text-gray-500">Mileage: {car.mileage}</p>

				<!-- Link -->
				<a
					href={car.link}
					target="_blank"
					class="inline-block w-max rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-blue-700"
				>
					Page Link
				</a>
			</div>
		</Card>
	{/each}
</section>
