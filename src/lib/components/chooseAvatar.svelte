<script>
	import Avatar from '../assets/regUser.png';

	let avatar = $state(Avatar);
	let fileinput = $state();

	function choosePfp(e) {
		let image = e.target.files[0];
		if (!image) return;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
		if (image == Avatar) return;
		reader.onerror = (e) => {
			console.error('Error reading file:', e);
		};
		e.target.value = '';
	}

	function removePfp(e) {
		avatar = Avatar;
	}
</script>

<div class="mb-[46px] mt-[46px] flex">
	<div>
		<img
			id="Change"
			class="h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-full border-none shadow-lg transition-opacity hover:opacity-80"
			src={avatar}
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
