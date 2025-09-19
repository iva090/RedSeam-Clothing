<script>
    import regImg from "../assets/reg-img.png"
    import ChooseAvatar from "$lib/components/chooseAvatar.svelte";
	import Inputs from "$lib/components/Inputs.svelte";
</script>

<div class="min-h-screen flex overflow-hidden">
    <div>
        <img src={regImg} alt="regImage" class="block w-[948px] h-[1000px]">
    </div>
    <div class="px-13 py-12">
        <div class="p-20">
            <h1 class="text-4xl items-center justify-center font-bold">Registration</h1>
            <div>
                <div class="flex">
                    <ChooseAvatar />
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <Inputs />
            </div>
            <div class="flex justify-center rounded-lg bg-[#ff4000] mt-[46px] h-[41px]">
                <button>Register</button>
            </div>
            <div class="mt-6 flex justify-center">
                <p>Already member? <a class="text-[#ff4000] font-[600]">Log In</a></p>
            </div>
        </div>
        
    </div>
</div>