<script>
    import { AppBar, Avatar } from '@skeletonlabs/skeleton-svelte';
    import logo from "../assets/logo.png"
    import user from "../assets/user.png"
</script>

<AppBar background="bg-[#f8f6f7]" base="h-[80px]">
    {#snippet lead()}
        <div class="ml-5 mt-2.5 flex gap-2 items-center justify-center">
            <img src={logo} alt="logo" class="h-6">
            <p class="text-l text-black font-semibold">RedSeam Clothing</p>
        </div>
    {/snippet}
    {#snippet trail()}
        <div class="mr-10 mt-2.5 flex gap-5 align-middle">
            <img src={user} alt="user" class="h-6">
            <a href="/login" class="text-l text-black">Log In</a>
        </div>
    {/snippet}
</AppBar>

