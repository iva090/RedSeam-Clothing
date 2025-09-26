<script>
    export let formData;
    export let errors;
    export let handleSubmit;
    export let classes = '';
</script>

<form on:submit|preventDefault={handleSubmit} {classes}>
    <div class="col-span-1 row-span-1">
        <p class="mt-7 mb-7 h5 font-bold text-gray-500">Order details</p>
        <div class="grid grid-cols-2 gap-x-5">
            <div>
                <input
                    placeholder="Name"
                    bind:value={formData.name}
                    class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.name
                        ? 'border-red-500'
                        : ''}"
                />
                {#if errors.name}
                    <p class="mb-4 text-sm text-red-500">{errors.name}</p>
                {/if}
            </div>
            <div>
                <input
                    placeholder="Surname"
                    bind:value={formData.surname}
                    class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.surname
                        ? 'border-red-500'
                        : ''}"
                />
                {#if errors.surname}
                    <p class="mb-4 text-sm text-red-500">{errors.surname}</p>
                {/if}
            </div>
        </div>
        <div class="relative mt-5 mb-5">
            <svg
                class="absolute top-[25px] left-3 -translate-y-1/2 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"
                />
            </svg>
            <input
                placeholder="Email"
                type="email"
                bind:value={formData.email}
                class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.email
                    ? 'border-red-500'
                    : ''}"
            />
            {#if errors.email}
                <p class="mb-4 text-sm text-red-500">{errors.email}</p>
            {/if}
        </div>
        <div class="grid grid-cols-2 gap-x-5">
            <div>
                <input
                    placeholder="Address"
                    bind:value={formData.address}
                    class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.address
                        ? 'border-red-500'
                        : ''}"
                />
                {#if errors.address}
                    <p class="mb-4 text-sm text-red-500">{errors.address}</p>
                {/if}
            </div>
            <div>
                <input
                    placeholder="Zip code"
                    type="text"
                    bind:value={formData.zip_code}
                    class="mb-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 transition-colors focus:ring-2 focus:ring-[#ff4000] focus:outline-none {errors.zip_code
                        ? 'border-red-500'
                        : ''}"
                />
                {#if errors.zip_code}
                    <p class="mb-4 text-sm text-red-500">{errors.zip_code}</p>
                {/if}
            </div>
        </div>
    </div>
</form>