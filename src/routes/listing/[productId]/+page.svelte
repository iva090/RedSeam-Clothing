<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { api } from '$lib/axios/axios.js';
    import { page } from '$app/state';

    import ColorSelector from '$lib/components/ColorSelector.svelte';
    import SizeSelector from '$lib/components/SizeSelector.svelte';
    import AddToCart from '$lib/components/AddToCart.svelte';
    import { isLoggedIn } from '$lib/auth';

    let product = parseInt(page.params.productId);
    let productData = null;
    let isLoading = true;
    let errorMessage = '';
    let selectedVariant = null;
    let variants = [];
    let selectedSize = '';
    let selectedQuantity = 1;
    let dropdownOpen = false;
    let isAddingToCart = false;
    let cartMessage = ''; // Renamed from cardMessage for clarity

    async function getProductDetails() {
        isLoading = true;
        errorMessage = '';
        if (isLoggedIn) {
            try {
                const response = await api.get(`/products/${product}`);
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

                    if (productData.available_sizes && productData.available_sizes.length > 0) {
                        selectedSize = productData.available_sizes[0];
                    }
                }
            } catch (error) {
                errorMessage = 'Failed to load product details. Please try again.';
            } finally {
                isLoading = false;
            }
        } else {
            alert('Please log in first');
        }
    }

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function selectQuantity(quantity) {
        selectedQuantity = quantity;
        dropdownOpen = false;
    }

    async function handleAddToCart() {
        if (!isLoggedIn) {
            alert('Please log in to add items to your cart.');
            return;
        }

        isAddingToCart = true;
        try {
            const request = {
                quantity: parseInt(selectedQuantity),
                color: selectedVariant.color.toLowerCase(),
                size: selectedSize
            };
            console.log(request);
            const response = await api.post(`/cart/products/${product}`, request);
            if (response.status === 200) {
                console.log(response);
                cartMessage = "This item has been added"; // Updated variable name
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Corrected setTimeout syntax
            }
        } catch (error) {
            console.error(error);
        }
        isAddingToCart = false;
    }

    onMount(() => {
        getProductDetails(); // Corrected: Added parentheses to execute the function
    });
</script>

<div class="ml-25 mr-25 mb-10">
    <div class="mb-10"><a href="/listing">Listing</a> / Product</div>
    {#if selectedVariant}
        <div class="gap-50 grid grid-cols-2">
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
                    class="col-span-5 w-fit w-full rounded-lg shadow-xl"
                />
            </div>
            <div class="h-full w-full">
                <h1 class="mb-2 text-4xl font-bold capitalize text-[#10151f]">{productData.name}</h1>
                <p class="mb-4 text-2xl font-semibold text-[#10151f]">$ {productData.price}</p>
                <div class="product-details-container">
                    <ColorSelector
                        {variants}
                        bind:selectedVariant
                        onSelectColor={(variant) => (selectedVariant = variant)}
                    />
                    <SizeSelector
                        availableSizes={productData.available_sizes}
                        bind:selectedSize
                        onSelectSize={(size) => (selectedSize = size)}
                    />
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
                    <AddToCart isLoading={isAddingToCart} onAddToCart={handleAddToCart} bind:message={cartMessage}/>
                </div>
                <hr class="mt-13 mb-6 h-2 text-gray-300" />
                <div class="card">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold">Details</h3>
                        <img src={productData.brand.image} alt="Branding" class="h-auto w-24 shadow-lg" />
                    </div>

                    <div class="text-surface-500 space-y-2">
                        <p>
                            <span class="">Brand:</span>
                            {productData.brand.name}
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