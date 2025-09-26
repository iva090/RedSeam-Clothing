<script>
    //@ts-nocheck
	import { goto } from "$app/navigation";


    let { open } = $props(); 

    function close() {
        open = false
        goto('/listing')
    }
</script>

{#if open}
    <div
        class="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
        on:click={close}
    >
        <div
            class="relative mx-auto my-6 h-1/2 w-1/2"
            on:click|stopPropagation
        >
            <div
                class="relative flex w-full flex-col rounded-xl border-0 bg-white shadow-2xl outline-none focus:outline-none"
            >
                <div class="p-10 text-center">
                    <svg
                        class="mx-auto mb-4 h-30 w-16 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                    </svg>
                    <h3 class="text-3xl font-bold text-gray-800">Order Placed!</h3>
                    <p class="mt-4 text-gray-600">
                        Your order is placed successfully!
                    </p>
                </div>
                <div class="flex items-center justify-center rounded-b p-6">
                    <button
                        on:click={close}
                        class="rounded-xl bg-[#ff4000] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#ff571f] focus:outline-none"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed inset-0 z-50 bg-black opacity-40" />
{/if}