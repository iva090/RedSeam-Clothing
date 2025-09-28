<script>
    import regImg from "$lib/assets/reg-img.png"
	import { resolve } from '$app/paths';
	import RegInputs from "$lib/components/RegInputs.svelte";

    const login = resolve('/login');
	let username = $state("");
	let email = $state("");
	let password = $state("");
	let confirmPassword = $state("");

	$effect(() => {
		console.log('Form data:', { username, email, password, confirmPassword});
	});
</script>

<div class="flex overflow-hidden">
    <div>
        <img src={regImg} alt="regImage" class="block w-[948px] h-[1000px]">
    </div>
    <div class="flex px-13 py-12 mx-auto">
        <div class="p-20">
            <h1 class="text-4xl items-center justify-center font-bold">Registration</h1>
            <div class="flex flex-col gap-4">
                <RegInputs />
            </div>
            <div class="mt-6 flex justify-center">
                <p>Already member? <a href={login} class="text-[#ff4000] font-[600]">Log In</a></p>
            </div>
        </div>
    </div>
</div>