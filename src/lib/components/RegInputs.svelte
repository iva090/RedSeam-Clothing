<script>
	import { goto } from '$app/navigation';
	import { api } from '$lib/axios/axios';
	import Avatar from '$lib/assets/regUser.png';
	import { resolve } from '$app/paths';

	let avatarPreview = $state(Avatar);

	let fileinput = $state();
	let {
		usernameValue = $bindable(''),
		emailValue = $bindable(''),
		passwordValue = $bindable(''),
		confirmPasswordValue = $bindable(''),
		avatarFile = $bindable(null)
	} = $props();

	let passwordVisible = $state(false);
	let confirmPasswordVisible = $state(false);
	let isLoading = $state(false);
	let errorMessage = $state('');

	function togglePassword() {
		passwordVisible = !passwordVisible;
	}

	function toggleConfirmPassword() {
		confirmPasswordVisible = !confirmPasswordVisible;
	}

	function choosePfp(e) {
		let image = e.target.files[0];
		if (!image) return;

		avatarFile = image;

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatarPreview = e.target.result;
		};
		if (image == Avatar) return;
		reader.onerror = (e) => {
			console.error('Error reading file:', e);
		};
		e.target.value = '';
	}

	function removePfp() {
		avatarFile = null;
		avatarPreview = Avatar;
	}

	function validateForm() {
		errorMessage = '';

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(emailValue)) {
			errorMessage = 'Please enter a valid email address';
			return false;
		}
		if (
			!usernameValue.trim() ||
			!emailValue.trim() ||
			!passwordValue.trim() ||
			!confirmPasswordValue.trim()
		) {
			errorMessage = 'Fill everything';
			return false;
		}

		if (passwordValue !== confirmPasswordValue) {
			errorMessage = 'Passwords do not match';
			return false;
		}

		return true;
	}

	async function sendData() {
		if (!validateForm()) {
			return;
		}

		isLoading = true;
		errorMessage = '';

		try {
			const formData = new FormData();
			formData.append('username', usernameValue.trim());
			formData.append('email', emailValue.trim());
			formData.append('password', passwordValue);
			formData.append('password_confirmation', confirmPasswordValue);
			if (avatarFile) {
				formData.append('avatar', avatarFile);
			}
			const response = await api.postForm('/register', formData);

			if (response.status === 200) {
				usernameValue = '';
				emailValue = '';
				passwordValue = '';
				confirmPasswordValue = '';
				avatarFile = null;
				avatarPreview = Avatar;
				console.log('Registration Successful:', response.data);
				await goto(resolve('/login'));
			}
		} catch (error) {
			console.error('Registration error:', error);

			if (error.response) {
				const status = error.response.status;
				if (status === 422) {
					errorMessage = 'The email you are trying to enter is already registered';
				}
			}
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="mt-[46px] mb-[46px] flex">
	<div>
		<img
			id="Change"
			class="h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-full border-none shadow-lg transition-opacity hover:opacity-80"
			src={avatarPreview}
			onclick={() => fileinput.click()}
			alt="Default avatar - click to change"
		/>
		<input
			style="display:none"
			type="file"
			accept=".jpg, .jpeg, .png"
			onchange={choosePfp}
			bind:this={fileinput}
		/>
	</div>
	<button class="p-5" onclick={() => fileinput.click()}>Upload new</button>
	<button class="p-5" onclick={removePfp}>Remove</button>
</div>

<div class="relative">
	<input
		bind:value={usernameValue}
		class="h-[42px] w-[554px] rounded-md border-1 border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		type="text"
		minlength="3"
		placeholder="Username *"
		disabled={isLoading}
	/>
</div>

<div class="relative">
	<input
		bind:value={emailValue}
		class="h-[42px] w-[554px] rounded-md border-1 border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		type="email"
		placeholder="Email *"
		disabled={isLoading}
	/>
</div>

<div class="relative">
	<input
		bind:value={passwordValue}
		class="h-[42px] w-[554px] rounded-md border-1 border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		minlength="3"
		type={passwordVisible ? 'text' : 'password'}
		placeholder="Password *"
		disabled={isLoading}
	/>
	<button
		type="button"
		onclick={togglePassword}
		class="absolute top-1/2 right-3 -translate-y-1/2 transform"
		disabled={isLoading}
		aria-label={passwordVisible ? 'Hide password' : 'Show password'}
	>
		<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.69556 7.26867C1.63799 7.09594 1.63794 6.90895 1.6954 6.73619C2.85237 3.2581 6.13326 0.75 9.99994 0.75C13.8648 0.75 17.1445 3.25577 18.3029 6.73134C18.3604 6.90406 18.3605 7.09106 18.303 7.26381C17.1461 10.7419 13.8652 13.25 9.99848 13.25C6.1336 13.25 2.85397 10.7442 1.69556 7.26867Z"
				stroke="#0F172A"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12.4993 7C12.4993 8.38071 11.38 9.5 9.99927 9.5C8.61856 9.5 7.49927 8.38071 7.49927 7C7.49927 5.61929 8.61856 4.5 9.99927 4.5C11.38 4.5 12.4993 5.61929 12.4993 7Z"
				stroke="#0F172A"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

<div class="relative">
	<input
		bind:value={confirmPasswordValue}
		class="h-[42px] w-[554px] rounded-md border-1 border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		type={confirmPasswordVisible ? 'text' : 'password'}
		placeholder="Confirm password *"
		disabled={isLoading}
	/>
	<button
		type="button"
		onclick={toggleConfirmPassword}
		class="absolute top-1/2 right-3 -translate-y-1/2 transform"
		disabled={isLoading}
		aria-label={confirmPasswordVisible ? 'Hide password' : 'Show password'}
	>
		<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.69556 7.26867C1.63799 7.09594 1.63794 6.90895 1.6954 6.73619C2.85237 3.2581 6.13326 0.75 9.99994 0.75C13.8648 0.75 17.1445 3.25577 18.3029 6.73134C18.3604 6.90406 18.3605 7.09106 18.303 7.26381C17.1461 10.7419 13.8652 13.25 9.99848 13.25C6.1336 13.25 2.85397 10.7442 1.69556 7.26867Z"
				stroke="#0F172A"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12.4993 7C12.4993 8.38071 11.38 9.5 9.99927 9.5C8.61856 9.5 7.49927 8.38071 7.49927 7C7.49927 5.61929 8.61856 4.5 9.99927 4.5C11.38 4.5 12.4993 5.61929 12.4993 7Z"
				stroke="#0F172A"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

{#if errorMessage}
	<div class="text-sm text-red-500">
		{errorMessage}
	</div>
{/if}

<button
	type="button"
	onclick={sendData}
	disabled={isLoading}
	class="mt-4 h-[42px] w-[554px] rounded-lg bg-[#ff4000] font-medium text-white hover:bg-[#ff571f] disabled:cursor-not-allowed disabled:bg-gray-400"
>
	{isLoading ? 'Registering...' : 'Register'}
</button>
