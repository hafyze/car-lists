<script lang="ts">
	import DrawerFilter from '$lib/components/DrawerFilter.svelte';
	import { Card, Button, Checkbox } from 'flowbite-svelte';
	import { Fuel, Cog, Car, Users, Circle, Droplet, Funnel } from 'lucide-svelte';
	import { CaretDownSolid, CaretUpSolid, FilterDollarOutline, FilterDollarSolid,  } from 'flowbite-svelte-icons'
	import type { PageData } from "./$types";
  	import type { CarSpec } from "$lib/types/car";
	import { onMount } from 'svelte';

	export let data: PageData;
	let cars: CarSpec[] = data.cars;
	let filteredCars: CarSpec[] = [...cars];

	onMount(() => {
		console.log("Cars: ", cars)
	})
	const conditionColors: Record<string, string> = {
		New: 'bg-green-100 text-green-800',
		Used: 'bg-yellow-100 text-yellow-800',
		Recon: 'bg-blue-100 text-blue-800'
	};

	let sortOrder: 'low' | 'high' = 'low';

	// reactive sorted array
	$: sortedCars = [...filteredCars].sort((a, b) =>
		sortOrder === 'high' ? b.price - a.price : a.price - b.price
	);

	let selectedBrand: string | null = null;
	let isOpen = false;
	let openFilter = false;

	const brands = Array.from(new Set(cars.map((car) => car.brand)));

	function handleApply(filters: any) {
		filteredCars = cars.filter((car) => {
			// Number filters
			if (filters.minPrice != null && car.price < filters.minPrice) return false;
			if (filters.maxPrice != null && car.price > filters.maxPrice) return false;
			if (filters.minMileage != null && parseMileage(car.mileage) < filters.minMileage)
				return false;
			if (filters.maxMileage != null && parseMileage(car.mileage) > filters.maxMileage)
				return false;

			// String filters (only apply if not empty)
			if (filters.condition && filters.condition !== '' && car.condition !== filters.condition)
				return false;
			if (filters.brand && filters.brand !== '' && car.brand !== filters.brand) return false;
			if (filters.model && filters.model !== '' && car.model !== filters.model) return false;
			if (filters.type && filters.type !== '' && car.bodyType !== filters.type) return false;
			if (filters.fuel && filters.fuel !== '' && car.fuel !== filters.fuel) return false;
			if (filters.drivetrain && filters.drivetrain !== '' && car.drivetrain !== filters.drivetrain)
				return false;

			// Number fields
			if (filters.year != null && car.year !== filters.year) return false;
			if (filters.seats != null && car.seats !== filters.seats) return false;
			if (filters.wheelSize != null && car.wheelSize !== filters.wheelSize) return false;

			// Boolean filter
			if (filters.warranty != null && filters.warranty && !car.warranty) return false;

			// Features (array)
			if (filters.features && filters.features.length > 0) {
				for (const feat of filters.features) {
					if (!car.features.includes(feat)) return false;
				}
			}

			return true;
		});
	}
</script>

<svelte:head>
	<title>Apis Special Selection</title>
</svelte:head>

<!-- Main Title -->
<section class="p-4 md: text-center">
	<h1 class="font-serif text-2xl font-bold text-gray-800 sm:text-3xl">Apis Special Selection</h1>
</section>

<!-- Brand Filter Buttons -->
<div class="flex items-center gap-4 px-4 md:flex-row md:justify-center">
	<div class="relative mx-2 w-64">
		<button
			class="flex w-full items-center justify-between rounded-full border bg-white px-3 py-2"
			on:click={() => (isOpen = !isOpen)}
		>
			{#if selectedBrand}
				<div class="flex items-center gap-2">
					<img
						src={`/image/${selectedBrand.toLowerCase()}.png`}
						alt={selectedBrand}
						class="h-5 w-5"
					/>
					<span>{selectedBrand}</span>
				</div>
			{:else}
				<span class="text-gray-500">Select a brand</span>
			{/if}
			<span class="ml-auto">▼</span>
		</button>

		<!-- Dropdown menu -->
		{#if isOpen}
			<div class="absolute z-10 mt-1 w-full rounded border bg-white shadow">
				{#each brands as brand}
					<button
						type="button"
						class="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 focus:outline-none"
						on:click={() => {
							selectedBrand = brand;
							isOpen = false;
						}}
					>
						<img src={`/image/${brand.toLowerCase()}.png`} alt={brand} class="h-5 w-5" />
						<span>{brand}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<Button onclick={() => (openFilter = true)} class="rounded-full bg-gray-500 px-2 py-2 text-white">
		<Funnel /> Filter
	</Button>
</div>

<!-- {#if selectedBrand != null}
	<Button onclick={() => (selectedBrand = null)} size="xs">Reset</Button>
{/if} -->

<DrawerFilter bind:open={openFilter} onApply={handleApply} {brands} />

<!-- Filter + Reset + Sort Row -->
<section class="flex items-center justify-between px-4 py-2 bg-gray-50">
	<button
		class="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-2 hover:bg-gray-300"
		title="sort by price"
		on:click={() => (sortOrder = sortOrder === 'high' ? 'low' : 'high')}
	>
		<FilterDollarOutline class="" />
		{#if sortOrder === 'high'}
			<CaretDownSolid class="" />
		{:else}
			<CaretUpSolid class="" />
		{/if}
	</button>

	<div class="flex items-center gap-2">
		{#if selectedBrand != null}
			<Button onclick={() => (selectedBrand = null)} size="xs">Reset</Button>
		{/if}
	</div>
</section>

<section class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each sortedCars.filter((car) => !selectedBrand || car.brand === selectedBrand) as car}
		<Card
			class="relative flex flex-col items-start gap-4 rounded-lg p-4 shadow-md transition-shadow duration-200 hover:shadow-lg "
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
					<h2 class="truncate text-xl font-bold text-green-600">
						RM{car.price.toLocaleString()}
					</h2>
					<p class="text-sm text-gray-500">Mileage: {car.mileage}</p>
				</div>

				<!-- Model & Condition -->
				<div class="mb-2">
					<h3 class="truncate text-lg font-semibold">
						{car.brand}
						{car.model}
						{car.engine?.displacement?.toFixed(1) ?? 'N/A'}cc ({car.year})
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
						Fuel: {car.fuel} | {car.engine?.displacement}cc, {car.engine?.power}HP, {car.engine?.torque}Nm					</p>
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
						<Car class="mr-2 h-4 w-4 text-gray-600" /> Body Type: {car.bodyType}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Users class="mr-2 h-4 w-4 text-gray-600" /> Seats: {car.seats}
					</p>
					<p class="flex items-center text-sm text-gray-500">
						<Circle class="mr-2 h-4 w-4 text-gray-600" /> Wheel Size: {car.wheelSize} inch
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
