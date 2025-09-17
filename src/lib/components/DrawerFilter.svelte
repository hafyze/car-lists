<script lang="ts">
	import { Drawer, Button } from 'flowbite-svelte';

	export let open: boolean;
	export let onApply: (filters: { 
		minPrice: number | null; 
		maxPrice: number | null;
		minMileage: number | null; 
		maxMileage: number | null;
		condition: string | null;
		brand: string | null;
		model: string | null;
		year: number | null;
		type: string | null;
		seats: number | null;
		fuel: string | null;
		drivetrain: string | null;
		wheelSize: number | null;
		warranty: boolean | null;
		features: string[];
	}) => void;
	export let brands: string[] = [];
	let minPrice: number | null = null;
	let maxPrice: number | null = null;
	let minMileage: number | null = null;
	let maxMileage: number | null = null;
	let condition: string | null = null;
	let brand: string | null = null;
	let model: string | null = null;
	let year: number | null = null;
	let type: string | null = null;
	let seats: number | null = null;
	let fuel: string | null = null;
	let drivetrain: string | null = null;
	let wheelSize: number | null = null;
	let warranty: boolean | null = null;
	let features: string[] = [];

	function applyFilters() {
		onApply({
			minPrice,
			maxPrice,
			minMileage,
			maxMileage,
			condition,
			brand,
			model,
			year,
			type,
			seats,
			fuel,
			drivetrain,
			wheelSize,
			warranty,
			features
		});
		open = false;
	}
	
	function resetFilters() {
		brand = null;
		model = null;
		minPrice = null;
		maxPrice = null;
		maxMileage = null;
		condition = null;
		year = null;
		type = null;
		seats = null;
		fuel = null;
		drivetrain = null;
		wheelSize = null;
		warranty = null;
		features = [];
	}
</script>

<Drawer bind:open aria-labelledby="drawer-label">
	<h5 id="drawer-label" class="mb-4 inline-flex items-center text-base font-semibold text-gray-500">
		Advanced Filter
	</h5>

	<div class="space-y-4">
		<!-- Brand -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Brand</span>
			<select class="rounded border px-2 py-1" bind:value={brand}>
				<option value="">Any</option>
				{#each brands as b}
					<option value={b}>{b}</option>
				{/each}
			</select>
		</label>
		<!-- Model -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Model</span>
			<input
				type="text"
				class="rounded border px-2 py-1"
				bind:value={model}
				placeholder="e.g. G30 530e"
			/>
		</label>
		<!-- Price -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Min Price</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={minPrice}
				placeholder="e.g. 20000"
			/>
		</label>
		<label class="flex flex-col">
			<span class="text-sm font-medium">Max Price</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={maxPrice}
				placeholder="e.g. 200000"
			/>
		</label>

		<!-- Mileage -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Max Mileage (KM)</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={maxMileage}
				placeholder="e.g. 80000"
			/>
		</label>

		<!-- Condition -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Condition</span>
			<select class="rounded border px-2 py-1" bind:value={condition}>
				<option value="">Any</option>
				<option value="New">New</option>
				<option value="Used">Used</option>
			</select>
		</label>

		<!-- Year -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Year</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={year}
				placeholder="e.g. 2022"
			/>
		</label>

		<!-- Type -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Type</span>
			<select class="rounded border px-2 py-1" bind:value={type}>
				<option value="">Any</option>
				<option value="Sedan">Sedan</option>
				<option value="SUV">SUV</option>
				<option value="Coupe">Coupe</option>
				<option value="Wagon">Wagon</option>
			</select>
		</label>

		<!-- Seats -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Seats</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={seats}
				placeholder="e.g. 5"
			/>
		</label>

		<!-- Fuel -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Fuel</span>
			<select class="rounded border px-2 py-1" bind:value={fuel}>
				<option value="">Any</option>
				<option value="Petrol">Petrol</option>
				<option value="Diesel">Diesel</option>
				<option value="Hybrid">Hybrid</option>
				<option value="Electric">Electric</option>
			</select>
		</label>

		<!-- Drivetrain -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Drivetrain</span>
			<select class="rounded border px-2 py-1" bind:value={drivetrain}>
				<option value="">Any</option>
				<option value="FWD">FWD</option>
				<option value="RWD">RWD</option>
				<option value="AWD">AWD</option>
			</select>
		</label>

		<!-- Wheel Size -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Wheel Size (inches)</span>
			<input
				type="number"
				class="rounded border px-2 py-1"
				bind:value={wheelSize}
				placeholder="e.g. 19"
			/>
		</label>

		<!-- Warranty -->
		<label class="flex items-center space-x-2">
			<input type="checkbox" bind:checked={warranty} class="rounded" />
			<span class="text-sm font-medium">With Warranty</span>
		</label>

		<!-- Features (multi-select) -->
		<label class="flex flex-col">
			<span class="text-sm font-medium">Features</span>
			<select multiple class="rounded border px-2 py-1" bind:value={features}>
				<option value="360 Camera">360 Camera</option>
				<option value="HUD">HUD</option>
				<option value="Reverse Assist">Reverse Assist</option>
				<option value="Auto Park">Auto Park</option>
				<option value="Battery Warranty-2030">Battery Warranty-2030</option>
				<option value="Warranty-2027">Warranty-2027</option>
			</select>
		</label>

		<div class="flex items-center justify-between mb-4">
			<Button class="w-1/2 bg-gray-300 text-gray-700 mx-6" onclick={resetFilters}>
				Reset
			</Button>
			<Button class="w-1/2 bg-green-600 text-white" onclick={applyFilters}>
				Apply
			</Button>
		</div>
	</div>
</Drawer>
