<script>
    export let isLoading = false;
    export let onAddToCart = () => {};

</script>

<div class="mt-13">
    <button
        type="button"
        on:click={onAddToCart}
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