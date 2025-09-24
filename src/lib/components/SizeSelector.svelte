<script>
    export let availableSizes = [];
    export let selectedSize = '';
    export let onSelectSize = (size) => {};
</script>

<div>
    {#if availableSizes}
        <h3 class="mb-2 mt-10 text-lg font-medium">Size: {selectedSize}</h3>
        <div class="flex">
            {#each availableSizes as size}
                <button
                    class="align-center mr-2 flex h-9 w-10 items-center justify-center rounded-lg border px-7 text-sm font-medium text-gray-700 shadow-sm transition-transform duration-200 hover:scale-105
                    {selectedSize === size ? 'border-gray-500 bg-gray-100' : 'border-gray-300'}"
                    on:click={() => onSelectSize(size)}>{size}</button
                >
            {/each}
        </div>
    {:else}
        <h3>No Available Sizes</h3>
    {/if}
</div>