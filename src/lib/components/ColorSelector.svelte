<script>
    export let variants = [];
    export let selectedVariant = {};
    export let onSelectColor = (variant) => {};

    const colorMap = {
        red: 'red',
        blue: 'lightblue',
        green: 'green',
        yellow: 'yellow',
        purple: 'purple',
        black: 'black',
        white: '#f5f5f5',
        'navy blue': 'blue',
        beige: '#EED9C4',
        brown: 'brown',
        grey: 'darkgray',
        gray: 'darkgray',
        pink: 'pink',
        orange: 'orange',
        maroon: 'darkred',
        peach: 'lightpink',
        'off white': '#E7E0D3',
        mauve: '#8c727f',
        magenta: 'magenta',
        cream: '#dddbd3',
        khaki: 'lightgreen'
    };
</script>

<div class="color-picker-container mb-4">
    <h3 class="mb-2 mt-10 text-lg font-medium">Color: {selectedVariant.color}</h3>
    <div class="flex items-center gap-2">
        {#each variants as variant}
            <button
                on:click={() => onSelectColor(variant)}
                class="h-8 w-8 rounded-full border-2 border-transparent transition-all duration-200
                {selectedVariant.color === variant.color
                    ? 'ring-2 ring-gray-400 ring-offset-2'
                    : ''}"
            >
                {#if variant.color.toLowerCase() === 'multi'}
                    <div
                        class="h-full w-full rounded-full"
                        style="background-image: linear-gradient(45deg, #ff0000, #ff7b00, #f5ff00, #40ff00, #00fff2, #0055ff, #c300ff, #ff00c3);"
                    ></div>
                {:else}
                    <div
                        class="h-full w-full rounded-full"
                        style={`background: ${colorMap[variant.color.toLowerCase()] || 'transparent'}`}
                    ></div>
                {/if}
            </button>
        {/each}
    </div>
</div>