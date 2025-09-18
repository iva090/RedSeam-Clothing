<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/logo.png';
	import '@fontsource/poppins';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

{@render children?.()}

<style>
	:global(body){
 		font-family: 'Poppins', sans-serif;
		background-color: #f8f6f7;
	}
</style>