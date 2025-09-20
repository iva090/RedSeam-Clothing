<script>
    import regImg from "$lib/assets/reg-img.png"
	import LogInputs from "$lib/components/LogInputs.svelte";
</script>

<div class="flex overflow-hidden">
    <div>
        <img src={regImg} alt="regImage" class="block w-[948px] h-[1000px]">
    </div>
    <div class="flex px-13 py-12 mt-15 mx-auto">
        <div class="p-20">
            <h1 class="text-4xl items-center justify-center font-bold">Log In</h1>
            <div class="flex flex-col gap-4 mt-15">
                <LogInputs />
            </div>

            <div class="mt-6 flex justify-center">
                <p>Not a member? <a href="/register" class="text-[#ff4000] font-[600]">Register</a></p>
            </div>
        </div>
        
    </div>
</div>