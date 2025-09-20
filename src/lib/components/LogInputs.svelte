<script>
	import { goto } from '$app/navigation';
	import { api } from '$lib/axios/axios.js';

	let passwordVisible = false;
	let emailValue = '';
	let passwordValue = '';
	let errorMessage = '';
	let isLoading = false;

	function togglePassword() {
		passwordVisible = !passwordVisible;
	}

	function validateForm() {
		errorMessage = '';

		if (!emailValue.trim() || !passwordValue.trim()) {
			errorMessage = 'Fill everything';
			return false;
		}
		return true;
	}

    async function handleLogin() {
        if (!validateForm()) {
            return;
        }

        isLoading = true;
        errorMessage = '';

        try {
            const loginData = {
                email: emailValue.trim(),
                password: passwordValue
            };

            const response = await api.postForm('/login', loginData);

            if (response.status === 200) {
                console.log("Login Successful:", response.data);
                
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
                
                emailValue = '';
                passwordValue = '';
                
                await goto("..")
            }
        } catch (error) {
            console.error("Login error:", error);
            errorMessage = "At least one of the inputs is wrong"
        } finally {
            isLoading = false;
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    }
</script>

<div class="relative">
	<input
		bind:value={emailValue}
		class="border-1 h-[42px] w-[554px] rounded-md border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		type="email"
		placeholder="Email"
	/>
	{#if emailValue === ''}
		<span class="absolute left-[55px] top-1/2 -translate-y-1/2 transform text-red-500">*</span>
	{/if}
</div>
<div class="relative">
	<input
		bind:value={passwordValue}
		class="border-1 h-[42px] w-[554px] rounded-md border-[#d4d1cb] p-2 placeholder-[#3e424a]"
		required
		type={passwordVisible ? 'text' : 'password'}
		placeholder="Password"
	/>
	{#if passwordValue === ''}
		<span class="absolute left-[90px] top-1/2 -translate-y-1/2 transform text-red-500">*</span>
	{/if}
	<button
		type="button"
		on:click={togglePassword}
		aria-label={passwordVisible ? 'Hide password' : 'Show password'}
		class="absolute right-3 top-1/2 -translate-y-1/2 transform"
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
    <div class="text-red-500 text-sm">
        {errorMessage}
    </div>
{/if}

<button
    type="button"
    on:click={handleLogin}
    disabled={isLoading}
    class="mt-4 h-[42px] w-[554px] rounded-lg bg-[#ff4000] text-white font-medium hover:bg-[#ff571f] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
>
    {isLoading ? 'Logging in...' : 'Login'}
</button>
