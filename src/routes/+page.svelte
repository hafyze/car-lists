<script lang="ts">
	import { Card, Button, Checkbox } from 'flowbite-svelte';
	import { Fuel, Cog, Car, Users, Circle, Droplet } from 'lucide-svelte';

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
			seats: 5,
			price: 183000,
			fuel: 'Hybrid',
			fuel_consumption: '2.3l/100km',
			mileage: '12K (KM)',
			img: '/image/bmw-530e.jpg',
			link: 'https://www.carlist.my/listings/details?id=17574198&controller=used-cars-for-sale-malaysia&slug=bmw-530e-2-0-a-m-sport-lci-original-facelift-full-service-record-12k-under-warranty-until-2027-battery-warranty-until-2030-local-bmw-unit',
			drivetrain: 'RWD',
			wheel_size: 19,
			engine: { displacement: 2.0, cylinders: 4, hp: 248, nm: 350 },
			warranty: true,
			features: [
				'360 Camera',
				'Warranty-2027',
				'Battery Warranty-2030',
				'Auto Park',
				'Reverse Assist',
				'HUD'
			]
		},
		{
			id: 2,
			condition: 'New',
			brand: 'Jaecoo',
			year: 2025,
			model: 'J7',
			type: 'SUV',
			seats: 5,
			price: 138000,
			fuel: 'Petrol',
			fuel_consumption: '7.7l/100km',
			mileage: '0 (KM)',
			img: '/image/jaecoo-j7.jpg',
			link: 'https://www.omodajaecoo.com.my/modelj7',
			drivetrain: 'FWD',
			wheel_size: 19,
			engine: { displacement: 1.6, cylinders: 4, hp: 194, nm: 290 },
			warranty: true,
			features: ['360 Camera', 'HUD', 'Power Boot']
		},
		{
			id: 3,
			condition: 'Recon',
			brand: 'BMW',
			year: 2019,
			model: 'G30 523i',
			type: 'Wagon',
			seats: 5,
			price: 168000,
			fuel: 'Petrol',
			fuel_consumption: '5.8l/100km',
			mileage: '30-35K(KM)',
			img: '/image/bmw-523i.jpg',
			link: 'https://www.carlist.my/listings/details?id=17773470&controller=recon-cars-for-sale-malaysia&slug=2019-bmw-523i-2-0-m-sport-full-spec-free-6-year-warranty',
			drivetrain: 'RWD',
			wheel_size: 19,
			engine: { displacement: 2.0, cylinders: 4, hp: 250, nm: 290 },
			warranty: true,
			features: ['360 Camera', '6-Year Warranty', 'HUD', 'BSM']
		},
		{
			id: 4,
			condition: 'New',
			brand: 'Jaecoo',
			year: 2025,
			model: 'J7 PHEV',
			type: 'SUV',
			seats: 5,
			price: 158000,
			fuel: 'Hybrid',
			fuel_consumption: '4.7l/100km',
			mileage: '0 (KM)',
			img: '/image/jaecoo-j7.jpg',
			link: 'https://www.omodajaecoo.com.my/modelj7phev',
			drivetrain: 'FWD',
			wheel_size: 19,
			engine: { displacement: 1.5, cylinders: 4, hp: 346, nm: 525 },
			warranty: true,
			features: ['360 Camera', '1200KM Drive Range', 'HUD']
		},
		{
			id: 5,
			condition: 'New',
			brand: 'Omoda',
			year: 2025,
			model: 'C9',
			type: 'SUV',
			seats: 5,
			price: 168000,
			fuel: 'Petrol',
			fuel_consumption: '8.2l/100km',
			mileage: '0 (KM)',
			img: '/image/omoda-c9.jpg',
			link: 'https://www.omodajaecoo.com.my/modelc9',
			drivetrain: 'FWD',
			wheel_size: 20,
			engine: { displacement: 2.0, cylinders: 4, hp: 257, nm: 400 },
			warranty: true,
			features: ['360 Camera', 'CDC Suspension', 'Wireless phone charge', 'Power Boot', 'HUD']
		},
		{
			id: 6,
			condition: 'New',
			brand: 'Proton',
			year: 2025,
			model: 'S70 Flagship',
			type: 'Sedan',
			seats: 5,
			price: 89800,
			fuel: 'Petrol',
			fuel_consumption: '6.4l/100km',
			mileage: '0 (KM)',
			img: '/image/proton-s70.jpg',
			link: 'https://www.proton.com/en/models/protons70',
			drivetrain: 'FWD',
			wheel_size: 17,
			engine: { displacement: 1.5, cylinders: 3, hp: 150, nm: 226 },
			warranty: true,
			features: ['360 Camera', 'Remote Engine Start']
		},
		{
			id: 7,
			condition: 'Recon',
			brand: 'Mercedes',
			year: 2020,
			model: 'CLA200D',
			type: 'Wagon',
			seats: 5,
			price: 175000,
			fuel: 'Diesel',
			fuel_consumption: '4.9l/100km',
			mileage: '35-40K (KM)',
			img: '/image/mercedes-cla200d.jpg',
			link: 'https://www.carlist.my/recon-cars/2020-mercedes-benz-cla200d-2-0-amg-shooting-brake-full-spec-free-6-year-warranty/16742616',
			drivetrain: 'FWD',
			wheel_size: 18,
			engine: { displacement: 2.0, cylinders: 4, hp: 150, nm: 320 },
			warranty: true,
			features: ['360 Camera', '6-Year Warranty', 'HUD', 'Sunroof', 'Power Boot', 'Park Assist']
		},
		{
			id: 8,
			condition: 'Recon',
			brand: 'Toyota',
			year: 2021,
			model: 'Harrier Z',
			type: 'SUV',
			seats: 5,
			price: 172000,
			fuel: 'Petrol',
			fuel_consumption: '6.5l/100km',
			mileage: '9K (KM)',
			img: '/image/toyota-harrier.jpg',
			link: 'https://www.carlist.my/recon-cars/9k-km-only-2021-toyota-harrier-2-0-z-black-interior-jbl-sound-system-360-camera-bsm-dim-full-spec-view-to-believe/17875844',
			drivetrain: 'FWD',
			wheel_size: 18,
			engine: { displacement: 2.0, cylinders: 4, hp: 150, nm: 320 },
			warranty: true,
			features: ['360 Camera', 'BSM', 'HUD', 'Power Boot', '3 Drive-mode']
		},
		{
			id: 9,
			condition: 'New',
			brand: 'Honda',
			year: 2025,
			model: 'Civic e:hev RS',
			type: 'Sedan',
			seats: 5,
			price: 162900,
			fuel: 'Hybrid',
			fuel_consumption: '4.0l/100km',
			mileage: '0K (KM)',
			img: '/image/honda-civic.jpg',
			link: 'https://www.carlist.my/new-cars/2025-honda-civic-2-0-ehev-rs-sedan-facelift-aug-merdeka-deal-7k-high-discount-max-loan-low-down-payment-door-to-door-ready-stock/13642652',
			drivetrain: 'FWD',
			wheel_size: 18,
			engine: { displacement: 2.0, cylinders: 4, hp: 181, nm: 315 },
			warranty: true,
			features: ['Left-lane Watch', 'BSM', '3 Drive-mode']
		},
		{
			id: 10,
			condition: 'New',
			brand: 'Honda',
			year: 2025,
			model: 'Civic RS',
			type: 'Sedan',
			seats: 5,
			price: 149990,
			fuel: 'Petrol',
			fuel_consumption: '6.3l/100km',
			mileage: '0K (KM)',
			img: '/image/honda-civic.jpg',
			link: 'https://www.carlist.my/new-cars/2025-honda-civic-1-5-rs-vtec-sedan-merdeka-cash-rebates-7k-stok-cepat-book-now/16135283',
			drivetrain: 'FWD',
			wheel_size: 18,
			engine: { displacement: 1.5, cylinders: 4, hp: 180, nm: 240 },
			warranty: true,
			features: ['Left-lane Watch', 'BSM', '3 Drive-mode']
		}
	];
	let sortOrder: 'high' | 'low' = 'high';

	// reactive sorted array
	$: sortedCars = [...cars].sort((a, b) =>
		sortOrder === 'high' ? b.price - a.price : a.price - b.price
	);

	let selectedForCompare: number[] = [];
	let selectedBrand: string | null = null;

	// const toggleCompare = (id: number) => {
	// 	if (selectedForCompare.includes(id)) {
	// 		selectedForCompare = selectedForCompare.filter((x) => x !== id);
	// 	} else {
	// 		selectedForCompare.push(id);
	// 	}
	// };

	const brands = Array.from(new Set(cars.map((car) => car.brand)));
