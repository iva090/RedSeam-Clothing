<script>
    export let product;
</script>

<div class="flex flex-col items-start text-left">
    <img
        src={product.cover_image}
        alt={product.name}
        class="mb-2 h-auto w-full rounded-md object-cover shadow-md"
    />
    <p class="text-sm font-medium capitalize text-[#10151f]">{product.name}</p>
    <p class="text-sm text-[#10151f]">${product.price}</p>
</div>