<script>
    import { onMount } from 'svelte';
    import { api } from '$lib/axios/axios.js';

    let products = [];
    let errorMessage = '';
    let isLoading = true;
    let filterOpen = false;
    let minPrice = '';
    let maxPrice = '';
    let currentPage = 1;
    let lastPage = 1;
    let totalProducts = 0;

    async function getProducts(page = 1) {
        isLoading = true;
        errorMessage = '';
        try {
            const params = { page };
            if (minPrice) {
                params.minPrice = minPrice;
            }
            if (maxPrice) {
                params.maxPrice = maxPrice;
            }
            const response = await api.get('/products', { params });
            if (response.status === 200) {
                products = response.data.data;
                lastPage = response.data.meta.last_page;
                totalProducts = response.data.meta.total;
                console.log('Products fetched successfully:', products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            errorMessage = 'Failed to load products. Please try again later.';
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        getProducts(currentPage);
    });

    function toggleFilter() {
        filterOpen = !filterOpen;
    }

    function handleApply() {
        getProducts(currentPage);
        filterOpen = false;
    }

    function goToPage(page) {
        if (page >= 1 && page <= lastPage) {
            currentPage = page;
            getProducts(currentPage);
        }
    }

    function getPaginationRange() {
        const range = [];

        range.push(1);

        let left = Math.max(2, currentPage - 2);
        let right = Math.min(lastPage - 1, currentPage + 2);

        if (left > 2) {
            range.push('...');
        }
        
        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < lastPage - 1) {
            range.push('...');
        }
        if (lastPage > 1 && !range.includes(lastPage)) {
            range.push(lastPage);
        }

        return range;
    }
</script>

<svelte:window on:click={() => (filterOpen = false)} />

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
            <button class="flex items-center gap-1">
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
        </div>
    </div>

    {#if isLoading}
        <div class="py-10 text-center">
            <p class="text-gray-500">Loading products...</p>
        </div>
    {:else if errorMessage}
        <div class="py-10 text-center">
            <p class="text-red-500">{errorMessage}</p>
        </div>
    {:else if products.length > 0}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {#each products as product}
                <div class="flex flex-col items-start text-left">
                    <img
                        src={product.cover_image}
                        alt={product.name}
                        class="mb-2 h-auto w-full rounded-md object-cover shadow-sm"
                    />
                    <p class="text-sm font-medium capitalize text-[#10151f]">{product.name}</p>
                    <p class="text-sm text-[#10151f]">${product.price}</p>
                </div>
            {/each}
        </div>
        
        <div class="flex items-center justify-center mt-15 space-x-2 mb-20">
            <button
                on:click={() => goToPage(currentPage - 1)}
                class="flex items-center justify-center w-10 h-10 border-none text-gray-500"
            >
            &lt
            </button>

            {#each getPaginationRange() as page}
                {#if page === '...'}
                    <span class="w-10 h-10 flex items-center border-2 border-gray-200 rounded-md justify-center text-gray-900">...</span>
                {:else}
                    <button
                        on:click={() => goToPage(page)}
                        class="flex items-center justify-center w-10 h-10 rounded-md border-2 border-{currentPage === page ? "[#ff4000]" : "gray-200"} text-sm font-medium"
                        class:bg-[white]={currentPage === page}
                        class:text-[#ff4000]={currentPage === page}
                        class:text-gray-700={currentPage !== page}
                    >
                        {page}
                    </button>
                {/if}
            {/each}

            <button
                on:click={() => goToPage(currentPage + 1)}
                class="flex items-center justify-center w-10 h-10 border-none text-gray-900"
            >
            &gt;
            </button>
        </div>
    {:else}
        <div class="py-10 text-center">
            <p class="text-gray-500">No products found.</p>
        </div>
    {/if}
</div>
