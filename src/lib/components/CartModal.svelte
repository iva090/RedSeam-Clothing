<script>
	import cartImage from '$lib/assets/cartImage.png';
	export let open = false;

	function closeModal() {
		open = false;
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[60] flex items-center justify-end bg-black/50">
		<div class="h-full w-full max-w-lg bg-[#f8f6f7] p-6 shadow-2xl">
			<div class="flex h-10 items-center justify-between">
				<h3 class="h5">Shopping cart (0)</h3>
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
			<div class="mt-20 flex h-1/2 flex-col items-center p-4 text-center">
				<div class="flex flex-col items-center">
					<img class="mx-auto h-6/14 w-1/2 mb-10" src={cartImage} alt="cartimg" />
					<h2 class="h2 text-xl font-bold mb-5">Ooops!</h2>
					<p class="text-surface-500">You've got nothing in your cart just yet...</p>
				</div>
				<button
					on:click={closeModal}
					class="w-70 mt-4 flex h-12 items-center justify-center rounded-xl bg-[#ff4000] font-medium text-white transition-colors hover:bg-[#ff571f] disabled:cursor-not-allowed disabled:bg-gray-400"
				>
					Start shopping
				</button>
			</div>
		</div>
	</div>
{/if}
