<script>
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { api } from '$lib/axios/axios.js';
	import { page } from '$app/state';

	let selectedProduct = page.params.productId;
	let productData = null;
	let isLoading = true;
	let errorMessage = '';
	let selectedVariant = null;
	let variants = [];
	let selectedSize = '';
	let selectedQuantity = 1;
	let dropdownOpen = false;

	const colorMap = {
		red: 'red',
		blue: 'lightblue',
		green: 'green',
		yellow: 'yellow',
		purple: 'purple',
		black: 'black',
		white: 'white',
		'navy blue': 'blue',
		beige: '#EED9C4',
		brown: 'brown',
		grey: 'darkgray',
		gray: 'darkgray',
		pink: 'pink',
		orange: 'orange',
		maroon: 'darkred',
		peach: 'lightpink',
		'off white': '#E7E0D3',
		mauve: '#8c727f',
		magenta: 'magenta',
		cream: '#dddbd3',
		khaki: 'lightgreen'
	};

	async function getProductDetails() {
		isLoading = true;
		errorMessage = '';
		try {
			const response = await api.get(`/products/${selectedProduct}`);
			if (response.status === 200) {
				productData = response.data;
				console.log(productData);

				if (productData.images && productData.available_colors) {
					variants = productData.available_colors.map((color, index) => ({
						color: color,
						image: productData.images[index]
					}));
				}

				if (variants.length > 0) {
					selectedVariant = variants[0];
				}
			}
		} catch (error) {
			errorMessage = 'Failed to load product details. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function selectQuantity(quantity) {
		selectedQuantity = quantity;
		dropdownOpen = false;
	}

	onMount(() => {
		console.log(selectedProduct);
		getProductDetails();
	});
</script>

<div class="ml-25 mr-25 mb-10">
	<div class="mb-10"><a href="/listing">Listing</a> / Product</div>
	{#if selectedVariant}
		<div class="grid grid-cols-2 gap-50">
			<div class="grid grid-cols-6 gap-5">
				<div class="col-span-1">
					{#each variants as variant}
						<button
							class="transition-transform duration-200 hover:scale-105"
							on:click={() => (selectedVariant = variant)}
						>
							<img src={variant.image} alt={'image'} class="mb-2 shadow-md" />
						</button>
					{/each}
				</div>
				<img
					src={selectedVariant.image}
					alt={productData.name}
					class="col-span-5 w-fit  w-full rounded-lg shadow-xl"
				/>
			</div>
			<div class="h-full w-full">
				<h1 class="mb-2 text-4xl font-bold capitalize text-[#10151f]">{productData.name}</h1>
				<p class="mb-4 text-2xl font-semibold text-[#10151f]">$ {productData.price}</p>
				<div class="product-details-container">
					<div class="color-picker-container mb-4">
						<h3 class="mb-2 mt-10 text-lg font-medium">Color: {selectedVariant.color}</h3>
						<div class="flex items-center gap-2">
							{#each variants as variant}
								<button
									on:click={() => (selectedVariant = variant)}
									class="h-8 w-8 rounded-full border-2 border-transparent transition-all duration-200
                                        {selectedVariant.color === variant.color
										? 'ring-2 ring-gray-400 ring-offset-2'
										: ''}"
								>
									{#if variant.color.toLowerCase() === 'multi'}
										<div
											class="h-full w-full rounded-full"
											style="background-image: linear-gradient(45deg, #ff0000, #ff7b00, #f5ff00, #40ff00, #00fff2, #0055ff, #c300ff, #ff00c3);"
										></div>
									{:else}
										<div
											class="h-full w-full rounded-full"
											style={`background: ${colorMap[variant.color.toLowerCase()] || 'transparent'}`}
										></div>
									{/if}
								</button>
							{/each}
						</div>
					</div>
					<div>
						{#if productData.available_sizes}
							<h3 class="mb-2 mt-10 text-lg font-medium">Size: {selectedSize}</h3>
							<div class="flex">
								{#each productData.available_sizes as Size}
									<button
										class="align-center mr-2 flex h-9 w-10 items-center justify-center rounded-lg border px-7 text-sm font-medium text-gray-700 shadow-sm transition-transform duration-200 hover:scale-105
										{selectedSize === Size 
										? 'border-gray-500 bg-gray-100'
										: 'border-gray-300'}"
										on:click={() => (selectedSize = Size)}>{Size}</button
									>
								{/each}
							</div>
						{:else}
							<h3>No Available Sizes</h3>
						{/if}
					</div>
					<div>
						<h3 class="mb-2 mt-10 text-lg font-medium">Quantity</h3>
						<div class="relative inline-block text-left">
							<button
								on:click={toggleDropdown}
								type="button"
								class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
							>
								{selectedQuantity}
								<svg
									class="-mr-1 ml-2 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							{#if dropdownOpen}
								<div
									class="absolute z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
								>
									<div class="py-1">
										{#each Array(10)
											.fill()
											.map((_, i) => i + 1) as quantity}
											<button
												on:click={() => selectQuantity(quantity)}
												class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												{quantity}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
					<div class="mt-13">
						<button
							type="button"
							on:click={handleLogin}
							disabled={isLoading}
							class="h-15 mt-4 flex w-full items-center justify-center rounded-xl bg-[#ff4000] font-medium text-white transition-colors hover:bg-[#ff571f] disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							<svg
								class="mr-3"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path
									fill="none"
									stroke="currentColor"
									stroke-linecap="square"
									stroke-width="2"
									d="M1 2h3l3 11l-1 4h15M7 21a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm14 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7 13h12l3-9H4.545z"
								/></svg
							>
							{isLoading ? 'Adding to cart' : 'Add to cart'}
						</button>
					</div>
				</div>
				<hr class="mt-13 mb-6 h-2 text-gray-300" />
				<div class="card">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-semibold">Details</h3>
						<img src={productData.brand.image} alt="Branding" class="w-24 h-auto" />
					</div>

					<div class="space-y-2 text-surface-500">
						<p>
							<span class="">Brand:</span> {productData.brand.name}
						</p>
						<p>
							{productData.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	{:else if isLoading}
		<div class="py-10 text-center">
			<p class="text-gray-500">Loading product details...</p>
		</div>
	{:else if errorMessage}
		<div class="py-10 text-center">
			<p class="text-red-500">{errorMessage}</p>
		</div>
	{:else}
		<div class="py-10 text-center">
			<p class="text-gray-500">Product not found.</p>
		</div>
	{/if}
</div>
