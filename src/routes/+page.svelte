<script lang="ts">
	import { Card, Button, Checkbox } from 'flowbite-svelte';
	let cars = [
		{
			id: 1,
			condition: 'Used',
			brand: 'BMW',
            year: 2022,
			model: 'G30 530e',
			price: '100000-180000',
			fuel: 'Hybrid',
			hp: 248,
			img: '/image/bmw-530e.jpg'
		},
		{
			id: 2,
			condition: 'New',
			brand: 'Jaecoo',
            year: 2025,
			model: 'J7',
			price: '138000-158000',
			fuel: 'Petrol or Hybrid',
			hp: 194,
			img: '/image/jaecoo.jpg'
		}
	];
	let selectedForCompare: number[] = [];

	const toggleCompare = (id: number) => {
		if (selectedForCompare.includes(id)) {
			selectedForCompare = selectedForCompare.filter((x) => x !== id);
		} else {
			selectedForCompare.push(id);
		}
	};
</script>

<!-- Filter/Search Panel -->
<section class="bg-gray-50 p-4">
	<input type="text" placeholder="Search car..." class="w-full rounded border p-2" />
</section>

<!-- Car Listing -->
<section class="flex flex-col gap-4 p-4">
	{#each cars as car}
		<Card class="flex flex-col items-center gap-4 sm:flex-row">
            <img src={car.img} alt={car.model} class="w-full sm:w-40 h-32 object-contain rounded" />
			<div class="min-w-0 flex-1">
				<h3 class="truncate text-lg font-bold">{car.year} {car.brand} {car.model}</h3>
                <p class="truncate text-sm">Condition: {car.condition} </p>
				<p class="truncate text-sm">Price range: RM {car.price}</p>
				<p class="truncate text-sm">Fuel: {car.fuel} | HP: {car.hp}</p>
			</div>

			<Checkbox
				checked={selectedForCompare.includes(car.id)}
				onchange={() => toggleCompare(car.id)}
			>
				Compare
			</Checkbox>
		</Card>
	{/each}
</section>

<!-- Compare Button -->
{#if selectedForCompare.length >= 2}
	<section class="p-4 text-center">
		<Button color="light">Compare {selectedForCompare.length} Cars</Button>
	</section>
{/if}
