<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { api } from '$lib/axios/axios.js';
    import { goto } from '$app/navigation';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { page } from '$app/stores';

    export let getCartItems;
    let products = [];
    let errorMessage = '';
    let isLoading = true;
    let filterOpen = false;
    let sortOpen = false;
    let minPrice = '';
    let maxPrice = '';
    let currentPage = 1;
    let lastPage = 1;
    let totalProducts = 0;
    let sortOption = null;

    $: {
        const urlParams = new URLSearchParams($page.url.search);
        currentPage = parseInt(urlParams.get('page')) || 1;
        sortOption = urlParams.get('sort') || null;
        minPrice = urlParams.get('filter[price_from]') || '';
        maxPrice = urlParams.get('filter[price_to]') || '';
        getProducts(currentPage);
    }

    async function getProducts(page = 1) {
        isLoading = true;
        errorMessage = '';
        try {
            const params = { page };
            if (minPrice) {
                params['filter[price_from]'] = minPrice;
            }
            if (maxPrice) {
                params['filter[price_to]'] = maxPrice;
            }
            if (sortOption) {
                params.sort = sortOption;
            }
            const response = await api.get('/products', { params });
            if (response.status === 200) {
                products = response.data.data;
                lastPage = response.data.meta.last_page;
                totalProducts = response.data.meta.total;
            }
        } catch (error) {
            errorMessage = 'Failed to load products. Please try again later.';
        } finally {
            isLoading = false;
        }
    }

    function updateUrl(newPage = currentPage, newSort = sortOption, newMinPrice = minPrice, newMaxPrice = maxPrice) {
        const url = new URL($page.url);
        url.searchParams.set('page', newPage);
        if (newSort) {
            url.searchParams.set('sort', newSort);
        } else {
            url.searchParams.delete('sort');
        }
        if (newMinPrice) {
            url.searchParams.set('filter[price_from]', newMinPrice);
        } else {
            url.searchParams.delete('filter[price_from]');
        }
        if (newMaxPrice) {
            url.searchParams.set('filter[price_to]', newMaxPrice);
        } else {
            url.searchParams.delete('filter[price_to]');
        }
        goto(url.toString(), { replaceState: true });
    }

    function toggleFilter() {
        filterOpen = !filterOpen;
        if (filterOpen) {
            sortOpen = false;
        }
    }

    function toggleSort() {
        sortOpen = !sortOpen;
        if (sortOpen) {
            filterOpen = false;
        }
    }

    function handleApply() {
        updateUrl(1, sortOption, minPrice, maxPrice);
        filterOpen = false;
    }

    function goToPage(page) {
        if (page >= 1 && page <= lastPage) {
            updateUrl(page, sortOption, minPrice, maxPrice);
        }
    }

    function handleSort(option) {
        sortOption = option;
        sortOpen = false;
        updateUrl(1, sortOption, minPrice, maxPrice);
    }

    function viewProductDetails(productId) {
        goto(`/listing/${productId}`);
    }

    getCartItems = async () => {
        try {
            const response = await api.get('/cart');
            if (response.status === 200) {
                cartItems = response.data;
            }
        } catch (error) {
            console.error(error);
        }
    };

    onMount(() => {
        getCartItems()
    })
</script>

<svelte:window on:click={() => { filterOpen = false; sortOpen = false; }} />

<div class="ml-25 mr-25">
    <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Products</h1>
        <div class="flex items-center space-x-4 text-sm font-medium text-gray-700 relative">
            {#if totalProducts > 0}
                <p class="mr-4 text-gray-500">Showing {currentPage} of {lastPage} results</p>
            {/if}
            <button on:click|stopPropagation={toggleFilter} class="flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M5.25 6H5.25m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9.75 6h.008M18.75 12h.008m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M5.25 12H5.25m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9.75 6h.008M18.75 18h.008m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M5.25 18H5.25m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
                    />
                </svg>
                Filter
            </button>
            {#if filterOpen}
                <div on:click|stopPropagation class="absolute top-full right-0 mt-2 z-50 bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                    <h2 class="mb-4 text-xl font-bold">Select price</h2>
                    <div class="mb-4 flex gap-4">
                        <input
                            type="number"
                            bind:value={minPrice}
                            class="w-1/2 p-2 border rounded-md"
                            placeholder="From"
                        />
                        <input
                            type="number"
                            bind:value={maxPrice}
                            class="w-1/2 p-2 border rounded-md"
                            placeholder="To"
                        />
                    </div>
                    <button on:click={handleApply} class="w-full py-2 bg-[#ff4000] text-white font-semibold rounded-lg">
                        Apply
                    </button>
                </div>
            {/if}
            <div class="h-6 border-r border-gray-300"></div>
            <button on:click|stopPropagation={toggleSort} class="flex items-center gap-1">
                Sort by
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {#if sortOpen}
                <div on:click|stopPropagation class="absolute top-full right-0 mt-2 z-50 bg-white p-2 rounded-lg shadow-xl w-48">
                    <ul class="space-y-1">
                        <li>
                            <button on:click={() => handleSort('price')} class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Price: Low to High</button>
                        </li>
                        <li>
                            <button on:click={() => handleSort('-price')} class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Price: High to Low</button>
                        </li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>

    {#if products.length > 0}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {#each products as product (product.id)}
                <ProductCard {product} onviewDetails={() => viewProductDetails(product.id)} />
            {/each}
        </div>
        <Pagination {currentPage} {lastPage} {goToPage} />
    {:else if isLoading}
        <div class="py-10 text-center">
            <p class="text-gray-500">Loading products...</p>
        </div>
    {:else if errorMessage}
        <div class="py-10 text-center">
            <p class="text-red-500">{errorMessage}</p>
        </div>
    {:else}
        <div class="py-10 text-center">
            <p class="text-gray-500">No products found.</p>
        </div>
    {/if}
</div>