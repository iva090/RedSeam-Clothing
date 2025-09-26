<script>
	import { userEmail } from '$lib/auth.js';
	import { api } from '$lib/axios/axios.js';
	import { onMount } from 'svelte';

	$: formData.email = $userEmail || '';

	export let open = true;
	export let getCartItems;

	let formData = {
		name: '',
		surname: '',
		email: $userEmail || '',
		address: '',
		zip: ''
	};

	let errors = {
		name: '',
		surname: '',
		email: '',
		address: '',
		zip: ''
	};

	let notificationMessage = '';

	let cartItems = null;

	const deliveryFee = 5;

	$: subtotal = cartItems
		? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
		: 0;

	$: total = subtotal + deliveryFee;

	function showNotification(message, duration = 3000) {
		notificationMessage = message;
		setTimeout(() => {
			notificationMessage = '';
		}, duration);
	}

	getCartItems = async () => {
		try {
			const response = await api.get('/cart');
			if (response.status === 200) {
				cartItems = response.data;
			}
		} catch (error) {
			console.error('Error fetching cart items:', error);
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
			console.error('Error updating item quantity:', error);
			getCartItems();
		}
	}

	async function decreaseQuantity(item) {
		if (item.quantity > 1) {
			await updateQuantity(item, item.quantity - 1);
		}
	}

	async function increaseQuantity(item) {
		await updateQuantity(item, item.quantity + 1);
	}

	async function deleteItem(item) {
		if (cartItems && cartItems.length <= 1) {
			showNotification('You must keep at least one item in the cart.', 4000);
			return;
		}

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
			console.error('Error deleting item:', error);
			getCartItems();
		}
	}

	function validateForm() {
		let isValid = true;
		let newErrors = { name: '', surname: '', email: '', address: '', zip: '' };

		const isRequired = (value, fieldName) => {
			if (!value.trim()) {
				newErrors[fieldName] =
					`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
				isValid = false;
			}
		};

		isRequired(formData.name, 'name');
		isRequired(formData.surname, 'surname');
		isRequired(formData.address, 'address');

		isRequired(formData.email, 'email');
		if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Invalid email format.';
			isValid = false;
		}

		isRequired(formData.zip, 'zip');
		if (formData.zip.trim() && !/^\d{5,10}$/.test(formData.zip)) {
			newErrors.zip = 'Zip code must be 5 to 10 digits.';
			isValid = false;
		}

		errors = newErrors;
		return isValid;
	}

	async function handleSubmit() {
		if (validateForm()) {
            try{
                const response = await api.post('/cart/checkout', formData)
                if (response.status === 200){
                    console.log(response.status)
                }
            } catch(error) {
                console.error(error)
            }
		} else {
			showNotification('Please correct the errors in the order details.', 4000);
		}
	}

	onMount(() => {
		getCartItems();
	});
</script>

{#if notificationMessage}
	<div
		class="fixed top-0 left-1/2 z-50 mt-4 -translate-x-1/2 rounded-lg bg-yellow-100 p-4 text-yellow-800 shadow-xl"
	>
		{notificationMessage}
	</div>
{/if}
 
<div class="p-24 py-1">
	<h1 class="mb-10 text-4xl font-semibold">Checkout</h1>

	<div class="grid-rows 2 grid h-[75vh] grid-cols-3 items-start gap-35">
		<form
			on:submit|preventDefault={handleSubmit}
			class="col-span-2 grid h-full grid-cols-2 rounded-2xl bg-[#f8f6f7] p-10 shadow-sm"
		>
			<div class="col-span-1 row-span-1">
				<p class="mt-7 mb-7 h5 font-bold text-gray-500">Order details</p>
				<div class="grid grid-cols-2 gap-x-5">
					<div>
						<input
							placeholder="Name"
							bind:value={formData.name}
							class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.name
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.name}
							<p class="mb-4 text-sm text-red-500">{errors.name}</p>
						{/if}
					</div>
					<div>
						<input
							placeholder="Surname"
							bind:value={formData.surname}
							class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.surname
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.surname}
							<p class="mb-4 text-sm text-red-500">{errors.surname}</p>
						{/if}
					</div>
				</div>
				<div class="relative mt-5 mb-5">
					<svg
						class="absolute top-[25px] left-3 -translate-y-1/2 text-gray-900"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"
						/>
					</svg>
					<input
						placeholder="Email"
						type="email"
						bind:value={formData.email}
						class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.email
							? 'border-red-500'
							: ''}"
					/>
					{#if errors.email}
						<p class="mb-4 text-sm text-red-500">{errors.email}</p>
					{/if}
				</div>
				<div class="grid grid-cols-2 gap-x-5">
					<div>
						<input
							placeholder="Address"
							bind:value={formData.address}
							class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.address
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.address}
							<p class="mb-4 text-sm text-red-500">{errors.address}</p>
						{/if}
					</div>
					<div>
						<input
							placeholder="Zip code"
							type="text"
							bind:value={formData.zip}
							class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.zip
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.zip}
							<p class="mb-4 text-sm text-red-500">{errors.zip}</p>
						{/if}
					</div>
				</div>
			</div>
		</form>

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
										on:click={() => deleteItem(item)}
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
	</div>
</div>
