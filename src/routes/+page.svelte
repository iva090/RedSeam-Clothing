<script>
	import { onMount } from "svelte";
    import Products from "./products/+page.svelte"
	import { goto } from "$app/navigation";
    onMount(() => {
        goto('/products')
    });
</script>

<main>
    
</main>
