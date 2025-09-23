<script>
    export let currentPage;
    export let lastPage;
    export let goToPage;

    function getPaginationRange() {
        const range = [];
        range.push(1);
        let left = Math.max(2, currentPage - 1);
        let right = Math.min(lastPage - 1, currentPage + 1);
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

<div class="flex items-center justify-center mt-15 mb-20 space-x-2">
    <button
        on:click={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        class="flex items-center justify-center w-10 h-10 border-none text-gray-500"
    >
        &lt;
    </button>
    {#each getPaginationRange() as page}
        {#if page === '...'}
            <span class="w-10 h-10 flex items-center border-2 rounded-md border-gray-200 justify-center text-gray-900">...</span>
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
        disabled={currentPage === lastPage}
        class="flex items-center justify-center w-10 h-10 border-none text-gray-900"
    >
        &gt;
    </button>
</div>