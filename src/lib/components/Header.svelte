<script>
    import { AppBar, Avatar } from '@skeletonlabs/skeleton-svelte';
    import logo from "../assets/logo.png"
    import user from "../assets/user.png"
    export function changePage() {
        currentPage = "reg"
        console.log(currentPage)
    }
</script>

<AppBar background="bg-[#f8f6f7]">
    {#snippet lead()}
        <div class="ml-5 flex items-center gap-2">
            <img src={logo} alt="logo" class="h-5">
            <strong class="text-l text-black">RedSeam Clothing</strong>
        </div>
    {/snippet}
    {#snippet trail()}
        <div class="mr-10 flex items-center gap-5">
            <img src={user} alt="user" class="h-5">
            <button onclick={changePage} class="text-l text-black">Log In</button>
        </div>
    {/snippet}
</AppBar>

<style>

</style>