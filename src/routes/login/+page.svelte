<script>
	import regImg from '$lib/assets/reg-img.png';
	import LogInputs from '$lib/components/LogInputs.svelte';
	import { resolve } from '$app/paths';
	const register = resolve('/register');
</script>

<div class="flex overflow-hidden">
	<div>
		<img src={regImg} alt="regImage" class="block h-[1000px] w-[948px]" />
	</div>
	<div class="mx-auto mt-15 flex px-13 py-12">
		<div class="p-20">
			<h1 class="items-center justify-center text-4xl font-bold">Log In</h1>
			<div class="mt-15 flex flex-col gap-4">
				<LogInputs />
			</div>

			<div class="mt-6 flex justify-center">
				<p>Not a member? <a href={register} class="font-[600] text-[#ff4000]">Register</a></p>
			</div>
		</div>
	</div>
</div>
