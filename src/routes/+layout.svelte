<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/logo.png';
	import '@fontsource/poppins';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<Header />

{@render children?.()}

<style>
	:global(body){
		font-family: 'Poppins', sans-serif;
		background-color:white;
		color:black;
	}
</style>