</script>

<!-- Brand Filter Buttons -->
<section class="flex flex-wrap gap-2 bg-gray-50 p-4">
	<h2 class="w-full font-semibold">Brand Filter</h2>
	{#each brands as brand}
		<Button
			class={`flex items-center gap-1 rounded-sm px-3 py-1 text-sm
        ${
					selectedBrand === brand
						? 'bg-blue-200 text-white hover:bg-blue-600'
						: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
				}`}
			onclick={() => (selectedBrand = selectedBrand === brand ? null : brand)}
			size="sm"
		>
			<img src={`/image/${brand.toLowerCase()}.png`} alt={brand} class=" max-h-8 max-w-13" />
			<!-- {#if brand !== 'Jaecoo' && brand !== 'Omoda' && brand !== 'Proton'}
				{brand}
			{/if} -->
		</Button>
	{/each}
	{#if selectedBrand != null}
		<Button onclick={() => (selectedBrand = null)} size="xs">Reset</Button>
	{/if}
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
			class="relative flex flex-col items-start gap-4 rounded-lg p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:flex-row"
		>
			<!-- Warranty Badge -->
			{#if car.warranty}
				<span
					class="absolute top-2 right-2 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-md"
				>
					Warranty
				</span>
			{/if}

			<!-- Car Image -->
			<img src={car.img} alt={car.model} class="h-32 w-full rounded-lg object-contain sm:w-40" />

			<!-- Car Info -->
			<div class="flex min-w-0 flex-1 flex-col justify-between">
				<!-- Price & Mileage Row -->
				<div class="mb-2 flex items-center justify-between">
					<h2 class="text-xl font-bold text-green-600">
						RM{car.price.toLocaleString()}
					</h2>
					<p class="ml-auto pl-20 text-sm text-gray-500">Mileage: {car.mileage}</p>
				</div>

				<!-- Model & Condition -->
				<div class="mb-2">
					<h3 class="truncate text-lg font-semibold">
						{car.brand}
						{car.model}
						{car.engine.displacement.toFixed(1)}cc ({car.year})
					</h3>
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
				<div class="mb-1">
					<p class="text-sm font-semibold">Engine:</p>
					<p class="pl-1 text-sm text-gray-700">
						Fuel: {car.fuel} | {car.engine.displacement}cc, {car.engine.hp}HP, {car.engine.nm}Nm,
						{car.engine.cylinders} Cylinders
					</p>
				</div>

				<hr />

				<!-- General Info -->
				<div class="my-2 space-y-1">
					<p class="flex items-center text-sm text-gray-500">
						<Fuel class="mr-2 h-4 w-4 text-gray-600" /> Fuel: {car.fuel}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Cog class="mr-2 h-4 w-4 text-gray-600" /> Drivetrain: {car.drivetrain}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Car class="mr-2 h-4 w-4 text-gray-600" /> Body Type: {car.type}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Users class="mr-2 h-4 w-4 text-gray-600" /> Seats: {car.seats}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Circle class="mr-2 h-4 w-4 text-gray-600" /> Wheel Size: {car.wheel_size} inch
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Droplet class="mr-2 h-4 w-4 text-gray-600" /> Fuel consumption: {car.fuel_consumption}
					</p>
				</div>

				{#if car.features?.length}
					<div class="my-2 flex flex-wrap gap-2">
						{#each car.features as feature}
							<span
								class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm"
							>
								{feature}
							</span>
						{/each}
					</div>
				{/if}
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
