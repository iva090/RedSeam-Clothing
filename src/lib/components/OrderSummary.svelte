<script>
    export let cartItems;
    export let subtotal;
    export let total;
    export let deliveryFee;
    export let updateCartItem;
    export let deleteCartItem;
    export let handleSubmit;

    const decreaseQuantity = (item) => updateCartItem(item, item.quantity - 1);
    const increaseQuantity = (item) => updateCartItem(item, item.quantity + 1);
</script>

<div class="col-span-1 flex h-full min-h-0 flex-col">
    {#if cartItems}
        <div class="mb-4 min-h-0 flex-grow overflow-y-auto pr-4">
            {#each cartItems as item (item.id + item.color + item.size)}
                <div class="mb-4 flex items-start gap-4 rounded-lg">
                    <div
                        class="flex h-38 w-auto flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 bg-white"
                    >
                        <img
                            src={item.cover_image}
                            alt="cartImg"
                            class="max-h-full max-w-full rounded-lg object-contain p-1"
                        />
                    </div>

                    <div class="mt-2 flex flex-grow flex-col justify-between">
                        <div class="flex justify-between">
                            <h3 class="text-base font-semibold text-gray-800 capitalize">{item.name}</h3>
                            <span class="text-lg font-bold text-gray-800"
                                >${(item.price * item.quantity).toFixed(2)}</span
                            >
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm text-gray-500 capitalize">{item.color}</p>
                            <p class="mt-1 mb-1 text-sm text-gray-500">{item.size}</p>
                        </div>

                        <div class="flex justify-between">
                            <div
                                class="mt-2 flex h-8 w-24 items-center justify-around rounded-full border border-gray-300 py-1"
                            >
                                <button
                                    class="text-lg text-gray-600"
                                    on:click={() => decreaseQuantity(item)}
                                    disabled={item.quantity === 1}>-</button
                                >
                                <span class="text-sm">{item.quantity}</span>
                                <button on:click={() => increaseQuantity(item)} class="text-lg text-gray-600"
                                    >+</button
                                >
                            </div>
                            <button
                                class="mt-2 font-semibold text-gray-500"
                                on:click={() => deleteCartItem(item)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="flex-shrink-0 pt-6">
            <div class="space-y-3">
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Items subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Delivery</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                </div>
                <div class="mb-15 flex justify-between pt-2 text-xl font-bold text-gray-900">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <button
                    on:click={handleSubmit}
                    class="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#ff4000] px-5 text-lg text-white transition-colors hover:bg-[#ff571f] disabled:opacity-50"
                    disabled={cartItems === null || cartItems.length === 0}
                >
                    Pay
                </button>
            </div>
        </div>
    {:else}
        <p>Loading cart...</p>
    {/if}
</div>