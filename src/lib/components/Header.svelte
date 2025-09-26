<script>
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import logo from '../assets/logo.png';
	import user from '$lib/assets/user.png';
	import { isLoggedIn, userAvatar } from '$lib/auth';
	import { goto } from '$app/navigation';
	import CartModal from './CartModal.svelte';

	let dropdownOpen = false;
	let isCartModalOpen = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown(event) {
		if (!event.target.closest('#user-menu-button')) {
			dropdownOpen = false;
		}
	}

	function logOut() {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('userData');
		}
		location.reload();
		isLoggedIn.set(false);
		userAvatar.set(null);
		dropdownOpen = false;
	}

	function openCartModal() {
		isCartModalOpen = true;
	}
</script>

<svelte:window on:click={closeDropdown} />

<AppBar background="bg-[#f8f6f7]" base="h-[80px] mt-3">
	{#snippet lead()}
		<div class="ml-20 flex items-center gap-2">
			<a href="/listing">
				<img src={logo} alt="logo" class="h-6" />
			</a>
			<p class="text-l font-semibold text-black">RedSeam Clothing</p>
		</div>
	{/snippet}

	{#snippet trail()}
		{#if $isLoggedIn === true}
			<div class="mr-20 flex items-center gap-5">
				<button on:click={openCartModal}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425z"
						></path>
					</svg>
				</button>
				<div class="relative inline-block text-left">
					<div class="flex items-center">
						<img
							on:click={() => goto('/listing')}
							class="h-6 w-6 cursor-pointer rounded-full object-cover"
							src={$userAvatar ? $userAvatar : user}
							alt="userAvatar"
						/>
						<button
							type="button"
							on:click|stopPropagation={toggleDropdown}
							class="inline-flex items-center justify-center rounded-full"
							id="user-menu-button"
							aria-expanded={dropdownOpen}
							aria-haspopup="true"
						>
							<svg
								class="h-6 w-6 text-gray-400"
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
					</div>

					{#if dropdownOpen}
						<div
							class="absolute right-0 z-50 mt-2 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
						>
							<div class="py-1" role="none">
								<button
									on:click={logOut}
									class="block px-5 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
									tabindex="-1"
									id="menu-item-0"
								>
									Log out
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div class="mr-20 flex items-center gap-5">
				<img src={user} alt="user" class="h-6" />
				<a href="/login" class="text-l text-black">Log In</a>
			</div>
		{/if}
	{/snippet}
</AppBar>

<CartModal bind:open={isCartModalOpen}/>
