<script>
	export let open = false;

	function closeModal() {
		open = false;
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[60] flex items-center justify-end bg-black bg-opacity-50">
		<div class="bg-surface-100 dark:bg-surface-800 h-full w-full max-w-sm rounded-l-2xl p-6 shadow-2xl">
			<div class="flex items-center justify-between">
				<h3 class="h3 font-semibold">Shopping cart (0)</h3>
				<button on:click={closeModal} class="btn-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
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
			<div class="flex h-full flex-col items-center justify-center p-4 text-center">
				<div class="text-secondary-400">
					<svg
						class="mx-auto mb-4 h-24 w-24"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 16H9v-2h2v2zm0-4H9v-6h2v6zm6 4h-2v-2h2v2zm0-4h-2v-6h2v6z"
						></path>
						<path
							d="M17 18h-2v-2h2v2zm0-4h-2v-6h2v6z"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
					<h2 class="h2 text-xl font-bold">Ooops!</h2>
					<p class="text-surface-500">You've got nothing in your cart just yet...</p>
				</div>
				<button on:click={closeModal} class="btn mt-4 w-full bg-[#ff4000] text-white hover:bg-[#ff571f]"
					>Start shopping</button
				>
			</div>
		</div>
	</div>
{/if}