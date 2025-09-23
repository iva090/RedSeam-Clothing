<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/axios/axios.js';
	import { page } from '$app/state';

	let selectedProduct = page.params.productId;
	let productData = null;
	let isLoading = true;
	let errorMessage = '';
    let chosenImage = ' '
	let selectedColor = '';
    let selectedSize = ''

    const colorMap = {
        'red': 'red',
        'blue': 'blue',
        'green': 'green',
        'yellow': 'yellow',
        'purple': 'purple',
        'black': 'black',
        'white': 'white',
        'navy blue': 'blue',
        'beige': '#EED9C4',
        'brown': 'brown',
        'grey': 'darkgray',
        'gray': 'darkgray',
        'pink': 'pink',
        'orange': 'orange'
    };

	async function getProductDetails() {
		isLoading = true;
		errorMessage = '';
		try {
			const response = await api.get(`/products/${selectedProduct}`);
			if (response.status === 200) {
				productData = response.data;
				console.log(productData);
                chosenImage = productData.cover_image
				if (productData.available_colors && productData.available_colors.length > 0) {
					selectedColor = productData.available_colors[0];
				}
				if (productData.sizes && productData.available_colors.sizes > 0) {
					selectedSize = productData.available_sizes[0];
				}
			}
		} catch (error) {
			errorMessage = 'Failed to load product details. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		console.log(selectedProduct);
		getProductDetails();
	});
</script>

<div class="ml-25 mr-25">
    <div class="mb-10"><a href="/listing">Listing</a> / Product</div>
    {#if productData}
        <div class="grid grid-cols-2 gap-40">
            <div class="grid grid-cols-6 gap-5">
                <div class="col-span-1">
                    {#each productData.images as Image}
                        <button on:click={() => (chosenImage = Image)}>
                            <img src={Image} alt={'image'} class="mb-2 shadow-md" />
                        </button>
                    {/each}
                </div>
                <img
                    src={chosenImage}
                    alt={productData.name}
                    class="col-span-5 h-auto w-full rounded-lg shadow-xl"
                />
            </div>
            <div class="w-full">
                <h1 class="mb-2 text-4xl font-bold capitalize text-[#10151f]">{productData.name}</h1>
                <p class="mb-4 text-2xl font-semibold text-[#10151f]">$ {productData.price}</p>
                <div class="product-details-container">
                    <div class="color-picker-container mb-4">
                        <h3 class="mb-2 mt-10 text-lg font-medium">Color: {selectedColor}</h3>
                        <div class="flex items-center gap-2">
                            {#each productData.available_colors as color}
                                <button
                                    on:click={() => (selectedColor = color)}
                                    class="h-8 w-8 rounded-full border-2 border-transparent transition-all duration-200
                                        {selectedColor === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''}"
                                >
                                    {#if color.toLowerCase() === 'multi'}
                                        <div
                                            class="h-full w-full rounded-full"
                                            style="background-image: linear-gradient(45deg, #ff0000, #ff7b00, #f5ff00, #40ff00, #00fff2, #0055ff, #c300ff, #ff00c3);"
                                        ></div>
                                    {:else}
                                        <div
                                            class="h-full w-full rounded-full"
                                            style={`background: ${colorMap[color.toLowerCase()] || 'transparent'}`}
                                        ></div>
                                    {/if}
                                </button>
                            {/each}
                        </div>
                        <div>
                            {#if productData}
                                <h3 class="mb-2 mt-10 text-lg font-medium">Size: {selectedSize}</h3>
                            {:else}
                                <h3>
                                    No Available Sizes
                                </h3>
                            {/if}
                        </div>
                    </div>
                </div>
                <p class="leading-relaxed text-gray-600">
                    This is a placeholder description for the product. In a real-world application, this
                    content would be fetched from the API along with the other product details. It would
                    provide more information about the product's features, materials, and use cases.
                </p>
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