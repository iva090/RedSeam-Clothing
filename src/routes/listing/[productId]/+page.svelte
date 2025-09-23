<script>
    import { onMount } from 'svelte';
    import { api } from '$lib/axios/axios.js';
    import { goto } from '$app/navigation';
	import { page } from '$app/state';

    let selectedProduct = page.params.productId;
    let productData = null
    let isLoading = true;
    let errorMessage = '';

    async function getProductDetails() {
        isLoading = true;
        errorMessage = '';
        try {
            const response = await api.get(`/products/${selectedProduct}`);
            if (response.status === 200) {
                productData = response.data;
            }
        } catch (error) {
            errorMessage = 'Failed to load product details. Please try again.';
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        console.log(selectedProduct)
        getProductDetails();
    });


</script>

<div class="ml-25 mr-25">
    <div class="mb-10"><a href="/listing">Listing</a> / Product</div>
    {#if productData}
        <div class="grid grid-cols-2 gap-40">
            <div class="">
                <img src={productData.cover_image} alt={productData.name} class="w-full h-auto rounded-lg shadow-xl" />
            </div>
            <div class="w-full">
                <h1 class="text-4xl font-bold text-[#10151f] mb-2 capitalize">{productData.name}</h1>
                <p class="text-2xl text-[#10151f] font-semibold mb-4">$ {productData.price}</p>
                <p class="text-gray-600 leading-relaxed">
                    This is a placeholder description for the product. In a real-world application, this content would be fetched from the API along with the other product details. It would provide more information about the product's features, materials, and use cases.
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