<script>
    import { goto } from '$app/navigation';
    import cartImage from '$lib/assets/cartImage.png';
    import { api } from '$lib/axios/axios.js';
    import { isLoggedIn } from '$lib/auth.js' 
    import { resolve } from '$app/paths';

    export let open = true;
    export let getCartItems;

    let cartItems = null;

    const deliveryFee = 5;

    $: subtotal = cartItems 
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;

    $: total = subtotal + deliveryFee;

    function closeModal() {
        open = false;
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

    async function updateQuantity(item, newQuantity) {
        if (newQuantity < 1) return;

        item.quantity = newQuantity;

        cartItems = [...cartItems]; 

        try {
            await api.patch(`/cart/products/${item.id}`, {
                quantity: newQuantity,
                color: item.color,
                size: item.size
            });
        } catch (error) {
            console.error(error);
            getCartItems(); 
        }
    }

    async function decreaseQuantity(item) {
        if (item.quantity > 1) {
            updateQuantity(item, item.quantity - 1);
        }
    }

    async function increaseQuantity(item) {
        updateQuantity(item, item.quantity + 1);
    }

    async function deleteItem(item) {
        try {
            await api.delete(`/cart/products/${item.id}`, {
                data: {
                    color: item.color,
                    size: item.size
                }
            });

            cartItems = cartItems.filter(
                (cartItem) =>
                    !(cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)
            );
        } catch (error) {
            console.error(error);
            getCartItems();
        }
    }

    $: {
        if ($isLoggedIn) {
            getCartItems();
        } else {
            cartItems = null;
        }
    }
</script>

{#if open}
    <div class="fixed inset-0 z-[60] flex items-center justify-end bg-black/50">
        <div class="flex h-full w-full max-w-lg flex-col bg-[#f8f6f7] p-6 shadow-2xl">
            <div class="flex h-20 items-center justify-between">
                <h3 class="h5">Shopping cart ({cartItems ? cartItems.length : 0})</h3>
                <button on:click={closeModal} class="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-label="Close"
                    >
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        ></path>
                    </svg>
                </button>
            </div>
            <div class="flex-1 overflow-y-auto pb-4">
                {#if !cartItems || cartItems.length === 0}
                    <div class="mt-20 flex h-1/2 flex-col items-center p-4 text-center">
                        <div class="flex flex-col items-center">
                            <img class="mx-auto mb-10 h-6/14 w-1/2" src={cartImage} alt="cartimg" />
                            <h2 class="mb-5 h2 text-xl font-bold">Ooops!</h2>
                            <p class="text-surface-500">You've got nothing in your cart just yet...</p>
                        </div>
                        <button
                            on:click={closeModal}
                            class="mt-4 flex h-12 w-70 items-center justify-center rounded-xl bg-[#ff4000] font-medium text-white transition-colors hover:bg-[#ff571f] disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            Start shopping
                        </button>
                    </div>
                {:else}
                    <div>
                        {#each cartItems as item (item.id + item.color + item.size)}
                            <div class="mb-4 flex items-start gap-4 rounded-lg p-4">
                                <div
                                    class="flex h-38 w-auto flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 bg-white"
                                >
                                    <img
                                        src={item.cover_image}
                                        alt="cartImg"
                                        class="max-h-full max-w-full rounded-lg object-contain p-1"
                                    />
                                </div>
                                <div class=" flex flex-grow flex-col justify-between">
                                    <div class="flex justify-between">
                                        <h3 class="text-base font-semibold text-gray-800 capitalize">{item.name}</h3>
                                        <span class="text-lg font-bold text-gray-800"
                                            >${(item.price * item.quantity)}</span
                                        >
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="text-sm text-gray-500 capitalize">{item.color}</p>
                                        <p class="mt-1 text-sm text-gray-500">{item.size}</p>
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
                                            on:click={() => deleteItem(item)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            {#if cartItems && cartItems.length > 0}
                <div class="flex-shrink-0 pt-6 bg-[#f8f6f7] space-y-3">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Items subtotal</p>
                        <p>${subtotal}</p>
                    </div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Delivery</p>
                        <p>${deliveryFee}</p>
                    </div>
                    <div class="flex justify-between text-xl font-bold text-gray-900 mb-15 pt-2">
                        <p>Total</p>
                        <p>${total}</p>
                    </div>
                    <button
                        class="px-5 mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#ff4000] text-lg text-white transition-colors hover:bg-[#ff571f]"
                        on:click={() => {
                            goto(resolve('/checkout'));
                            closeModal()
                            }}
                    >
                        Go to checkout
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}